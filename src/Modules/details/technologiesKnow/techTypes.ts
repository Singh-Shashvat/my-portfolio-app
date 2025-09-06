export interface ITechCategory {
  title: string;
  items: IItems[];
}

export interface IItems {
    name: string;
    icon: JSX.Element;
  };