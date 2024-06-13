"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fileUploadSchema } from "@/lib/validator";
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

const DocumentUpload = () => {
  //   const fileUploadForm = useForm<z.infer<typeof fileUploadSchema>>({
  //     resolver: zodResolver(fileUploadSchema),
  //     defaultValues: {
  //       file: undefined,
  //     },
  //   });

  //   const onSubmit = async (values: z.infer<typeof fileUploadSchema>) => {
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //     });
  //   };

  return (
    <input
      type="file"
      onChange={async (e) => {
        const formData = new FormData();

        if (!e.target.files) {
          return;
        }

        formData.append("file", e.target.files[0]);

        const res = await axios.post("/api/ai/chat", formData);

      }}
    />
    // <FormField
    //   control={fileUploadForm.control}
    //   name="file"
    //   render={({ field }) => (
    //     <FormItem>
    //       <FormLabel>Username</FormLabel>
    //       <FormControl>
    //         <Input type="file" placeholder="shadcn" {...field} />
    //       </FormControl>
    //       <FormDescription>This is your public display name.</FormDescription>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
};

export default DocumentUpload;
