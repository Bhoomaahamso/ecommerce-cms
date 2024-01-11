import Form from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/Form";
import prismadb from "@/lib/prismadb";

const Page = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const sizes = await prismadb.size.findFirst({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="p-8 pt-6">
      <Form initialData={sizes} />
    </div>
  );
};
export default Page;
