

import { motion } from "framer-motion";
import { projectHeading, projects } from "@/Constant/Constant";


export  const Projects = () => {
  return (
   
        <section className="py-4 px-6 scroll-mt-60 ">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-6xl font-bold  mb-10">
            🚀 <span className="bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent relative">{projectHeading}</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {projects.map((project, index) => (
                <motion.div
                key={project.title}
                className="p-6  rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-4">{project.icon}</div>

                  <h3 className="text-xl font-semibold bg-gradient-to-l from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent">
                      {project.title}
                  </h3>

                  <p className="bg-gradient-to-l from-[#0575E6] to-[#D4145A] bg-clip-text text-transparent text-sm mt-2">
                      {project.description}
                  </p>

                  <a
                      href={project.link}
                      target="_blank"
                      className="inline-block mt-4 text-primary font-medium hover:underline"
                      >
                      View Project →
                  </a>

                </motion.div>
            ))}
            </div>
          </div>
        </section>
  
  );
}
