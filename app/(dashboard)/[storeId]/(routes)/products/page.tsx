import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/products/components/ProductClient";
import { ProductColumn } from "@/app/(dashboard)/[storeId]/(routes)/products/components/ProductColumn";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

const page = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price.toNumber()),
      category: item.category.name,
      size: item.size.name,
      color: item.color.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <BillboardClient data={formattedProducts} />
    </div>
  );
};
export default page;
