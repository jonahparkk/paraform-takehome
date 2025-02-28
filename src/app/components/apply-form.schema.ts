import { z } from "zod";
import { ChangeEvent, Ref } from 'react';

export const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const applicationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email('Please enter a valid email address'),
  phone: z.string().regex(phoneRegex, "Invalid phone number").optional(),
  linkedin: z.string().url("Invalid LinkedIn URL"),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  resume: z.instanceof(File, { message: "Resume is required" }),
  coverLetter: z.instanceof(File).optional(),
});

export type FormField = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | File | null;
  name: string;
  ref: Ref<HTMLInputElement>;
};

export type FormValues = z.infer<typeof applicationSchema>; 