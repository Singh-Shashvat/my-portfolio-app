import { NotificationContext } from "@/testingnewcodes/test";
import { INotefication, INoteficationContext } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

export const NoteficationContext = createContext<INotefication | null> (null);

export const NoteficationProvider = ({children}:{children:ReactNode}) => {
    const [notification, setNotification] = useState<INoteficationContext[] | undefined>([])


    const addNotefication = (notification: Omit<INoteficationContext, "id">) => {
        setNotification((prev) => [(...prev ?? []) , {id:Date.now(), ...notification},])
  };
  

  return( 
    <NoteficationContext.Provider value={{ notification , addNotefication}}>
      {children}
    </NoteficationContext.Provider>

    
  )

}

export const useNotificationContext = () =>{
  const context = useContext(NotificationContext);
  if(!context){
    throw new Error("useNotificationContext error ")
  }
  return context;
}

// todo
// change the omoit with two interfaces
// change prev with new notefication variable