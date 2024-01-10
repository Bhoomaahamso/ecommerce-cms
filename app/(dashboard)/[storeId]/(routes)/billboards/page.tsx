import BillboardClient from "@/components/custom-ui/BillboardClient";
import prismadb from "@/lib/prismadb";

const page = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="m-4">
      <BillboardClient data={billboard} />
    </div>
  );
};
export default page;
