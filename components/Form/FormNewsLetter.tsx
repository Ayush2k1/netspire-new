// "use client";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import React, { useState, useTransition } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Loader } from "lucide-react";
// import formatDateOnlyDate from "@/utils/formatDateOnlyDate";
// import dynamic from "next/dynamic";

// const Lottie = dynamic(() => import("../SuccessLottieAnimations"));

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Please enter your name.",
//   }),
//   email: z.string().min(2, {
//     message: "Enter a valid email.",
//   }),
// });

// const NewsletterForm = () => {
//   const [showLottie, setShowLottie] = useState(false);

//   const [isPending, startTransition] = useTransition();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
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
//             name: values.name,
//             email: values.email,
//             subject: "Newsletter Subscription | Isbitser Coertze & Associates",
//             template: "newsletter",
//           }),
//         });
//         const response = await emailResponse.json();

//         const sanityMutateRes = await fetch("/api/sanity-mutate-forms", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             _type: "newsletterSubmissions",
//             newsletter: {
//               email: values.email,
//               name: values.name,
//             },
//             title: `${values.name} has subscribed to the newsletter.`,
//             subTitle: formatDateOnlyDate(new Date()),
//           }),
//         });

//         const sanityMutateResJson = await sanityMutateRes.json();

//         if (emailResponse.ok && sanityMutateRes.ok) {
//           setShowLottie(true);
//           // toast({
//           //   title: "Newsletter Signup Successful!",
//           //   description: "Thank you for subscribing to our newsletter.",
//           // });
//           form.reset();
//         } else {
//           // toast({
//           //   variant: "destructive",
//           //   title: "Newsletter Signup Failed!",
//           //   description:
//           //     "Your subscription was not successful. Please try again.",
//           // });
//         }
//       } catch (error) {
//         // toast({
//         //   variant: "destructive",
//         //   title: "Newsletter Signup Failed!",
//         //   description:
//         //     "Your subscription was not successful. Please try again.",
//         // });
//         console.error("There was an error sending the email:", error);
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col gap-4 relative "
//       >
//         {showLottie && <Lottie />}
//         <div className="grid 600:grid-cols-2 gap-3">
//           <FormField
//             disabled={isPending}
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input placeholder="Enter Your name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             disabled={isPending}
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input placeholder="Enter Your Email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <p className="w-full text-center">
//             You accept the Terms & Conditions by submitting your request.
//           </p>

//           <Button disabled={isPending} size="lg" type="submit">
//             {isPending && <Loader size={20} className="mr-2 animate-spin" />}{" "}
//             Subscribe
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default NewsletterForm;
