import { INotefication, INoteficationContext, INoteficationType } from "@/context/notificationcontext/notificationTypes";
import { createContext, ReactNode, useContext, useState } from "react";

export const NoteficationContext = createContext<INotefication | null> (null);

export const NoteficationProvider = ({children}:{children:ReactNode}) => {
    const [notification, setNotification] = useState<INoteficationContext[] | undefined>([])
    const [username, setUsername] = useState("");

    const addNotefication = (notification: INoteficationType) => {
        setNotification((CurrentNotification) => [...(CurrentNotification ?? []) , {id:Date.now(), ...notification , read: false},])
  };

  const markAsRead = (id: number) => {
    setNotification((current) =>
      (current ?? []).map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  

  return( 
    <NoteficationContext.Provider value={{ notification , addNotefication, markAsRead, username, setUsername}}>
      {children}
    </NoteficationContext.Provider>

    
  )

}

export const useNotificationContext = () =>{
  const context = useContext(NoteficationContext);
  if(!context){
    throw new Error("useNotificationContext must be used within a NoteficationProvider")
  }
  return context;
}

