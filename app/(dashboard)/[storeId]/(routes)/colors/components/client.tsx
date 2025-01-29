"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { ApiList } from "@/components/ui/api-list";

import { columns, ColorColumn } from "./columns";

interface ColorsClientProps {
  data: ColorColumn[];
}

export const ColorsClient: React.FC<ColorsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Colors (${data.length})`} description="Manage colors for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}
          className="whitespace-nowrap inline-flex"
          >
          <Plus className="mr-2 h-4 w-4" /> 
          Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Colors" />
      <hr />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};