// // import { DefaultLayout } from "@/layouts/layout";
// import profilepic2 from "@/assets/ChatGPT Image Aug 24, 2025, 03_42_53 PM.png";
// import { motion } from "framer-motion";
// // import {Introductiondata} from "@/Constant/Constant"
// import { IIntroduction } from "@/types";

// export const IndexPage = ({salutation , position , description} : IIntroduction) => {
//   return (
 
//       <div className="flex flex-row-reverse min-h-screen">
        
        
//         <div className="w-1/2 flex justify-center items-center pr-3">
//           <motion.img
//             src={profilepic2}
//             alt="profilepic"
//             className="w-3/4 h-auto rounded-lg shadow-lg"
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1 }}
//           />
//         </div>

        
//         <div className="w-1/2 flex flex-col justify-center items-center gap-4">
       
//           <>
//             <motion.h1
              
//               className="text-6xl pl-8 pt-0 bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.2 }}
//               >
//               {salutation} 
//             </motion.h1>

//             <motion.h2
              
//               className="text-4xl pr-2 bg-gradient-to-l from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent"
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.4 }}
//             >
//               {position}
//             </motion.h2>

//             <motion.p
             
//               className="text-3xl bg-gradient-to-l from-[#00F5A0] to-[#00D9F5] bg-clip-text text-transparent  px-4 text-start "
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 1, delay: 0.6 }}
//             >
//               {description}
//             </motion.p>
//           </>
        
//       </div>
//     </div>
    
//   );
// };

//  this is the breaking point



// import { DefaultLayout } from "@/layouts/layout";
import profilepic2 from "@/assets/ChatGPT Image Aug 24, 2025, 03_42_53 PM.png";
import { motion } from "framer-motion";
import {Introductiondata} from "@/Constant/Constant"
// import { IIntroduction } from "@/types";

export const IndexPage = () => {
  return (
 
      <div className="flex flex-row-reverse min-h-screen">
        
        
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
       
          {Introductiondata.map((intro , index) =>(
          < >

              <motion.h1
              key={index}
              className="text-6xl pl-8 pt-0 bg-gradient-to-l from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index *0.2 }}
              >
              {intro.salutation} 
            </motion.h1>

            
          </>
            ))}
        
      </div>
    </div>
    
  );
};


