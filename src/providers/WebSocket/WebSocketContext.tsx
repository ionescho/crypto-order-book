import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export const WebsocketContext = createContext<[boolean, Record<string, number | string | string[][]>, Dispatch<SetStateAction<string>>]>([false, {}, () => {}]);

export const useWebsocket = () => {
    const context = useContext(WebsocketContext);
    if (!context) {
        throw new Error("useWebsocket must be used within a WebsocketProvider");
    }
    return context;
};
