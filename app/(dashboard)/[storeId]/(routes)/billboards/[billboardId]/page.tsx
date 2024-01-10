import BillboardForm from "@/components/custom-ui/BillboardForm";
import prismadb from "@/lib/prismadb";

const Page = async ({ params }: { params: { billboardId: string } }) => {
  // console.log('par', params)

  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div>
      <BillboardForm initialData={billboard} />
    </div>
  );
};
export default Page;
