import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!params.categoryId)
      return new NextResponse("Category ID is required", { status: 400 });

    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log("CATEGORY_GET", err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    console.log(params);

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.categoryId)
      return new NextResponse("Category ID is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("Billboard ID is required", { status: 400 });

    const billboardStore = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!billboardStore)
      return new NextResponse("Unauthorized", { status: 405 });

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log("CATEGORY_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.categoryId)
      return new NextResponse("Category ID is required", { status: 400 });

    const billboardStore = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!billboardStore)
      return new NextResponse("Unauthorized", { status: 405 });

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log("CATEGORY_DELETE", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
