import BillboardClient from "@/components/custom-ui/BillboardClient";
import { BillboardColumn } from "@/components/custom-ui/BillboardColumn";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

const page = async ({ params }: { params: { storeId: string } }) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard: BillboardColumn[] = billboard.map((item) => {
    return {
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <BillboardClient data={formattedBillboard} />
    </div>
  );
};
export default page;
