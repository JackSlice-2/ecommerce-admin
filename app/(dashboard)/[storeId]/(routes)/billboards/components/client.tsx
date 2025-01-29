"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { useMemo } from "react"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
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
        <Heading title="API" description="API calls for Billboards" />
        <hr />
        <ApiList 
        entityName="billboards" 
        entityIdName="billboardsId"/>
        </>
    )
}