import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params : { storeId: string } }
) {
    try {
    const { userId } = auth();
    const body =await req.json();

    const { name, frontendStoreUrl } = body;

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name || !frontendStoreUrl) {
        return new NextResponse("Name and Url are required", { status: 400 });
    }

    if (!params.storeId) {
        return new NextResponse("Store is is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
        where: {
            id: params.storeId,
            userId
        },
        data: {
            name,
            frontendStoreUrl
        }
    });

    return NextResponse.json(store);
    }catch (error) {
    console.log('[STORE_PATCH]', error);
        return new NextResponse("Insternal error", { status: 500 });
    }
    
};

export async function DELETE(
    req: Request,
    { params }: { params : { storeId: string } }
) {
    try {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
        return new NextResponse("Store is is required", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
        where: {
            id: params.storeId,
            userId
        },
    });

    return NextResponse.json(store);
    }catch (error) {
    console.log('[STORE_DELETE]', error);
        return new NextResponse("Insternal error", { status: 500 });
    }
    
};
