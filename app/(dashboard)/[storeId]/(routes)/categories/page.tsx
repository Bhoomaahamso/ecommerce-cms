import Client from "@/app/(dashboard)/[storeId]/(routes)/categories/components/Client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryColumn } from "./components/Column";

const page = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include:{
      billboard: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      billboardLabel: item.billboard.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <Client data={formattedCategories} />
    </div>
  );
};
export default page;
