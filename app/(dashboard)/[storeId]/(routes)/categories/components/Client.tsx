"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../../../components/ui/button";
import Heading from "../../../../../../components/custom-ui/Heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/custom-ui/DataTable";
import { CategoryColumn, columns } from "./Column";
import ApiList from "../../../../../../components/custom-ui/ApiList";
import { Plus } from "lucide-react";

const Client = ({ data }: { data: CategoryColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API calls for Categories" />
      <Separator />
      <ApiList name="categories" idName="categoryId" />
    </>
  );
};
export default Client;
