import { footerdata } from "@/Constant/Constant"


export const Footer = () => {
  return (
    <div>
        {footerdata.map((foot ) => (
            <>
            <div className="w-full flex items-center justify-center  h-20 gap-20 bg-gradient-to-l from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">
                <div key={foot.type}> {foot.value}</div>
                
            </div>
            </>
        ))}
    </div>
  )
}

