import { z } from "zod";

export const fileUploadSchema = z.object({
  file: z.instanceof(File),
});

export const userDetailsSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  email: z.string().email({
    message: "Email is not valid.",
  }),
  linkedInProfile: z.string().url({
    message: "LinkedIn profile is not valid.",
  }).optional(),
});
