'use client'

import { Heading } from "@/components/ui/heading";
import { PayOrderColumn, paycolumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import OrderButtons from '@/components/ui/OrderButtons';
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
      <hr />
      <div className="pr-5">
          <OrderButtons storeId={params.storeId}/>
      </div>
      <DataTable
        searchKey="products"
        columns={paycolumns}
        data={paypalData}
      />
    </>
  );
};
