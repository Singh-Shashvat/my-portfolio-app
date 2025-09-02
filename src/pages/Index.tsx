// import { DefaultLayout } from "@/layouts/layout";
import profilepic2 from "../assets/ChatGPT Image Aug 24, 2025, 03_42_53 PM.png";
import { motion } from "framer-motion";
import {Introductiondata} from "../Constant/Constant"

export const IndexPage = () => {
  return (
 
      <div className="flex min-h-screen  justify-center items-center flex-col sm:flex-col md:flex-row-reverse lg:flex-row-reverse xl:flex-row-reverse">
        
        
        <div className="w-1/2 flex justify-center items-center pr-3">
          <motion.img
            src={profilepic2}
            alt="profilepic"
            className="w-3/4 h-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </div>

        
        <div className="w-1/2 flex flex-col justify-center items-center gap-4">
        {Introductiondata.map((intro ) =>(
          <>
            <motion.h1
              key={intro.salutation}
              className=" pl-8 pt-0 bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              >
              {intro.salutation} 
            </motion.h1>

            <motion.h2
              key={intro.position}
              className=" pr-2 bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {intro.position}
            </motion.h2>

            <motion.p
              key={intro.description}
              className=" bg-gradient-to-l from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent  px-4 text-start sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {intro.description}
            </motion.p>
          </>
        ))}
      </div>
    </div>
    
  );
};


