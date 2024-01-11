import BillboardForm from "@/components/custom-ui/BillboardForm";
import prismadb from "@/lib/prismadb";

const Page = async ({ params }: { params: { billboardId: string } }) => {

  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="p-8 pt-6">
      <BillboardForm initialData={billboard} />
    </div>
  );
};
export default Page;
