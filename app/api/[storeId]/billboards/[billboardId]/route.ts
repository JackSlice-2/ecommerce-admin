import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params : { billboardId: string } }
) {
    try {
    if (!params.billboardId) {
        return new NextResponse("Billboard ID is is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId,
        },
    });

    return NextResponse.json(billboard);
    }catch (error) {
    console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Insternal error", { status: 500 });
    } 
};

export async function PATCH(
    req: Request,
    { params }: { params : { storeId: string, billboardId: string } }
) {
    try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl, isMain } = body;

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
        return new NextResponse("label is required", { status: 400 });
    }

    if (!imageUrl) {
        return new NextResponse("Image URL is is required", { status: 400 });
    }

    if (!params.billboardId) {
        return new NextResponse("Billboard ID is is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prismadb.billboard.updateMany({
       where: {
        id: params.billboardId,
       },
        data: {
            label,
            imageUrl,
            isMain,
        }
    });

    return NextResponse.json(billboard);
    }catch (error) {
    console.log('[STORE_PATCH]', error);
        return new NextResponse("Insternal error", { status: 500 });
    }    
};

export async function DELETE(
    req: Request,
    { params }: { params : { storeId: string, billboardId: string } }
) {
    try {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardId) {
        return new NextResponse("Billboard ID is is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prismadb.billboard.deleteMany({
        where: {
            id: params.billboardId,
        },
    });

    return NextResponse.json(billboard);
    }catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Insternal error", { status: 500 });
    } 
};

