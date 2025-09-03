import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export interface IAchievement {
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface IExperienceTech{
  technologies : string;
}

export interface IExperienceType {
  role: string;
  description: string;
  technologies: string[];
  duration: string;
}

export interface IProject {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}

export interface IItems {
    name: string;
    icon: JSX.Element;
  };

export interface ITechCategory {
  title: string;
  items: IItems[];
}

export interface IIntroduction {
  salutation: string;
  position: string;
  description: string;
}


export interface INoteficationContext{
  id: number;
  name: string;
  message: string;
}

export interface INoteficationType{
  name: string;
  message: string;
}

export interface INotefication{
  notification: INoteficationContext[] | undefined;
  addNotefication: (notification: INoteficationType) => void;
}

export interface FormData{
  email: string;
  name: string;
  message: string;
}

