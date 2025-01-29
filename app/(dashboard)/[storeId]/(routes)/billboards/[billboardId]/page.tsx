import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";
import { CategoryForm } from "./components/category-form";

const BillboardsPage = async ({
    params
}: {
    params: { billboardId: string, storeId: string }
}) => {
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        },
        include: {
            categories: true
        }
    });

    const category = billboard?.categories.find((category) => category.billboardId === params.billboardId);


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                initialData={billboard}
                />
                <CategoryForm 
                initialData={category || null} 
                billboard={billboard?.id || ''} 
                />
            </div>
        
        </div>
    );
}

export default BillboardsPage;