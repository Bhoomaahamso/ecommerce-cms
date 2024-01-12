import Client from "@/app/(dashboard)/[storeId]/(routes)/orders/components/Client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { OrderColumn } from "./components/Column";
import { formatter } from "@/lib/utils";

const page = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => {
    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems.map((item) => item.product.name).join(', '),
      totalPrice: formatter.format(item.orderItems.reduce((total, item)=>{
        return total + Number(item.product.price)
      },0)),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="m-4 p-4 pt-2">
      <Client data={formattedOrders} />
    </div>
  );
};
export default page;
