"use client";

import { UserEntity } from "@/lib/store/entities";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GalleryVerticalEnd } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const entities = [
    {
      entity: UserEntity,
      href: `/admin/${UserEntity.key}/list`,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/40">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="h-4 w-4" />
            </div>
            Admin Panel
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {entities.map(({ entity, href }) => (
            <Link
              key={entity.key}
              href={href}
              className={cn(
                "flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.includes(entity.key)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {entity.display.pluralName}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
