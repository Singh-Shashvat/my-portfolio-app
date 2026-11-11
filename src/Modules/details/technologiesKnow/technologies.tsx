import type { ITechCategory } from "@/Modules/details/technologiesKnow/techTypes";

import { motion } from "framer-motion";

import { Technologieslearn } from "@/Modules/details/technologiesKnow/technologieslearn";
import { techHeading, techIntro, technologies } from "@/constants/Constant";

export const Technologies = () => {
  return (
    <section className="py-12 sm:py-16 scroll-mt-28" id="technologies">
      <motion.div
        className="flex flex-col justify-center items-center text-center gap-4 mb-10"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent pb-3 pt-1 px-2 leading-normal overflow-visible inline-block">
          {techHeading}
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed">
          {techIntro}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {technologies.map((techx: ITechCategory) => (
          <Technologieslearn
            key={techx.title}
            items={techx.items}
            title={techx.title}
          />
        ))}
      </div>
    </section>
  );
};
