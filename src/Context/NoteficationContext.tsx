import { INotefication, INoteficationContext, INoteficationType } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const NoteficationContext = createContext<INotefication | null> (null);

export const NoteficationProvider = ({children}:{children:ReactNode}) => {
    const [notification, setNotification] = useState<INoteficationContext[] | undefined>([])


    const addNotefication = (notification: INoteficationType) => {
        setNotification((CurrentNotification) => [...(CurrentNotification ?? []) , {id:Date.now(), ...notification},])
  };
  

  return( 
    <NoteficationContext.Provider value={{ notification , addNotefication}}>
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

