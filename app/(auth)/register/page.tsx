import { RegisterForm } from "@/features/auth/components";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="flex items-center flex-col gap-8 lg:gap-0 lg:flex-row">
      <div className="w-full lg:w-8/12">
        <Image
          src="/images/registration.png"
          alt="register-left"
          width={800}
          height={800}
          priority
          className="w-full"
        />
      </div>
      <div className="w-full lg:w-4/12">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
