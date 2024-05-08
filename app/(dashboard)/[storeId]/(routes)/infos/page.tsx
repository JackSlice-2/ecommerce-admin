
import prismadb from "@/lib/prismadb";
import { InfoClient } from "./components/client";
import { InfoColumn } from "./components/columns";
import { format } from "date-fns";

const InfosPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const infos = await prismadb.info.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedInfos: InfoColumn[] = infos.map((item) => ({
        id: item.id,
        name: item.name,
        billboardid: item.billboardid,
        icon: item.icon,
        phonenumber: item.phonenumber,
        whatsapp: item.whatsapp,
        instagram: item.instagram,
        facebook: item.facebook,
        email: item.email,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <InfoClient data={formattedInfos} />
            </div>
        </div>
    );
}

export default InfosPage;