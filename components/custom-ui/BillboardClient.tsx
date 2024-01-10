"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Heading from "./Heading";
import { Separator } from "../ui/separator";
import { Billboard } from "@prisma/client";
import { DataTable } from "./DataTable";
import { columns } from "./BillboardColumn";

const BillboardClient = ({ data }: { data: Billboard[] }) => {
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
      <Heading title="API" description="Routes" />
      <Separator />
    </>
  );
};
export default BillboardClient;
