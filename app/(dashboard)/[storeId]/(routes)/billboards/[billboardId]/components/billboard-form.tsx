"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
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
    label: z.string().min(1),
    imageUrl: z.string().min(1),
    isMain: z.boolean().default(false)
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps & { isMain?: boolean }> = ({
    initialData,
    isMain = initialData?.isMain,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard updated" : "Billboard created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
            isMain: false
        }
    });

    const onSubmit = async (data: BillboardFormValues) => {
        console.log(data);
        try {
            setLoading(true);
    
            // Directly use the isMain value from initialData for updates
            if (initialData) {
                // Pass the isMain value from initialData without modification
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, {
                   ...data,
                    isMain: initialData.isMain // Ensure isMain remains unchanged
                });
            } else {
                // For new entries, proceed as before
                const response = await axios.get(`/api/${params.storeId}/billboards`);
                const existingBillboards = response.data;
    
                interface Billboard {
                    id: string;
                }
    
                let isMain = false;
                if (!existingBillboards.some((billboard: Billboard) => billboard.id!== params.billboardId)) {
                    isMain = true; // Set isMain to true if there are no other billboards
                }
    
                // Update data object with isMain value
                data.isMain = isMain;
    
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success("Billboard deleted");
        } catch (error) {
         toast.error("Make sure you removed all categories using this billboard");
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
        {!isMain && initialData && (
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
                        name="imageUrl"
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
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard label" {...field}/>
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
        <hr/>
    </>
    );
};
