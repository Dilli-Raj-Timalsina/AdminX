import { Edit, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { entityList } from "@/lib/store/entity-list";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="pl-8 py-4">
        <Link href="/admin" className="cursor-pointer">
          <h1 className="text-4xl font-bold ">
            Admin<span className="text-blue-400">X</span>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />

      {/* <SidebarInset> */}
      <SidebarContent className="pl-4">
        {entityList.map((entity) => (
          <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-base ">
              {entity.display.pluralName}
            </SidebarGroupLabel>
            <SidebarGroupContent className="pl-2 font-semibold text-3xl text-slate-700">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200">
                    <Link href={`/admin/${entity.dbConfig.tableName}/create`}>
                      <Plus />
                      <span>Create {entity.display.pluralName}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-slate-200">
                    <Link href={`/admin/${entity.dbConfig.tableName}/list`}>
                      <Edit />
                      <span>Update {entity.display.pluralName}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center p-4 space-x-4">
          <img
            src="/user.png"
            alt="Profile Picture"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Dilli Raj</span>
            <span className="text-sm text-gray-500">dilliraj@gmail.com</span>
          </div>
        </div>
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
