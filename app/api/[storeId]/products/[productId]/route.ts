import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!params.productId)
      return new NextResponse("Product ID is required", { status: 400 });

    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });

    const product = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("PRODUCT_GET", err);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;
    console.log(params);

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.productId)
      return new NextResponse("Product ID is required", { status: 400 });
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!price) return new NextResponse("Price is required", { status: 400 });
    if (!categoryId)
      return new NextResponse("Category ID is required", { status: 400 });
    if (!colorId)
      return new NextResponse("Color ID is required", { status: 400 });
    if (!sizeId)
      return new NextResponse("Size ID is required", { status: 400 });
    if (!images || !images.length)
      return new NextResponse("Images are required", { status: 400 });

    const store = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 405 });

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log("PRODUCT_PATCH", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });
    if (!params.productId)
      return new NextResponse("Product ID is required", { status: 400 });

    const store = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 405 });

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log("PRODUCT_DELETE", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
