import Sidebar from "@/components/sidebar";
import SidebarLayout from "@/components/sidebar-layout";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SessionProvider>
        <SidebarLayout
          mobileSidebar={<Sidebar isMobile={true} />}
          desktopSidebar={<Sidebar />}
        >
          {children}
        </SidebarLayout>
      </SessionProvider>
    </>
  );
}
