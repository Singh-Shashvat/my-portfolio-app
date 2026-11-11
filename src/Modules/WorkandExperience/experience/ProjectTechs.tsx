import type { IExperienceTech } from "@/Modules/WorkandExperience/experience/experienceTypes";

export const ProjectTechs = ({ technologies }: IExperienceTech) => {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium bg-neutral-800/80 border border-neutral-700/60 text-cyan-400 rounded-full">
      {technologies}
    </span>
  );
};
