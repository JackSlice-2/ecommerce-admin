import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    Product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const ordersTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.Product.price;
        }, 0);

        return total + ordersTotal;
    }, 0);

    return totalRevenue;
};
