"use client";

import { useStoreModel } from "@/hooks/use-store-model";
import { Modal } from "../custom-ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);

  const storeModal = useStoreModel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("/api/stores", values);
      window.location.assign(res.data.id);
      // toast.success("Store created successfully");
    } catch (err: any) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Store..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2 !mt-4 ml-auto flex justify-end">
            <Button
              disabled={loading}
              variant="outline"
              onClick={storeModal.onClose}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
