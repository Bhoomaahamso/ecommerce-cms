import Client from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/Client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { SizeColumn } from "./components/Column";

const page = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <Client data={formattedSizes} />
    </div>
  );
};
export default page;
