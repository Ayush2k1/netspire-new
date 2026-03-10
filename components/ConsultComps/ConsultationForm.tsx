"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name is required.",
  }),
  lastName: z.string().min(2, {
    message: "Last name is required.",
  }),
  email: z.string().min(2, {
    message: "Enter a valid email.",
  }),
  phone: z.string().min(2, {
    message: "Enter a valid phone number.",
  }),
  appointmentDate: z.date({
    error: "Preferred appointment date is required.",
  }),
  appointmentTime: z.string({
    error: "Preferred appointment time is required.",
  }),
  reason: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const ConsultationForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      appointmentDate: new Date(),
      appointmentTime: "",
      reason: "",
      additionalInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {});
  }

  return (
    <section className="section-padding pt-[150px] 650:pt-[200px]">
      <div className="max-w-small mx-auto w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 450:grid-cols-2 gap-3"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-2 450:col-span-1">
                  <FormControl>
                    <Input placeholder="Enter Your First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-2 450:col-span-1">
                  <FormControl>
                    <Input placeholder="Enter Your Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2 450:col-span-1">
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-2 450:col-span-1">
                  <FormControl>
                    <Input placeholder="Enter Your Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input placeholder="Reason for Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Details of enquiry (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 flex flex-col gap-4">
              <p className="text-center text-gray-600">
                You accept the Terms & Conditions by submitting your request.
              </p>
              <Button disabled={isPending} size="lg" type="submit">
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ConsultationForm;
