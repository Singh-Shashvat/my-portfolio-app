import type { ReactNode } from "react";

export interface IItems {
  name: string;
  icon: ReactNode;
}

export interface ITechCategory {
  title: string;
  items: IItems[];
}
