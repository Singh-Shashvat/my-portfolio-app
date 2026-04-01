import { Navbar } from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/footer/footer";




export const DefaultLayout = () => {


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-black mx-auto w-full px-6 flex-grow border-2 border-b-white relative">
         <Outlet />     
      </main>
      <Footer />
    </div>
  );
};
