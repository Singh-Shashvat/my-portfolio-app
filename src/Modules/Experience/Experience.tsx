
import { motion } from "framer-motion";
import { experiences } from "@/Constant/Constant";
import {ProjectTechs} from "@/Modules/Project/ProjectTechs";

export const Experience = () => {
  return (
    
      <section className="min-h-screen flex flex-col items-center justify-center p-6">
        
        <motion.h2
          className="text-6xl font-bold mb-10 bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Experience
        </motion.h2>

        
        <div className="space-y-8 w-full max-w-3xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              className="relative border-l-4 border-blue-500 pl-6 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
             
              <div className="absolute -left-3 top-4 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900"></div>

              <h3 className="text-xl font-semibold bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent mb-2">
                {exp.role}
              </h3>
              <span className="text-sm bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent mb-4">
                {exp.duration}
              </span>
              <p className="mt-2 bg-gradient-to-l from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent">
                {exp.description}
              </p>

              
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                 <ProjectTechs
                 
                  technologies={tech}
                 />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    
  );
};
