"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: "Overview",
      path: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: "Billboards",
      path: `/${params.storeId}/billboards`,
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      label: "Categories",
      path: `/${params.storeId}/categories`,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      label: "Sizes",
      path: `/${params.storeId}/sizes`,
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      label: "Colors",
      path: `/${params.storeId}/colors`,
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      label: "Products",
      path: `/${params.storeId}/products`,
      active: pathname === `/${params.storeId}/products`,
    },
    {
      label: "Settings",
      path: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className="flex items-center mx-6 space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
