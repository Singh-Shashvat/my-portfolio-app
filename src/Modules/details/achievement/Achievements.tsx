import type { IAchievement } from "@/Modules/details/achievement/achievTypes";

import { motion } from "framer-motion";

import { achievements } from "@/constants/Constant";

export const Achievements = () => {
  return (
    <section className="py-12 sm:py-16">
      <motion.h2
        className="font-extrabold text-center mb-10 bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl pb-3 pt-1 px-2 leading-normal overflow-visible inline-block w-full"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Achievements
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((ach: IAchievement, index) => (
          <motion.div
            key={ach.title}
            className="flex flex-col items-start p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-1 h-full"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="p-3 rounded-xl bg-neutral-800/60 mb-4"
              initial={{ rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              {ach.icon}
            </motion.div>

            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#0575E6] to-[#D4145A] bg-clip-text text-transparent mb-2">
              {ach.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed flex-grow">
              {ach.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
