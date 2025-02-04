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
            price, 
            categoryId, 
            sizeId, 
            colorId,
            colors,
            inStock,
            sizes,
            images, 
            isFeatured, 
            isArchived 
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }

        if (!sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        if (!colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
        }
        
        if (!colors) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        if (!sizes) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        if (!inStock) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
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

        const product = await prismadb.product.create({
            data: {
                name, 
                price, 
                categoryId, 
                sizeId, 
                colorId,
                colors,
                sizes,
                inStock,
                isFeatured, 
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string }) => image)
                        ]
                    }
                }
            }
        });
        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");
        const colors = searchParams.get("colors") ? searchParams.get("colors")?.split(",") : [];
        const sizes = searchParams.get("sizes") ? searchParams.get("sizes")?.split(",") : [];
        const inStock = searchParams.get("inStock") ? parseInt(searchParams.get("inStock")!) : 0;
        
        if (!params.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId,
            categoryId,
            colorId,
            sizeId: sizeId || undefined,
            colors: colors?.length ? { hasSome: colors } : undefined,
            sizes: sizes?.length ? { hasSome: sizes } : undefined,
            inStock: inStock ? { gte: 1 } : undefined,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false,
        },
        include: {
            images: true,
            Category: true,
            Color: true, 
            Size: true 
        }
    });
      return NextResponse.json(products);
    } catch (error) {
      console.log('[PRODUCTS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
};