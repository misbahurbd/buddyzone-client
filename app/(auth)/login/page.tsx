import { LoginForm } from "@/features/auth/components";
import { ScaleLoader as Spinner } from "react-spinners";
import Image from "next/image";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center flex-col gap-8 lg:gap-0 lg:flex-row">
      <div className="w-full lg:w-8/12">
        <Image
          src="/images/login.png"
          alt="register-left"
          width={800}
          height={800}
          priority
          className="w-full max-w-2xl"
        />
      </div>
      <div className="w-full lg:w-4/12">
        <Suspense fallback={<Spinner color="#000" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
