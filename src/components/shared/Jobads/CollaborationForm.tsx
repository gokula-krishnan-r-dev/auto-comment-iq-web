"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
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
import axios from "axios";
import { useAuth } from "@/components/provider/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const dynamicFormData = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Job Title",
    description: "The title of the job.",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Job Description",
    description: "The job description.",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    placeholder: "Job Location",
    description: "The location of the job.",
  },
  {
    name: "pricePerVideo",
    label: "Price Per Video",
    type: "number",
    placeholder: "Enter price",
    description: "The price per video.",
  },
  {
    name: "level",
    label: "Level",
    type: "text",
    placeholder: "Job Level",
    description: "The level of the job.",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Job City",
    description: "The city of the job.",
  },
  {
    name: "mode",
    label: "Mode",
    type: "text",
    placeholder: "Select Online or Offline",
    description: "Select the mode of the Collaboration with Influencer.",
  },
  {
    name: "requirements",
    label: "Requirements",
    type: "text",
    placeholder: "Job Requirements",
    description: "The requirements for the job.",
  },
  {
    name: "category",
    label: "Community",
    type: "select",
    placeholder: "Collaboration Community",
    description: "The Collaboration of the job.",
  },
  {
    name: "contact_number",
    label: "Contact Number",
    type: "text",
    placeholder: "Contact Number",
    description: "The contact number for the job.",
  },
  {
    name: "is18plus",
    label: "Is 18+",
    type: "checkbox",
    description: "Check if the job is for individuals aged 18 and above.",
    title: "Is 18+",
    defaultChecked: true,
  },
  {
    name: "isKids",
    label: "Is for Kids",
    type: "checkbox",
    description: "Check if the job is suitable for kids.",
    title: "Is for Kids",
  },
];

const dynamicFormSchema = z.object(
  Object.fromEntries(
    dynamicFormData.map((field) => {
      switch (field.type) {
        case "checkbox":
          return [field.name, z.boolean()];
        default:
          return [field.name, z.string()];
      }
    })
  )
);

const CollaborationForm = () => {
  const { authId } = useAuth();
  const router = useRouter();
  // 1. Define your form dynamically.
  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: Object.fromEntries(
      dynamicFormData.map((field) => [field.name, ""])
    ),
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      // Make sure to replace 'your-api-endpoint' with your actual API endpoint
      const response = await axios.post(
        "https://autocommentapi.vercel.app/v1/jobads",
        {
          ...values,
          userId: authId,
          user: authId,
          type: "Collaboration",
        }
      );
      if (response.data) {
        console.log("Form submitted successfully:", response.data);
        toast.success("Form submitted successfully");
        router.push("/jobads/search/demo");
      } else {
        toast.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {dynamicFormData.map((item: any) => {
            return (
              <>
                {item.type === "checkbox" ? (
                  <FormField
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            defaultValue={item.defaultChecked}
                            defaultChecked={item.defaultChecked}
                            checked={field.value as any | undefined}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{item?.title}</FormLabel>
                          <FormDescription>
                            {item?.description}
                            <Link href="/examples/forms">
                              mobile settings
                            </Link>{" "}
                            page.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                ) : item.type === "image" ? (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-full px-4 py-4"
                            placeholder={item.placeholder}
                            {...field}
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
                          <Input
                            className="rounded-full px-4 py-4"
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>{item.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CollaborationForm;
