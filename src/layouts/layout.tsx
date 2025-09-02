import {Navbar} from "@/components/Navbar"
import { Outlet } from "react-router-dom"

import { Footer } from "@/components/footer"

export const DefaultLayout = () => {
  return (
    <div className="relative flex flex-col h-screen">
        <Navbar/>
        <main className="relative container mx-auto max-w-7xl px-6 flex-grow pt-20 border-b-2 ">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

// to do
// implement custom colours in config
// footer
// outlet
// put footer in const and map them
// implement absolute pathing