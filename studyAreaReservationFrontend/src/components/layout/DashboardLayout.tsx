import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-grow flex-col w-full min-h-screen overflow-y-auto">
        <div className="sticky flex items-center h-10 px-4 bg-white border-b md:hidden">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
