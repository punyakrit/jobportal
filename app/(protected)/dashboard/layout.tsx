import Header from "@/components/dahboard/ui/Header";
import Sidebar from "@/components/dahboard/ui/Sidebar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid grid-cols-12 '>
      <div className='col-span-2'>
        <Sidebar/>
      </div>
      <div className='col-span-10 p-4 overflow-auto'>
        <Header/>
        {children}
      </div>
    </div>
  );
}
