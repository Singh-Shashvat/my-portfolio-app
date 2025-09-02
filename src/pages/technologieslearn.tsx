import { motion } from "framer-motion";
import { ITechCategory } from "@/types";



export const Technologieslearn = ({title , items} : ITechCategory) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
          
            <motion.div
             
              className="p-6 rounded-xl shadow-md bg-gray-900/50 backdrop-blur-sm "
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay:  1 }}
            >
              <p className="font-bold text-lg mb-4">{title}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <motion.li
                    key={item.name}
                    className="flex items-center gap-3 list-none cursor-pointer "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="bg-gradient-to-l from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent">
                      {item.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
        
        </div>
  )
}

