import Client from "@/app/(dashboard)/[storeId]/(routes)/colors/components/Client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ColorColumn } from "./components/Column";

const page = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <Client data={formattedColors} />
    </div>
  );
};
export default page;
