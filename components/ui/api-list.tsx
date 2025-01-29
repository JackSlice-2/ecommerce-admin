"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";
import { useState } from "react";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    const params = useParams();
    const origin = useOrigin();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const baseUrl = `${origin}/api/${params.storeId}`;

    return (
        <>
            <button onClick={toggleVisibility} className="bg-slate-700 hover:bg-slate-500 text-white p-2 rounded-lg">
                {isVisible ? 'Hide Content' : 'Show Content'}
            </button>
            {isVisible && (
                <>
                    <ApiAlert
                        title="GET"
                        variant="public"
                        description={`${baseUrl}/${entityName}`}
                    />
                    <ApiAlert
                        title="GET"
                        variant="public"
                        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
                    />
                    <ApiAlert
                        title="POST"
                        variant="admin"
                        description={`${baseUrl}/${entityName}`}
                    />
                    <ApiAlert
                        title="PATCH"
                        variant="admin"
                        description={`${baseUrl}/${entityName}/${entityIdName}`}
                    />
                    <ApiAlert
                        title="DELETE"
                        variant="admin"
                        description={`${baseUrl}/${entityName}/${entityIdName}`}
                    />
                </>
            )}
        </>
    )
}