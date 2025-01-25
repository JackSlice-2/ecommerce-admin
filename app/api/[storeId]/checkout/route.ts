import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
};

async function getStoreName(storeId: any) {
    const store = await prismadb.store.findUnique({
        where: {
            id: storeId,
        },
    });
    return store? store.name : null;
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    const { productIds } = await req.json();

    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product Ids are required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds,
            },
        },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100,
            },
        });
    });

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId,
                        },
                    },
                })),
            },
        },
    });

 
const storeName = await getStoreName(params.storeId) as string

console.log(`Store name: ${storeName}`);

const storeUrl = storeName.split('@')[1];
console.log(`Store Url: ${storeUrl}`);


if (!storeName) {
    return new NextResponse("Store not found", { status: 404 });
}

const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
        enabled: true,
    },
    success_url: `${storeUrl}/cart?success=1`,
    cancel_url: `${storeUrl}/cart?cancel=1`,
    metadata: {
        orderId: order.id,
    },
});

    console.log(session.url);

return NextResponse.json({ url: session.url }, {
    headers: corsHeaders,
});
}