import type { ReactNode } from "react";

export interface ISidebar{
    children: ReactNode;
}

export interface ISidebarItems{
    item?: string;
    url?: string;
    icon?:string;
}

export interface ISidebarItemsProps{
    items:ISidebarItems[],
}