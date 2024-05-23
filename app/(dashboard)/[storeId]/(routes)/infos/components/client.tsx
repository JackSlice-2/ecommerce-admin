"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { InfoColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface InfoClientProps {
    data: InfoColumn[]
}

export const InfoClient: React.FC<InfoClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
        <div className="flex items-center justify-between">
            <Heading
            title={`Store Contact Information`}
            description="Manage your store`s contact information"
            />
            {/* Conditionally render the button based on data length */}
            {data.length === 0 && (
                <Button onClick={() => router.push(`/${params.storeId}/infos/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Create Info
                </Button>
            )}
        </div>
        <hr />
        <DataTable searchKey="name" columns={columns} data={data}/>
        <Heading title="API" description="API calls for Infos" />
        <hr />
        <ApiList 
        entityName="infos" 
        entityIdName="infosId"/>
        </>
    )
}