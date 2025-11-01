import { Navbar } from "@/components/shared/navbar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div className="h-[calc(100vh-56px)] mt-14">{children}</div>
    </main>
  );
};

export default DashboardLayout;
