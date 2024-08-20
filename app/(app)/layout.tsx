import Sidebar from "@/components/sidebar";
import SidebarLayout from "@/components/sidebar-layout";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarLayout
        mobileSidebar={<Sidebar isMobile={true} />}
        desktopSidebar={<Sidebar />}
      >
        {children}
      </SidebarLayout>
    </>
  );
}
