import { footerdata } from "@/Constant/Constant"


export const Footer = () => {
  return (
    <div className="bg-black flex gap-0  justify-center items-center flex-col sm:flex-row sm:gap-20 md:flex-row lg:flex-row xl:flex-row">
        {footerdata.map((foot ) => (
            <>
            
                <div className="  flex items-center h-6 sm:h-10  bg-gradient-to-l from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent "
                  key={foot.type}> 
                    {foot.value}
                </div>
                
            
            </>
        ))}
    </div>
  )
}

