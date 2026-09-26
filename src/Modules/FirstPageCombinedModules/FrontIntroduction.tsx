import { IndexPage } from "../details/introduction/Index";
import { Achievements } from "../details/achievement/Achievements";
import { Experience } from "../WorkandExperience/experience/Experience";

import { Technologies } from "@/Modules/details/technologiesKnow/Technologies";

export const FrontIntroduction = () => {
  return (
    <>
      <IndexPage />
      <Technologies />
      <Achievements />
      <Experience />
    </>
  );
};
