// hooks/useUserForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserFormData, AgeOptions } from "@/app/types";

// Zod validation schema
export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.number().min(18, "Age must be 18 or older"),
  sex: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select your sex" }),
  }),
  skills: z.array(z.string()).min(1, "At least one skill must be selected"),
  agreeTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
});

export type User = z.infer<typeof userSchema>;

export const useUserForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  // const onSubmit = (data: UserFormData) => {
  //   return data;
  // };

  return { register, handleSubmit, errors, reset };
};
