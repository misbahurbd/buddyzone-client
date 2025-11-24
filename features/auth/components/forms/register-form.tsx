"use client";

import { useForm } from "react-hook-form";
import { AuthFormContainer } from "@/features/auth/components/";
import { registerSchema, RegisterSchema } from "@/features/auth/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form";
import Link from "next/link";
import { register } from "@/features/auth/actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await register(data);

    if (res.success) {
      toast.success(res.message);
      form.reset();
      const next = searchParams.get("next");
      if (next) {
        router.push(next);
      } else {
        router.push("/");
      }
    } else {
      toast.error(res.message);
    }
  });

  return (
    <AuthFormContainer
      title="Registration"
      subTitle="Get Started Now"
      googleButtonText="Register with google"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex gap-4 w-full">
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            disabled={form.formState.isSubmitting}
          />
          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            disabled={form.formState.isSubmitting}
          />
        </div>
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          disabled={form.formState.isSubmitting}
        />
        <FormInput
          control={form.control}
          name="password"
          label="Password"
          type="password"
          disabled={form.formState.isSubmitting}
        />
        <FormInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          disabled={form.formState.isSubmitting}
        />
        <button
          type="submit"
          className="w-full bg-color5 cursor-pointer py-3 px-5 rounded-md text-white font-semibold transition-all hover:bg-color6 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={form.formState.isSubmitting}
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm text-[#767676] mt-14">
        Already have an account?{" "}
        <Link href="/login" className="text-color5">
          Login Now
        </Link>
      </p>
    </AuthFormContainer>
  );
};
