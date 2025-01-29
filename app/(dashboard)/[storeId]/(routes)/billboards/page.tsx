
import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoryColumn } from "../categories/components/columns";

const BillboardsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            categories: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => {
        const categoryNames = item.categories.map(category => category.name).join(", ");
        return {
            id: item.id,
            label: item.label,
            imageUrl: item.imageUrl,
            isMain: item.isMain,
            categories: categoryNames,
            disableDelete: item.isMain,
            createdAt: format(item.createdAt, "MMMM do, yyyy")
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            Billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.Billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} categoryData={formattedCategories} />
            </div>
        </div>
    );
}

export default BillboardsPage;