import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { 
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
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
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

        const info = await prismadb.info.create({
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
                stripe,
                storeId: params.storeId
            }
        });
        return NextResponse.json(info);
    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }
        const infos = await prismadb.info.findMany({
            where: {
                storeId: params.storeId,
            },
        });
        return NextResponse.json(infos);
    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};