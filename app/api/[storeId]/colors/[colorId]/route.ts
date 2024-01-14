import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });

    const color = await prismadb.color.findFirst({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err) {
    console.log("COLOR_GET", err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    console.log(params);

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!value) return new NextResponse("Value is required", { status: 400 });

    const store = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 405 });

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (err) {
    console.log("COLOR_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.colorId)
      return new NextResponse("Color ID is required", { status: 400 });

    const store = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 405 });

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (err) {
    console.log("COLOR_DELETE", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
