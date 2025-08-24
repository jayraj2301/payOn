"use client"

import { usePathname,useRouter } from 'next/navigation';
import React from 'react';

export const SidebarItem = ({href,title,icon}:{href : string,title : string,icon : React.ReactNode}) => {

    const router = useRouter()
    const path = usePathname()
    const isActive = path ===  href

    return <div className={`flex ${isActive ? "text-[#6a51a6] bg-[#c4aaff]" : "text-slate-500"} rounded-md cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${isActive ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}