import Sidebar from "@/components/sidebar";
import SidebarLayout from "@/components/sidebar-layout";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";

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
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </SidebarLayout>
      </SessionProvider>
    </>
  );
}
