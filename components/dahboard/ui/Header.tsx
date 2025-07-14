import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import React from "react";

async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user-validate`,
    { id: user?.id }
  );

  const credits = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/plan?user_id=${user?.id}`
  );

  return (
    <div className="w-full bg-white border border-gray-200 my-2 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="font-extrabold text-green-500 text-2xl">
          {Date.now() / 1000 < 12 ? (
            <span>Good Morning</span>
          ) : Date.now() / 1000 > 12 && Date.now() / 1000 < 18 ? (
            <span>Good Afternoon</span>
          ) : (
            <span>Good Evening</span>
          )}
          <span> {user?.user_metadata?.full_name.split(" ")[0]}!</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="text"
              placeholder="Search Jobs"
              className="pl-10 pr-4 py-2 w-72 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-green-300 focus:ring-2 focus:ring-green-100 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 rounded-xl bg-gradient-to-r from-green-50 to-green-100 px-4 py-2.5 border border-green-200">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span className="text-green-700">Credits: {credits.data.credits}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
