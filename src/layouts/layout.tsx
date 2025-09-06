import {Navbar} from "@/components/navbar/Navbar"
import { Outlet } from "react-router-dom"

import { Footer } from "@/components/footer/footer"

export const DefaultLayout = () => {
  return (
    <div className="relative flex flex-col h-screen">
        <Navbar/>
        <main className="relative bg-black container mx-auto max-w-7xl px-6 flex-grow pt-20 border-2 border-b-white ">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

