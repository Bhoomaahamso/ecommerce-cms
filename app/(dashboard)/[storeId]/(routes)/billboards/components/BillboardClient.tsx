"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../../../components/ui/button";
import Heading from "../../../../../../components/custom-ui/Heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/custom-ui/DataTable";
import { BillboardColumn, columns } from "./BillboardColumn";
import ApiList from "../../../../../../components/custom-ui/ApiList";
import { Plus } from "lucide-react";

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
           <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="label" />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList name="billboards" idName="billboardId" />
    </>
  );
};
export default BillboardClient;
