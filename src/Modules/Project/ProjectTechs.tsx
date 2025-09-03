import { IExperienceTech } from "@/types"


export const ProjectTechs = ({technologies}:IExperienceTech) => {
  return (
    <div>
        <span  className="px-3 py-1 text-sm bg-blue-600 rounded-full">
                    {technologies}
        </span>
    </div>
  )
}

