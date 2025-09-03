import { motion } from "framer-motion";
import { achievements } from "@/Constant/Constant";


export const Achievements = () => {
  return (
    
      <section className="py-10 px-6 rounded-2xl shadow-md">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center mb-6 bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent"
        >
          Achievements
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-start p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {ach.icon}
              </motion.div>

              <h3 className="mt-3 text-lg font-semibold bg-gradient-to-l from-[#0575E6] to-[#D4145A] bg-clip-text text-transparent">
                {ach.title}
              </h3>
              <p className="bg-gradient-to-l from-[#fc6076] to-[#ff9a44] bg-clip-text text-transparent text-sm mt-2">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    
  );
};
