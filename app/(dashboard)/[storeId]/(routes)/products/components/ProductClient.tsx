"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../../../../components/ui/button";
import Heading from "../../../../../../components/custom-ui/Heading";
import { Separator } from "../../../../../../components/ui/separator";
import { DataTable } from "../../../../../../components/custom-ui/DataTable";
import { ProductColumn, columns } from "./ProductColumn";
import ApiList from "../../../../../../components/custom-ui/ApiList";
import { Plus } from "lucide-react";

const ProductClient = ({ data }: { data: ProductColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable data={data} columns={columns} searchKey="name" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList name="products" idName="productId" />
    </>
  );
};
export default ProductClient;
