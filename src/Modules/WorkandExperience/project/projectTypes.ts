import type { ReactNode } from "react";

export interface IProject {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  tech?: string[];
}

export interface IMiniProject {
  title: string;
  description: string;
  icon: ReactNode;
  tech?: string[];
}
