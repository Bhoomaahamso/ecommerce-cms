import Form from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/Form";
import prismadb from "@/lib/prismadb";

const Page = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const categories = await prismadb.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="p-8 pt-6">
      <Form billboards={billboards} initialData={categories} />
    </div>
  );
};
export default Page;
