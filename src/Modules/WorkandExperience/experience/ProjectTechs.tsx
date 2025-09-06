import { IExperienceTech } from "@/Modules/WorkandExperience/experience/experienceTypes"


export const ProjectTechs = ({technologies}:IExperienceTech) => {
  return (
    <div>
        <span  className="px-3 py-1 text-sm bg-blue-600 rounded-full">
                    {technologies}
        </span>
    </div>
  )
}

