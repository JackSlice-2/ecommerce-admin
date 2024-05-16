"use client";

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderColumn, PayOrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import OrderButtons from '@/components/ui/OrderButtons';
import { useParams } from 'next/navigation';

type OrderOrPayOrderColumn = OrderColumn | PayOrderColumn;

interface OrderClientProps {
  stripeData: OrderColumn[];
  paypalData: PayOrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({
  stripeData,
  paypalData,
}) => {
  const combinedData: OrderOrPayOrderColumn[] = [...stripeData, ...paypalData];
  const params = useParams();

  const total = combinedData.length.toString();

  return (
    <>
      <Heading
        title={`All Orders (${total})`}
        description="Manage orders for your store"
      />
      <Separator />
      <div className="pr-5">
          <OrderButtons storeId={params.storeId}
          />
      </div>
      <DataTable searchKey="products" columns={columns} data={combinedData} />
    </>
  );
};
