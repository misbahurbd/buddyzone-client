import { Header } from "@/components/header/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen overflow-hidden flex flex-col pt-16">
      <Header />
      {children}
    </section>
  );
};

export default SiteLayout;
