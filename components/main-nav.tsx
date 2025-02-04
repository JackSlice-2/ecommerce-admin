"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function MainNav({
    className,
    onClick
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Home',
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/infos`,
            label: 'Information',
            active: pathname === `/${params.storeId}/infos`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Colors',
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`,
        },
    ];

    return (
        <nav
            className={cn("grid grid-col-1 lg:flex flex-center items-center space-x-1 lg:space-x-3 z-50 justify-around", className)}
            >
        {routes.map((route) => (
            <Link
            key={route.href}
            href={route.href}
            onClick={onClick}
            className={cn(
                "text-xl lg:text-md transition-colors hover:bg-slate-800 rounded-xl py-3 font-semibold hover:text-primary px-4",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
            >
            {route.label}
            </Link>
        ))}
        </nav>
    )
};