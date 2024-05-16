import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const { userId } = auth();

        if (!params.orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const order = await prismadb.order.findUnique({
            where: {
                id: params.orderId,
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const { userId } = auth();

        // Rest of the validation and checks (similar to the existing code)

        if (!params.orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const order = await prismadb.order.updateMany({
            where: {
                id: params.orderId,
            },
            data: {
                // Add properties relevant to updating an order
                // For example, isPaid, phone, address, etc.
            }
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE(
    req: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const { userId } = auth();

        if (!params.orderId) {
            return new NextResponse("Order ID is required", { status: 400 });
        }

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const order = await prismadb.order.deleteMany({
            where: {
                id: params.orderId,
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        console.log('[ORDER_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
