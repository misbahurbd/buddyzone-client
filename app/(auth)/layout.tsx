import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen relative isolate py-[50px] lg:py-[100px]">
      <span className="absolute top-0 left-0 hidden lg:block -z-10">
        <Image
          src={"/images/shape1.svg"}
          alt="shape-1"
          width={100}
          height={100}
          className="w-36"
        />
      </span>
      <span className="absolute top-0 right-0 hidden lg:block -z-10">
        <Image
          src={"/images/shape2.svg"}
          alt="shape-2"
          width={100}
          height={100}
          className="w-[450px]"
        />
      </span>
      <span className="absolute bottom-0 right-0 hidden lg:block -z-10">
        <Image
          src={"/images/shape3.svg"}
          alt="shape-3"
          width={100}
          height={100}
          className="w-[494px]"
        />
      </span>
      <main className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="w-full">{children}</div>
      </main>
    </section>
  );
};

export default AuthLayout;
