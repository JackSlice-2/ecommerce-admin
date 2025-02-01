"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, 
    FormControl, 
    FormDescription, 
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { StringDecoder } from "string_decoder";

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    colors: z.array(z.string()),
    sizes: z.array(z.string()),
    inStock: z.coerce.number().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData: Product & {
        images: Image[]
        colors: String[]
        sizes: String[]
} | null;
   categories: Category[];
   colors: Color[];
   sizes: Size[];

}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    colors,
    sizes
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [colorsArray, setColorsArray] = useState<string[]>(
        initialData ? initialData.colors.map((color) => color) : []
        );
    const [sizesArray, setSizesArray] = useState<string[]>(
        initialData ? initialData.sizes.map((size) => size) : []
        );

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated" : "Product created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
            inStock: parseFloat(String(initialData?.inStock)),
            colors: colorsArray,
            sizes: sizesArray,
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            colorId: '',
            sizeId: '',
            colors: [],
            sizes: [],
            inStock: 0,
            isFeatured: false,
            isArchived: false,
        }
    });

const onSubmit = async (data: ProductFormValues) => {
    try {
        setLoading(true);
        const finalData = {
            ...data,
            colors: colorsArray,
            sizes: sizesArray,
        };
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/products/${params.productId}`, finalData);
        } else {
            await axios.post(`/api/${params.storeId}/products`, finalData);
        }
        router.refresh();
        router.push(`/${params.storeId}/products`);
        toast.success(toastMessage);
    } catch (error) {
        toast.error("Maybe you missed something");
    } finally {
        setLoading(false);
    }
};

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted");
        } catch (error) {
         toast.error("Something went wrong");
        } finally {
            setLoading(false)
            setOpen(false)
        }
    };

    const onRemoveSize = (sizeValue: string) => {
        setSizesArray((prevSizes) => prevSizes.filter((value) => value !== sizeValue));
      };
      
      const onRemoveColor = (colorValue: string) => {
        setColorsArray((prevColors) => prevColors.filter((value) => value !== colorValue));
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Multiple Images!</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                    value={field.value.map((image) => image.url)}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                <div className="grid md:grid-cols-2 lg::grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Product name" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={loading} 
                                    placeholder="9.99" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                  disabled={loading} 
                  onValueChange={field.onChange} 
                  value={field.value} 
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue 
                        defaultValue={field.value} 
                        placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                        key={category.id} 
                        value={category.id}>{category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                        control={form.control}
                        name="inStock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estoque</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="100" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            <div>
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select 
                  disabled={loading} 
                  onValueChange={(sizeId) => {
                    // Update the sizes array with the selected size's value
                    setSizesArray((prevSizes) => {
                      const size = sizes.find((s) => s.id === sizeId); // Find the size object by ID
                      if (size && !prevSizes.includes(size.value)) {  // Use the size.value instead of sizeId
                        const newSizes = [...prevSizes, size.value];
                        console.log(newSizes); // Log the updated array with values
                        return newSizes;
                      }
                      return prevSizes;
                    });
                    field.onChange(sizeId);  // This keeps the form state intact for sizeId
                  }}
                  value={field.value} 
                  defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue 
                        defaultValue={field.value} 
                        placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem 
                        key={size.id} 
                        value={size.id}>{size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4">
  <h3 className="text-lg font-medium">Selected Sizes</h3>
  <div className="flex gap-4 mt-2">
  {sizesArray.map((sizeValue) => {
      const size = sizes.find((s) => s.value === sizeValue);
      return size ? (
        <SizeBadge key={size.id} size={size} onRemove={() => onRemoveSize(size.value)} />
      ) : null;
    })}
  </div>
</div>
</div>

<div>
           <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select
                            disabled={loading}
                            onValueChange={(colorId) => {
                                // Update the colors array with the selected color
                                setColorsArray((prevColors) => {
                                    const color = colors.find((c) => c.id === colorId);
                                    if (color && !prevColors.includes(color.value)) {
                                        const newColors = [...prevColors, color.value];
                                        console.log(newColors); // Log the updated array
                                        return newColors;
                                    }
                                    return prevColors;
                                });
                                field.onChange(colorId);
                            }}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue
                                        defaultValue={field.value}
                                        placeholder="Select a color"
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {colors.map((color) => (
                                    <SelectItem key={color.id} value={color.id}>
                                        {color.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* Display selected color balls */}
            <div className="mt-4">
                <h3 className="text-lg font-medium">Selected Colors</h3>
                    <div className="flex gap-4 mt-2">
                    {colorsArray.map((colorValue) => {
                    const color = colors.find((c) => c.value === colorValue);
                    return color ? (
                        <ColorBall key={color.id} color={color} onRemove={() => onRemoveColor(color.value)} />
                        ) : null;
                    })}
                        </div>
                        </div>
</div>

            <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            Featured
                        </FormLabel>
                        <FormDescription>
                            This product will appear on the homepage
                        </FormDescription>
                    </div>
                </FormItem>
            )}
                    />
                    <FormField
            control={form.control}
            name="isArchived"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox 
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            Archived
                        </FormLabel>
                        <FormDescription>
                            This product will not appear anywhere in the store
                        </FormDescription>
                    </div>
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


export const ColorBall: React.FC<{ color: { id: string, name: string, value: string }, onRemove: (id: string) => void }> = ({ color, onRemove }) => (
    <div className="flex flex-col items-center">
        <div
            className="w-8 h-8 rounded-full cursor-pointer"
            style={{ backgroundColor: color.value }}
            onClick={() => onRemove(color.id)}
        ></div>
        <p className="text-sm mt-2">{color.name}</p>
    </div>
);


export const SizeBadge: React.FC<{ size: { id: string; name: string; value: string }, onRemove: (id: string) => void }> = ({ size, onRemove }) => (
    <div className="flex flex-col items-center">
    <div className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer"
    onClick={() => onRemove(size.id)}>
      <span className="text-sm">{size.value}</span>
    </div>
    <p className="text-sm mt-2">{size.name}</p>
  </div>
);
