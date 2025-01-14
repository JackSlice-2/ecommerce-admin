import * as React from "react";
import { Button } from "@/components/ui/button";


const orders = [
  {
    url: "",
    label: "All Orders",
  },
  {
    url: "paypal",
    label: "PayPal Orders",
  },
  {
    url: "stripe",
    label: "Stripe Orders",
  },
];

type OrderButtonsProps = {  
  storeId: string | string[];
};

const OrderButtons: React.FC<OrderButtonsProps> = ({ 
  storeId 
}) => {

  return (
    <>
    {orders.map((order) => (
      <a
      key={order.url}
      href={`/${storeId}/${order.url}orders`}
      className="p-4"
    >
      <Button
      variant="outline"
      className="p-4"
    > {order.label}
    </Button>
    </a>
    ))}

  </>

  );
}
export default OrderButtons;