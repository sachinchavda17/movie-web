import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "password must be grater that 3" }),
});
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "password must be grater that 3" }),
  confirmPassword: z.string().min(6, { message: "password must be grater that 3" }),
});

