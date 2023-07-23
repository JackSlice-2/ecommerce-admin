"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } 
    from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { useStoreModal } from "@/hooks/use-store-model";
import { Modal } from "@/components/ui/modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
    name: z.string().min(1),
    whatsapp: z.string().optional(),
    phone: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const router = '';

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            whatsapp: "",
            phone: "",
            instagram: "",
            facebook: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

          const response = await axios.post('/api/stores/', values);

          window.location.assign(`/${response.data.id}`);
        } catch (error) {
          toast.error('Something went wrong');
        }finally {
          setLoading(false);
        }
    };
    return (
        <Modal
          title="Create store"
          description="Add a new store to manage products and categories."
          isOpen={storeModal.isOpen} 
          onClose={storeModal.onClose}
        >
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input disabled={loading} placeholder="E-Commerce" {...field} />
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
                            <Input disabled={loading} placeholder="Paste WhatsApp Link Here..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input disabled={loading} placeholder="+55 55 5 5555-5555" {...field} />
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
                          <FormLabel>Instagram Link</FormLabel>
                          <FormControl>
                            <Input disabled={loading} placeholder="Paste Instagram Link Here..." {...field} />
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
                          <FormLabel>Facebook Link</FormLabel>
                          <FormControl>
                            <Input disabled={loading} placeholder="Paste Facebook Link Here..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                      <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                        Cancel
                      </Button>
                      <Button disabled={loading} type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
      );
    };