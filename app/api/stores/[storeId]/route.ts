import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request,  { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    console.log(params)

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const store = await prismadb.store.updateMany({
      where: {
        userId,
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log("STORE_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const store = await prismadb.store.deleteMany({
      where: {
        userId,
        id: params.storeId,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log("STORE_DELETE", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
