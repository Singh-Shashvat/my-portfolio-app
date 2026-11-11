import type {
  IProject,
  IMiniProject,
} from "@/Modules/WorkandExperience/project/projectTypes";

import { motion } from "framer-motion";

import {
  miniprojectHeading,
  miniProjects,
  projectHeading,
  projects,
} from "@/constants/Constant";

export const Projects = () => {
  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Projects Section */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          🚀{" "}
          <span className="bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent">
            {projectHeading}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project: IProject, index: number) => (
            <motion.div
              key={project.title}
              className="flex flex-col justify-between h-full p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-1 text-left"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div>
                <div className="flex items-center justify-start mb-4 p-3 w-fit rounded-xl bg-neutral-800/50">
                  {project.icon}
                </div>

                <h3 className="text-xl font-semibold bg-gradient-to-r from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent mb-2">
                  {project.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-xs rounded-md bg-neutral-800/80 border border-neutral-700/60 text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800/60 mt-auto">
                <a
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors duration-200"
                  href={project.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Project <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Projects Section */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 mt-16 sm:mt-20"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent">
            {miniprojectHeading}
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {miniProjects.map((project: IMiniProject, index: number) => (
            <motion.div
              key={project.title}
              className="flex flex-col justify-between h-full p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40 hover:-translate-y-1 text-left"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div>
                <div className="flex items-center justify-start mb-4 p-3 w-fit rounded-xl bg-neutral-800/50">
                  {project.icon}
                </div>

                <h3 className="text-xl font-semibold bg-gradient-to-r from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent mb-2">
                  {project.title}
                </h3>

                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {project.tech && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-xs rounded-md bg-neutral-800/80 border border-neutral-700/60 text-neutral-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
