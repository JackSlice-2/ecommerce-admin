"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { useMemo } from "react"

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    const featuredData = useMemo(() => data.filter(item => item.isFeatured), [data]);
    const productData = useMemo(() => data.filter(item => !item.isFeatured && !item.isArchived), [data]);
    const archivedData = useMemo(() => data.filter(item => item.isArchived), [data]);

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
            title={`Featured Products (${featuredData.length})`}
            description="Manage products for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/products/new`)}
            className="whitespace-nowrap inline-flex"
            >
                <Plus className="mr-2 h-4 w-4"/>
                    Add new
            </Button>
        </div>
        <hr />
        <DataTable searchKey="name" columns={columns} data={featuredData}/>
        <div className="flex items-center justify-between">
            <Heading
            title={`Regular Products (${productData.length})`}
            description="Manage products for your store"
            />
        </div>
        <hr />
        <DataTable searchKey="name" columns={columns} data={productData}/>
        <div className="flex items-center justify-between">
            <Heading
            title={`Archived Products (${archivedData.length})`}
            description="Manage products for your store"
            />
        </div>
        <hr />
        <DataTable searchKey="name" columns={columns} data={archivedData}/>
        <Heading title="API" description="API calls for Products" />
        <hr />
        <ApiList 
        entityName="products" 
        entityIdName="productsId"/>
        </>
    )
}