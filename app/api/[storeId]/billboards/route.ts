import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err) {
    console.log("BILLBOARDS_GET", err);
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 403 });
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl)
      return new NextResponse("Image URL is required", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Store ID is required", { status: 400 });

    const billboardStore = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!billboardStore)
      return new NextResponse("Unauthorized", { status: 405 });

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (err) {
    console.log("BILLBOARDS_POST", err);
  }
}
