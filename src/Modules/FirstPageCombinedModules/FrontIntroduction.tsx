import {IndexPage} from "../details/introduction/Index";
import { Technologies } from "@/Modules/details/technologiesKnow/Technologies";
import { Achievements } from "../details/achievement/Achievements";
import {Experience} from "../WorkandExperience/experience/Experience";

export const FrontIntroduction = () => {
  return (
    <>
        <IndexPage />
        <Technologies />
        <Achievements />
        <Experience />
    
    </>
  )
}

