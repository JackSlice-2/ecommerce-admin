"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { ColorInputs, InputTexts, paymentMethods, toggleTheme } from "./data";

const formSchema = z.object({
    name: z.string().min(1),
    icon: z.string(),
    phonenumber: z.string(),
    whatsapp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    email: z.string(),
    footerText: z.string().default('2025'),
    footerText2: z.string().default('Todos Direitos Reservados'),
    darkMode: z.boolean().default(true),
    darkPrimaryColor: z.string().default('darkPrimaryColor'),
    darkSecondaryColor: z.string().default('darkPrimaryColor'),
    lightMode: z.boolean().default(true),
    lightPrimaryColor: z.string().default('2025'),
    lightSecondaryColor: z.string().default('lightSecondaryColor'),
    visa: z.boolean().default(false),
    mastercard: z.boolean().default(false),
    amex: z.boolean().default(false),
    hipercard: z.boolean().default(false),
    elo: z.boolean().default(false),
    pix: z.boolean().default(false),
    paypal: z.boolean().default(false),
    stripe: z.boolean().default(false),
});

type InfoFormValues = z.infer<typeof formSchema>;

interface InfoFormProps {
    initialData: Info | null;
}

export const InfoForm: React.FC<InfoFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit info" : "Create info";
    const description = initialData ? "Edit a info" : "Add a new info";
    const toastMessage = initialData ? "Info updated" : "Info created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<InfoFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            icon: '',
            phonenumber: '',
            whatsapp: '',
            instagram: '',
            facebook: '',
            email: '',
            footerText: '',
            footerText2: '',
            darkMode: true,
            darkPrimaryColor: '',
            darkSecondaryColor: '',
            lightMode: true,
            lightPrimaryColor: '',
            lightSecondaryColor: '',
            visa: false,
            mastercard: false,
            amex: false,
            hipercard: false,
            elo: false,
            pix: false,
            paypal: false,
            stripe: false
        }
    });

const onSubmit = async (data: InfoFormValues) => {
    try {
        console.log(data);
        setLoading(true);
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/infos/${params.infoId}`, data);
        } else {
            await axios.post(`/api/${params.storeId}/infos`, data);
        }
        router.refresh();
        router.push(`/${params.storeId}/infos`);
        toast.success(toastMessage);
    } catch (error) {
        toast.error("Something went wrong");
    } finally {
        setLoading(false);
    }
};

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/infos/${params.infoId}`)
            router.refresh();
            router.push(`/${params.storeId}/infos`);
            toast.success("Info deleted");
        } catch (error) {
         toast.error("Make sure you removed all categories using this info");
        } finally {
            setLoading(false)
            setOpen(false)
        }
    };

    return (
        <>
        <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
                )}
            </div>
            <hr />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full">
                    <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Backround Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                            {InputTexts.map((input) => (
                                <FormField
                                    key={input.name}
                                    control={form.control}
                                    name={input.name as keyof InfoFormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{input.label}</FormLabel>
                                            <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder={input.placeholder}
                                                value={field.value.toString()}
                                                onChange={(e) => field.onChange(e.target.value)} 
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <div className="flex gap-3 justify-between">
                        {paymentMethods.map((method) => (
                            <FormField
                                key={method.name}
                                control={form.control}
                                name={method.name as keyof InfoFormValues}
                                render={({ field }) => (
                                    <FormItem className="text-center">
                                        <FormLabel>{method.label}</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <Checkbox
                                                    checked={field.value as boolean}
                                                    onCheckedChange={field.onChange}
                                                    className="mx-3 rounded-full p-3 justify-center items-center"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                    </div>
                    <div className="flex gap-3 justify-around mt-5">
                        {toggleTheme.map((method) => (
                            <FormField
                                key={method.name}
                                control={form.control}
                                name={method.name as keyof InfoFormValues}
                                render={({ field }) => (
                                    <FormItem className="text-center">
                                        <FormLabel>{method.label}</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <Checkbox
                                                    checked={field.value as boolean}
                                                    onCheckedChange={field.onChange}
                                                    className="mx-3 rounded-full p-3 justify-center items-center"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                    </div>
                    <div className="grid grid-cols-3 gap-8">
                            {ColorInputs.map((input) => (
                                <FormField
                                    key={input.name}
                                    control={form.control}
                                    name={input.name as keyof InfoFormValues}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{input.label}</FormLabel>
                                            <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder={input.placeholder}
                                                value={field.value.toString()}
                                                onChange={(e) => field.onChange(e.target.value)} 
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    <Button 
                    disabled={loading} 
                    className="ml-auto" 
                    type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <hr/>
        </>
        );
    };