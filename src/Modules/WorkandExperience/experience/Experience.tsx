import { motion } from "framer-motion";
import { experiences } from "@/constants/Constant";
import { ProjectTechs } from "@/Modules/WorkandExperience/experience/ProjectTechs";
import type { IExperienceType } from "@/Modules/WorkandExperience/experience/experienceTypes";

export const Experience = () => {
  return (
    <section className="py-12 sm:py-16 flex flex-col items-center justify-center">
      <motion.h2
        className="font-extrabold mb-10 text-center bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl pb-3 pt-1 px-2 leading-normal overflow-visible inline-block w-full"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <div className="space-y-8 w-full max-w-3xl">
        {experiences.map((exp: IExperienceType, index: number) => (
          <motion.div
            key={exp.role}
            className="relative border-l-2 border-cyan-500/60 pl-6 p-5 sm:p-6 rounded-2xl bg-neutral-900/30 border-neutral-800/80 hover:border-cyan-500/50 transition-all duration-300 shadow-md shadow-black/30"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            {/* Timeline node dot */}
            <div className="absolute -left-[9px] top-6 w-4 h-4 bg-cyan-400 rounded-full border-2 border-black ring-4 ring-cyan-500/20 shadow-sm shadow-cyan-400"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent">
                {exp.role}
              </h3>
              <span className="text-xs sm:text-sm font-medium text-neutral-400">
                {exp.duration}
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-base text-neutral-300 leading-relaxed">
              {exp.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.technologies.map((tech: string) => (
                <ProjectTechs key={tech} technologies={tech} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
