"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { useMemo } from "react"
import { CategoryColumn, columns as categoryColumn } from "../../categories/components/columns"

interface BillboardClientProps {
    data: BillboardColumn[]
    categoryData: CategoryColumn[]
    
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data,
    categoryData
}) => {
    const router = useRouter();
    const params = useParams();

    const mainData = useMemo(() => data.filter(item => item.isMain), [data]);
    const otherData = useMemo(() => data.filter(item =>!item.isMain), [data]);

    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
            title={`Billboards (${data.length})`}
            description="Create one Main Billboard for the and multiple Category Billboards for your store."
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}
            className="whitespace-nowrap inline-flex"
            >
                <Plus className="mr-2 h-4 w-4"/>
                    Add new
            </Button>
        </div>
        <hr />
        <div className="text-2xl font-bold">
            Main Billboard
        </div>
        <DataTable searchKey="label"  columns={columns} data={mainData} />
        <div className="text-2xl font-bold">
            Category Billboards
        </div>
        <DataTable searchKey="label" columns={columns} data={otherData} />
         <>
            <div className="flex items-center justify-between">
                <Heading
                title={`Categories (${categoryData.length})`}
                description="Manage categories for your store"
                />
            </div>
            <hr />
            <DataTable searchKey="name" columns={categoryColumn} data={categoryData}/>
            <Heading title="API" description="API calls for Categories" />
            <hr />
            <ApiList 
            entityName="categories" 
            entityIdName="categoryId"/>
        </>
        <Heading title="API" description="API calls for Billboards" />
        <hr />
        <ApiList 
        entityName="billboards" 
        entityIdName="billboardsId"/>
        </>
    )
}