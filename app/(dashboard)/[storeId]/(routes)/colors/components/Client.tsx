"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../../../components/ui/button";
import Heading from "../../../../../../components/custom-ui/Heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/custom-ui/DataTable";
import { ColorColumn, columns } from "./Column";
import ApiList from "../../../../../../components/custom-ui/ApiList";
import { Plus } from "lucide-react";

const Client = ({ data }: { data: ColorColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList name="colors" idName="colorId" />
    </>
  );
};
export default Client;
