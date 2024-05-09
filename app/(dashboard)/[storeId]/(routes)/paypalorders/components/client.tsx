'use client'

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { PayOrderColumn, paycolumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ComboboxDemo } from "@/components/ui/combobox";
import { useParams } from "next/navigation";

interface OrderClientProps {
  paypalData: PayOrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  paypalData,
}) => {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Paypal Orders (${paypalData.length})`}
        description="Manage paypal orders for your store"
      />
      <Separator />
      <div className="pr-5">
          <ComboboxDemo storeId={params.storeId}/>
      </div>
      <DataTable
        searchKey="products"
        columns={paycolumns}
        data={paypalData}
      />
    </>
  );
};
