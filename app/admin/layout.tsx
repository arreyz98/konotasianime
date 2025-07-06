
import { ReactNode } from "react";
import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";


const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <main className="flex min-h-screen w-full flex-row">
    <Sidebar name={session?.user?.name} email={session?.user?.email} />
    <div className="flex w-[calc(100%-264px)] h-full flex-1 flex-col bg-[#F8F8FF] p-5 xs:p-10">
      <Header/>
      {children}
    </div>
    </main>
  );
};
export default Layout;