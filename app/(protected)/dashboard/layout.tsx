import Header from "@/components/dahboard/ui/Header";
import Sidebar from "@/components/dahboard/ui/Sidebar";
import { JobSearchProvider } from "@/context/JobSearchContext";
import { UserProvider } from "@/context/user";
import { ReactNode } from "react";
import { createClient } from '@/utils/supabase/server';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || "";

  return (
    <UserProvider user={user}>
      <JobSearchProvider userId={userId}>
        <div className='flex h-screen'>
          <div className='w-64 flex-shrink-0'>
            <Sidebar/>
          </div>
          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className="px-4 pt-4">
              <Header/>
            </div>
            <div className='flex-1 overflow-auto px-2'>
              {children}
            </div>
          </div>
        </div>
      </JobSearchProvider>
    </UserProvider>
  );
}
