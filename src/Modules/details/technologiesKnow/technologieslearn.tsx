import { motion } from "framer-motion";
import type { IItems, ITechCategory } from "@/Modules/details/technologiesKnow/techTypes";

export const Technologieslearn = ({ title, items }: ITechCategory) => {
  return (
    <motion.div
      className="flex flex-col h-full p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-cyan-500/5 hover:-translate-y-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent text-lg mb-4 pb-2 border-b border-neutral-800">
        {title}
      </h3>
      <ul className="space-y-3 flex-grow">
        {items.map((item: IItems) => (
          <li
            key={item.name}
            className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
