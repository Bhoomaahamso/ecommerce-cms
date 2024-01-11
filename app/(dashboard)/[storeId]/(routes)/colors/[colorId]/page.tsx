import Form from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/Form";
import prismadb from "@/lib/prismadb";

const Page = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
}) => {
  const colors = await prismadb.color.findFirst({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="p-8 pt-6">
      <Form initialData={colors} />
    </div>
  );
};
export default Page;
