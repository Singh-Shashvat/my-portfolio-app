import { useState } from "react";
import { Link } from "@heroui/link";


import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import { siteConfig } from "@/constants/Constant";
import logo from "@/assets/logo.png";
import { NotificationIcon } from "@/components/ui/notificationicon";
import { NavItem } from "@/components/navbar/navTypes";
import { LinkedinIcon } from "@/icons/LinkedinIcon";
import GithubIcon from "@/icons/GithubIcon";

export const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar
      className="z-50 fixed w-full bg-black/70 backdrop-blur-md"
      maxWidth="xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      
      <NavbarContent className="basis-1/5 sm:basis-auto" justify="start">
        <NavbarBrand className="gap-3">
          <Link
            className="flex justify-center items-center gap-2"
            color="foreground"
            href="/"
            onClick={() => setIsMenuOpen(false)} 
          >
            <img
              src={logo}
              alt="Shashvat Singh Logo"
              className="object-contain h-20 w-20"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      
      <NavbarContent className="hidden lg:flex gap-6 justify-center flex-1">
        {siteConfig.navItems.map((item: NavItem ) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className="bg-gradient-to-l from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent hover:opacity-80 transition"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      
      <NavbarContent className="hidden lg:flex basis-1/5" justify="end">
        <NavbarItem className="flex items-center gap-4">
          <div className="flex gap-3 justify-center text-xl">
            <LinkedinIcon />
            <GithubIcon />
          </div>
          <NotificationIcon />
        </NavbarItem>
      </NavbarContent>

      
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex items-center gap-4">
          <div className="flex gap-3 justify-center text-xl">
            <LinkedinIcon />
            <GithubIcon />
          </div>
        </NavbarItem>
        <NotificationIcon />
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-3">
          {siteConfig.navItems.map((item :NavItem, index) => (
            <NavbarMenuItem key={index}>
              <Link
                href={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)} 
                className={`hover:opacity-80 transition ${
                  index === 2
                    ? "text-primary"
                    : index === siteConfig.navItems.length - 1
                    ? "text-danger"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
