'use client';

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import OrderButtons from '@/components/ui/OrderButtons';
import { useParams } from "next/navigation";

interface OrderClientProps {
  stripeData: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  stripeData,
}) => {
  const params = useParams();
  return (
    <>
      <Heading
        title={`Stripe Orders (${stripeData.length})`}
        description="Manage Stripe orders for your store"
      />
      <Separator />
      <div className="pr-5">
          <OrderButtons storeId={params.storeId}/>
      </div>
      <DataTable searchKey="products" columns={columns} data={stripeData} />
    </>
  );
};
