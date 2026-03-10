// "use client";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import React, { useState, useTransition } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader } from "lucide-react";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import formatDateOnlyDate from "@/utils/formatDateOnlyDate";
// import dynamic from "next/dynamic";
// import { toast } from "sonner";

// const Lottie = dynamic(() => import("../SuccessLottieAnimations"));

// const formSchema = z.object({
//   firstName: z.string().min(2, {
//     message: "First name is required.",
//   }),
//   lastName: z.string().min(2, {
//     message: "Last name is required.",
//   }),
//   email: z.string().min(2, {
//     message: "Enter a valid email.",
//   }),
//   phone: z.string().min(2, {
//     message: "Enter a valid phone number.",
//   }),
//   message: z.string().optional(),
//   subject: z.string().optional(),
// });

// const ContactForm = () => {
//   const [showLottie, setShowLottie] = useState(false);

//   const [isPending, startTransition] = useTransition();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       subject: "",
//       message: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     startTransition(async () => {
//       try {
//         const emailResponse = await fetch("/api/send-email", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             firstName: values.firstName,
//             lastName: values.lastName,
//             email: values.email,
//             message: values.message,
//             phone: values.phone,
//             subject: "Contact Form Received | Isbister Coertze & Associates",
//             template: "contact",
//           }),
//         });
//         const response = await emailResponse.json();

//         const sanityMutateRes = await fetch("/api/sanity-mutate-forms", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             _type: "contactSubmissions",
//             contact: {
//               ...values,
//             },
//             title: `${values.firstName} ${values.lastName} has submitted a contact form.`,
//             subTitle: formatDateOnlyDate(new Date()),
//           }),
//         });

//         const sanityMutateResJson = await sanityMutateRes.json();

//         if (emailResponse.ok) {
//           setShowLottie(true);
//           // toast({
//           //   title: "Contact Information Sent Successfully!",
//           //   description:
//           //     "Your Contact Information was sent successfully. We'll be in touch soon.",
//           // });
//           form.reset();
//         } else {
//           // toast({
//           //   variant: "destructive",
//           //   title: "Contact Information Submission Failed!",
//           //   description:
//           //     "Your Contact Information was not sent. Please try again.",
//           // });
//         }
//       } catch (error) {
//         // toast({
//         //   variant: "destructive",
//         //   title: "Contact Information Submission Failed!",
//         //   description:
//         //     "Your Contact Information was not sent. Please try again.",
//         // });
//         console.error("There was an error sending the email:", error);
//       }
//     });
//   }

//   return (
//     <Form {...form}>
//       {showLottie && <Lottie />}
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="grid grid-cols-1 450:grid-cols-2 gap-3"
//       >
//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="firstName"
//           render={({ field }) => (
//             <FormItem className="col-span-2 450:col-span-1">
//               <FormControl>
//                 <Input placeholder="Enter Your First Name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="lastName"
//           render={({ field }) => (
//             <FormItem className="col-span-2 450:col-span-1">
//               <FormControl>
//                 <Input placeholder="Enter Your Last Name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="email"
//           render={({ field }) => (
//             <FormItem className="col-span-2 450:col-span-1">
//               <FormControl>
//                 <Input placeholder="Enter Your Email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="phone"
//           render={({ field }) => (
//             <FormItem className="col-span-2 450:col-span-1">
//               <FormControl>
//                 <Input placeholder="Enter Your Phone" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="subject"
//           render={({ field }) => (
//             <FormItem className="col-span-2">
//               <FormControl>
//                 <Input placeholder="Reason for Contact" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           disabled={isPending}
//           name="message"
//           render={({ field }) => (
//             <FormItem className="col-span-2">
//               <FormControl>
//                 <Textarea
//                   className="placeholder:text-base"
//                   rows={5}
//                   placeholder="Details of Inquiry (optional)"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div className="col-span-2 flex flex-col gap-4">
//           <p className="text-center text-gray-600">
//             You accept the Terms & Conditions by submitting your request.
//           </p>
//           <Button disabled={isPending} size="lg" type="submit">
//             {isPending && <Loader size={20} className="mr-2 animate-spin" />}{" "}
//             Send Message
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ContactForm;
