import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params : { infoId: string } }
) {
    try {
    if (!params.infoId) {
        return new NextResponse("Info ID is is required", { status: 400 });
    }

    const info = await prismadb.info.findUnique({
        where: {
            id: params.infoId,
        },
    });

    return NextResponse.json(info);
    }catch (error) {
    console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Insternal error", { status: 500 });
    } 
};

export async function PATCH(
    req: Request,
    { params }: { params : { storeId: string, infoId: string } }
) {
    try {
    const { userId } = auth();
    const body = await req.json();

    const { name,
        icon,
        phonenumber,
        whatsapp,
        instagram,
        facebook,
        email,
        footerText,
        footerText2,
        darkMode,
        darkPrimaryColor,
        darkSecondaryColor,
        lightMode,
        lightPrimaryColor,
        lightSecondaryColor,
        visa,
        mastercard,
        amex,
        hipercard,
        elo,
        pix,
        paypal,
        stripe
     } = body;

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
        return new NextResponse("label is required", { status: 400 });
    }

    if (!params.infoId) {
        return new NextResponse("Info ID is is required", { status: 400 });
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

    const info = await prismadb.info.updateMany({
       where: {
        id: params.infoId,
       },
        data: {
            name,
            icon,
            phonenumber,
            whatsapp,
            instagram,
            facebook,
            email,
            footerText,
            footerText2,
            darkMode,
            darkPrimaryColor,
            darkSecondaryColor,
            lightMode,
            lightPrimaryColor,
            lightSecondaryColor,
            visa,
            mastercard,
            amex,
            hipercard,
            elo,
            pix,
            paypal,
            stripe
        }
    });

    return NextResponse.json(info);
    }catch (error) {
    console.log('[STORE_PATCH]', error);
        return new NextResponse("Insternal error", { status: 500 });
    }    
};

export async function DELETE(
    req: Request,
    { params }: { params : { storeId: string, infoId: string } }
) {
    try {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.infoId) {
        return new NextResponse("Info ID is is required", { status: 400 });
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

    const info = await prismadb.info.deleteMany({
        where: {
            id: params.infoId,
        },
    });

    return NextResponse.json(info);
    }catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Insternal error", { status: 500 });
    } 
};

