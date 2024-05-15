"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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

const formSchema = z.object({
    name: z.string().min(1),
    billboardid: z.string(),
    icon: z.string(),
    phonenumber: z.string(),
    whatsapp: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    email: z.string(),
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
            billboardid: '',
            phonenumber: '',
            whatsapp: '',
            instagram: '',
            facebook: '',
            email: '',
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
            <Separator />
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Your Store`s Name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard Id</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Main Billboard ID" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phonenumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="+55 5 5555-5555" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>WhatsApp Link</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Paste Link Here..." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram Page</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Paste Link Here..." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebook"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Paste Link Here..." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-Mail Address</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="example@afrotech.com" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                    disabled={loading} 
                    className="ml-auto" 
                    type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
        );
    };