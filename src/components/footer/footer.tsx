import type { IFootType } from "@/components/footer/footTypes";

import { footerdata } from "@/constants/Constant";

export const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950/80 border-t border-neutral-800/80 py-6 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 md:gap-12 text-base lg:text-lg font-medium tracking-wide">
        {footerdata.map((foot: IFootType) => {
          const href =
            foot.type === "gmail"
              ? `mailto:${foot.value}`
              : foot.type === "MobNo"
                ? `tel:${foot.value}`
                : undefined;

          if (href) {
            return (
              <a
                key={foot.type}
                className="group flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                href={href}
              >
                <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent group-hover:brightness-125">
                  {foot.value}
                </span>
              </a>
            );
          }

          return (
            <div key={foot.type} className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">
                {foot.value}
              </span>
            </div>
          );
        })}
      </div>
    </footer>
  );
};
