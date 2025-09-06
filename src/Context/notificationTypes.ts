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