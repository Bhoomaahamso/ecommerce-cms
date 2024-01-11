"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Heading from "./Heading";
import { Separator } from "../ui/separator";
import { DataTable } from "./DataTable";
import { BillboardColumn, columns } from "./BillboardColumn";
import ApiAlert from "./ApiAlert";
import ApiList from "./ApiList";

const BillboardClient = ({ data }: { data: BillboardColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          Add a Billboad
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList name='billboards' idName='billboardId' />
    </>
  );
};
export default BillboardClient;
