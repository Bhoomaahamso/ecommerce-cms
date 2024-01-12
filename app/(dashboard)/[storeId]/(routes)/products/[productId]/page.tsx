import ProductForm from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import prismadb from "@/lib/prismadb";

const Page = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  
  return (
    <div className="p-8 pt-6">
      <ProductForm
        initialData={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
};
export default Page;
