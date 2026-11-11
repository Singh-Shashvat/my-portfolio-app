import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh bg-black text-white relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
