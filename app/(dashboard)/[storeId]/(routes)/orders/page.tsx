import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { OrderColumn, PayOrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { PayPalPayment } from "@prisma/client";

const convertToPayOrderColumn = (paypalPayments: PayPalPayment[]): PayOrderColumn[] => {
  return paypalPayments.map((item) => ({
    id: item.id,
    phone: "",
    address: "",
    isPaid: true,
    products: "",
    totalPrice: formatter.format(Number(item.totalPrice)),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    orderID: item.orderID,
    payerID: item.payerID,
    paymentID: item.paymentID ?? "",
    billingToken: item.billingToken ?? "",
    facilitatorAccessToken: item.facilitatorAccessToken ?? "",
    paymentSource: item.paymentSource ?? "",
    paymentType: 'PayPal',

  }));
};

const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          Product: true
        },
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.Product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.Product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    paymentType: 'Stripe'

  }));

  const paypalPayments: PayPalPayment[] = await prismadb.payPalPayment.findMany({
    where: {
      storeId: params.storeId
    }
  });

  const formattedPayPalOrders: PayOrderColumn[] = convertToPayOrderColumn(paypalPayments);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient stripeData={formattedOrders} paypalData={formattedPayPalOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;
