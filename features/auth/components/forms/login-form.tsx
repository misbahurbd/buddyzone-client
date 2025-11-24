"use client";

import { useForm } from "react-hook-form";
import { AuthFormContainer } from "@/features/auth/components/";
import { LoginSchema, loginSchema } from "@/features/auth/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form";
import Link from "next/link";
import { login } from "../../actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await login(data);

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
      title="Login to your account"
      subTitle="Welcome back"
      googleButtonText="Login with google"
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
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
        <button
          type="submit"
          className="w-full bg-color5 cursor-pointer py-3 px-5 rounded-md text-white font-semibold transition-all hover:bg-color6 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={form.formState.isSubmitting}
        >
          Login now
        </button>
      </form>

      <p className="text-center text-sm text-[#767676] mt-14">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-color5">
          Register Now
        </Link>
      </p>
    </AuthFormContainer>
  );
};
