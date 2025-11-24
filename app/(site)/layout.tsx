import { Header } from "@/components/header/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <Header />
      {children}
    </section>
  );
};

export default SiteLayout;
