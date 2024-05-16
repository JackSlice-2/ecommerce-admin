import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        // Rest of the validation and checks (similar to the existing code)

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: { equals: userId }
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                // Add properties relevant to the Order model, for example:
                // isPaid, phone, address, createdAt, updatedAt, etc.
            }
        });
        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: { equals: userId }
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }

        const orders = await prismadb.order.findMany({
            where: {
                storeId: params.storeId,
            },
        });
        return NextResponse.json(orders);
    } catch (error) {
        console.log('[ORDERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
