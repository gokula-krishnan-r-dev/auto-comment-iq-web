"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
import React, { use, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/components/provider/AuthProvider";

const dynamicFormData = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter title",
    description: "Enter a title for your ad",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter description",
    description: "Enter a description for your ad",
    type: "text",
    required: false,
  },
  {
    name: "ads_company_name",
    label: "Company Name",
    placeholder: "Enter company name",
    description: "Enter a company name for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_website",
    label: "Company Website",
    placeholder: "Enter company website",
    description: "Enter a company website for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_email",
    label: "Company Email",
    placeholder: "Enter company email",
    description: "Enter a company email for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_phone",
    label: "Company Phone",
    placeholder: "Enter company phone",
    description: "Enter a company phone for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_address",
    label: "Company Address",
    placeholder: "Enter company address",
    description: "Enter a company address for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_country",
    label: "Company Country",
    placeholder: "Enter company country",
    description: "Enter a company country for your ad",
    type: "text",
    required: true,
  },
  {
    name: "ads_company_logo",
    label: "Company Logo",
    placeholder: "Enter company logo",
    description: "Enter a company logo for your ad",
    type: "img",
    required: true,
  },
  {
    name: "ads_thumbnail",
    label: "Thumbnail",
    placeholder: "Enter thumbnail",
    description: "Enter a thumbnail for your ad",
    type: "img",
    required: true,
  },
  {
    name: "url",
    label: "Orginal video or image",
    placeholder: "Enter url",
    description: "Enter a url for your ad",
    type: "img",
    required: false,
  },
  {
    name: "ads_placement",
    label: "Placement",
    placeholder: "Enter placement",
    description: "Enter a placement for your ad",
    type: "select",
    required: false,
  },
];

const dynamicFormSchema = z.object(
  Object.fromEntries(
    dynamicFormData.map((field) => [field.name, z.string().min(2).max(200)])
  )
);

const CreateAds = ({ roomId }: any) => {
  const { authId } = useAuth();
  const [logo, setLogo] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);
  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: Object.fromEntries(
      dynamicFormData.map((field) => [field.name, ""])
    ),
  });
  console.log(logo, "logo");

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      console.log(values);

      // Convert form values to FormData
      const formData = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }
      formData.delete("url");
      formData.delete("ads_thumbnail");
      formData.delete("ads_company_logo");
      formData.append("files", logo);
      formData.append("files", thumbnail);
      formData.append("files", url);
      formData.append("user", authId);
      formData.append("userId", authId);
      formData.append("roomId", roomId);
      formData.append("room", roomId);

      // Make axios POST request with FormData
      const res = await axios.post("http://localhost:3000/v1/ads", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Ad created successfully");
      }
      console.log(res.data); // Assuming the response data is what you want to log
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold pb-4">Ads Schedule</h1>

      <ScrollArea className="h-[80vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-1"
          >
            {dynamicFormData.map((item, index) => (
              <div key={index} className="">
                {item.type === "img" ? (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            placeholder={item.placeholder}
                            {...field}
                            onChange={(e: any) => {
                              field.onChange(e);
                              if (item.name === "ads_company_logo") {
                                setLogo(e.target.files[0]);
                              } else if (item.name === "ads_thumbnail") {
                                setThumbnail(e.target.files[0]);
                              } else {
                                setUrl(e.target.files[0]);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>{item.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input placeholder={item.placeholder} {...field} />
                        </FormControl>
                        <FormDescription>{item.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
};

export default CreateAds;
