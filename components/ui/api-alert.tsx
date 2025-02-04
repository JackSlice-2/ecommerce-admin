import { Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { Copy } from "lucide-react";
import { toast } from "react-hot-toast";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public",
}) => {
    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("API Rout copied to the clipboard")
    };

    return  (
        <Alert>
            <Server className="h-4 w-4 z-5" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                    </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.29rem] py-[0.2rem] font-mono text-sm font-semibold overflow-hidden mr-1">
                    {description}
                </code>
                <Button variant="outline" className="px-1" size="icon" onClick={() => onCopy(description)}>
                    <Copy className="p-0.5"/>
                </Button>
            </AlertDescription>
        </Alert>
    )
}