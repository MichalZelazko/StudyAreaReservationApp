import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { routes } from "@/routes/routes";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h1 className="text-3xl font-bold">StudyPlace</h1>
      </SidebarHeader>
      <SidebarContent>
        <nav className="flex flex-col w-full">
          {routes
            .filter((route) => route.inNav)
            .map((route, index) => (
              <a
                key={index}
                href={route.path}
                className="p-4 hover:bg-gray-100 flex flex-row items-center gap-3 border-b"
              >
                {route.icon}
                <span className="text-lg font-medium">{route.name}</span>
              </a>
            ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <p className="text-sm text-center">© 2024 All rights reserved.</p>
      </SidebarFooter>
    </Sidebar>
  );
}
