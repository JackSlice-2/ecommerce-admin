"use client";

import React from 'react';
import { Heading } from '@/components/ui/heading';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  stripeData: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  stripeData,
}) => {

  return (
    <>
      <Heading
        title={`All Orders (${stripeData.length.toString()})`}
        description="Manage orders for your store"
      />
      <hr />
      <DataTable searchKey="products" columns={columns} data={stripeData} />
    </>
  );
};
