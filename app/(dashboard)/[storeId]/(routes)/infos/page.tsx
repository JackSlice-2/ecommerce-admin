
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
        icon: item.icon,
        phonenumber: item.phonenumber,
        whatsapp: item.whatsapp,
        instagram: item.instagram,
        facebook: item.facebook,
        email: item.email,
        footerText: item.footerText,
        footerText2: item.footerText2,
        darkMode: item.darkMode,
        darkPrimaryColor: item.darkPrimaryColor,
        darkSecondaryColor: item.darkSecondaryColor,
        lightMode: item.lightMode,
        lightPrimaryColor: item.lightPrimaryColor,
        lightSecondaryColor: item.lightSecondaryColor,
        visa: item.visa,
        mastercard: item.mastercard,
        amex: item.amex,
        hipercard: item.hipercard,
        elo: item.elo,
        pix: item.pix,
        paypal: item.paypal,
        stripe: item.stripe,
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