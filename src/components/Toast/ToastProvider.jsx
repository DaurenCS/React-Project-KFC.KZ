import React, { useCallback, useState } from "react";
import {ToastList} from "./Toast.jsx"

const ToastContext = React.createContext(null);


const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const autoClose = true;
    const autoCloseDuration = 5;
    const position = "top-right";
    const maxToastsCount = 2;

    const showToast = useCallback((message, type) => {
        const toast = {
          id: Date.now(),
          message,
          type,
        };
    
        setToasts((prevToasts) => [...prevToasts.slice(-1), toast]);
    
        if (autoClose) {
          setTimeout(() => {
            removeToast(toast.id);
          }, autoCloseDuration * 1000);
        }
      }, []);
    
      const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
      }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastList data={toasts} position={position} removeToast={removeToast} />
            {children}
        </ToastContext.Provider>
    );
}

export {ToastContext};
export default ToastProvider;