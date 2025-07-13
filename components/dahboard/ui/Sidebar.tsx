import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { Bookmark, Briefcase, Home, LogOut, Paperclip, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import LogOutButton from "./LogOutButton";

const sidebarItems = [
  {
    icon: <Home className="w-6 h-6 text-black" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-black" />,
    label: "Job Listing",
    href: "/dashboard/job-listing",
  },
  {
    icon: <Bookmark className="w-6 h-6 text-black" />,
    label: "Saved Jobs",
    href: "/dashboard/saved-jobs",
  },
  {
    icon: <Paperclip className="w-6 h-6 text-black" />,
    label: "Applied Jobs",
    href: "/dashboard/applied-jobs",
  },
  {
    icon: <Settings className="w-6 h-6 text-black" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
  
  
];

async function Sidebar() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser();
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan?user_id=${user?.id}`)
  console.log(response)
  return (
    <div className="bg-white h-screen w-full flex flex-col">
      <div className="border-b flex items-center gap-5 p-2 px-6 pt-4">
        <div className="bg-green-500 p-2 rounded-lg">
          <Briefcase className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col -space-y-2">
          <div className="text-2xl font-bold font-zain">Remotix</div>
          <div className="text-sm text-gray-700">{response.data.plan === 'FREE' ? 'Free Trial' : 'Paid User'}</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="py-5 px-4 space-y-3 mt-5">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center pl-2 gap-2 p-2 py-3 bg-green-200/70 rounded-xl cursor-pointer hover:bg-green-300 transition-all duration-500"
            >
              {item.icon}
              <div className=" font-semibold">{item.label}</div>
            </Link>
          ))}
        </div>

        <LogOutButton />
      </div>
    </div>
  );
}

export default Sidebar;
