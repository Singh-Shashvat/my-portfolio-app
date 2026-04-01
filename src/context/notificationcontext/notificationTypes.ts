export interface INoteficationContext{
  id: number;
  name: string;
  message: string;
  read: boolean;
}

export interface INoteficationType{
  name: string;
  message: string;
}

export interface INotefication{
  notification: INoteficationContext[] | undefined;
  addNotefication: (notification: INoteficationType) => void;
  markAsRead: (id: number) => void;
  username: string;
  setUsername:React.Dispatch<React.SetStateAction<string>>
}