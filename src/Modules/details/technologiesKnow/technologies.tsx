import { motion } from "framer-motion";
import { Technologieslearn } from "@/Modules/details/technologiesKnow/technologieslearn";
import { techHeading, techIntro, technologies } from "@/constants/Constant";
import { ITechCategory } from "@/Modules/details/technologiesKnow/techTypes";




export const Technologies = () => {
  return (
    
      <div className="p-4 ">
        
        <motion.div
          className="flex flex-col justify-center items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className=" font-semibold bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent text-3xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl">
            {techHeading}
          </p>
          <p className=" bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent max-w-3xl text-start  text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
            {techIntro}
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4  flex-col sm:flex-col md:flex-row md:items-start lg:flex-row lg:items-start xl:flex-row xl:items-start">

        {technologies.map((techx: ITechCategory ) => (
            <Technologieslearn 
            key={techx.title}
            title={techx.title}
            items={techx.items}
            
            />
        ))}
        </div>
      </div>
    
  );
};
