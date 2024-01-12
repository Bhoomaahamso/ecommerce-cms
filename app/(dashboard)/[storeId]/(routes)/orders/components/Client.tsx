"use client";

import Heading from "../../../../../../components/custom-ui/Heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/custom-ui/DataTable";
import { OrderColumn, columns } from "./Column";

const Client = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable data={data} columns={columns} searchKey="products" />
    </>
  );
};
export default Client;
