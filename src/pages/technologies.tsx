// import { DefaultLayout } from "@/layouts/layout";

import { motion } from "framer-motion";
// import { technologies } from "@/Constant/Constant";
// import { ITechCategory } from "@/types";
import { Technologieslearn } from "@/pages/technologieslearn";
import { techHeading, techIntro, technologies } from "@/Constant/Constant";



export const Technologies = () => {
  return (
    // <DefaultLayout>
      <div className="p-4">
        
        <motion.div
          className="flex flex-col justify-center items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-6xl font-semibold bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent">
            {techHeading}
          </p>
          <p className="text-2xl bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent text-center max-w-3xl">
            {techIntro}
          </p>
        </motion.div>

        <div className="flex justify-center  gap-4 items-start">

        {technologies.map((techx ) => (
            <Technologieslearn 
            key={techx.title}
            title={techx.title}
            items={techx.items}
            
            />
        ))}
        </div>
      </div>
    // </DefaultLayout>
  );
};
