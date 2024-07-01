"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdsFormData } from "@/components/content/AdsForm";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "axios";
const dynamicFormSchema = z.object(
  AdsFormData.reduce((acc, field) => {
    acc[field.name] = field.required
      ? z.string().min(2, {
          message: `${field.title} must be at least 2 characters.`,
        })
      : z.string();
    return acc;
  }, {} as Record<string, any>)
);

const AdsForm = ({ roomId, file }: any) => {
  const { authId } = useAuth();
  const [ads, setAds] = useState<any>();
  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: Object.fromEntries(
      AdsFormData.map((field) => [field.name, ""])
    ),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof dynamicFormSchema>) {
    try {
      console.log(values);

      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      // Append additional data
      formData.append("active_ads", ads);
      formData.append("user", authId);
      formData.append("userId", authId);
      formData.append("roomId", roomId);

      // Assuming `file` is an array of File objects, append them individually
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }

      // Use axios.post with formData as the second parameter
      const response = await axios.post(
        "https://autocommentapi.vercel.app/v1/story/upload/file",
        formData
      );

      console.log(response.data); // Assuming you want to log the response data

      // alert('Form submitted successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Error submitting form. Please try again.");
    }
  }
  return (
    <div>
      <div className="">
        <div className="flex items-center space-x-2">
          <Checkbox onCheckedChange={setAds} id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>
        <h1 className="py-2">Add Story With Ads</h1>
        <ScrollArea className="h-[60vh]">
          {ads && (
            <div className="px-8 pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {AdsFormData.map((item: any) => (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name}
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>{item.title}</FormLabel>
                          <FormDescription>{item.description}</FormDescription>
                          <FormControl>
                            <Input
                              placeholder={`Enter ${item.title}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          )}{" "}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdsForm;
