import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
import type { INavItem } from "@/components/navbar/navTypes";
import logo from "@/assets/icons/logo.png";
import { NotificationIcon } from "@/components/ui/notificationicon";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import GithubIcon from "@/components/ui/GithubIcon";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="fixed top-0 inset-x-0 z-50 w-full bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80 shadow-lg shadow-black/50"
      classNames={{
        base: "bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80",
        wrapper: "w-full max-w-full px-6 sm:px-10 lg:px-12 h-16 sm:h-20 flex justify-between items-center relative",
        menu: "bg-neutral-950/98 backdrop-blur-2xl pt-6 px-6 border-b border-neutral-800/80 top-16 sm:top-20",
      }}
    >
      {/* Brand / Logo at Left Corner */}
      <NavbarContent className="basis-1/4 sm:basis-auto" justify="start">
        <NavbarBrand className="gap-3">
          <RouterLink
            to="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Shashvat Singh Logo"
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation Links — Centered with Larger Font */}
      <NavbarContent
        className="hidden lg:flex gap-10 absolute left-1/2 -translate-x-1/2"
        justify="center"
      >
        {siteConfig.navItems.map((item: INavItem) => {
          const isActive = location.pathname === item.href;
          return (
            <NavbarItem key={item.href} isActive={isActive}>
              <RouterLink
                to={item.href}
                className={`relative py-2 px-3 text-base lg:text-lg font-medium transition-all duration-200 tracking-wide ${
                  isActive
                    ? "bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent font-bold"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-full shadow-sm shadow-cyan-500/50" />
                )}
              </RouterLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Desktop Actions at Right Corner */}
      <NavbarContent className="hidden lg:flex basis-1/4" justify="end">
        <NavbarItem className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-2xl text-neutral-300">
            <LinkedinIcon />
            <GithubIcon />
          </div>
          {location.pathname === "/" && (
            <>
              <div className="h-5 w-px bg-neutral-800" />
              <NotificationIcon />
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Actions: Notification & Hamburger Toggle at Right Corner */}
      <NavbarContent className="lg:hidden gap-3" justify="end">
        {location.pathname === "/" && (
          <NavbarItem className="flex items-center">
            <NotificationIcon />
          </NavbarItem>
        )}
        <NavbarItem className="flex items-center">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg hover:bg-neutral-900 transition-colors"
          />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Drawer Menu */}
      <NavbarMenu className="bg-neutral-950/98 backdrop-blur-2xl border-b border-neutral-800/80 pt-6 pb-8 px-6 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          {siteConfig.navItems.map((item: INavItem) => {
            const isActive = location.pathname === item.href;
            return (
              <NavbarMenuItem key={item.href}>
                <RouterLink
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-lg font-medium transition-all min-h-[44px] ${
                    isActive
                      ? "bg-neutral-900/90 border border-neutral-800 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent font-semibold shadow-sm"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  {item.label}
                </RouterLink>
              </NavbarMenuItem>
            );
          })}
        </div>

        {/* Mobile Drawer Footer with Social Icons */}
        <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-4 text-2xl text-neutral-300">
            <LinkedinIcon />
            <GithubIcon />
          </div>
          <p className="text-xs text-neutral-500 font-medium">Shashvat Singh</p>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
