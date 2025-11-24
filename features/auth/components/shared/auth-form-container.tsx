"use client";

import Image from "next/image";

interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  googleButtonText: string;
}

export const AuthFormContainer = ({
  children,
  title,
  subTitle,
  googleButtonText,
}: AuthFormContainerProps) => {
  const handleGoogleLogin = async () => {};
  return (
    <section className="w-full bg-white rounded-sm p-12">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={160}
        height={160}
        className="w-38 mx-auto mb-7"
      />
      <div className="mb-12">
        <p className="text-center mb-2 text-sm">{subTitle}</p>
        <h4 className="text-center mb-8 text-2xl font-medium">{title}</h4>
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="border border-bcolor3 rounded-md p-2 w-full font-medium flex items-center justify-center gap-2"
      >
        <Image
          src="/images/google.svg"
          alt="google"
          width={20}
          height={20}
          className="mr-2"
        />
        {googleButtonText}
      </button>
      <div className="relative my-10 text-center text-sm text-color3">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[calc(50%-40px)] h-px bg-bg4" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[calc(50%-40px)] h-px bg-bg4" />
        Or
      </div>
      {children}
    </section>
  );
};
