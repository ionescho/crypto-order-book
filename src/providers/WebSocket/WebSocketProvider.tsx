import { useEffect, useState } from "react";
import { WebsocketContext } from "./WebSocketContext";

const WS_BASE_URL = "wss://stream.binance.com:9443/ws/";

export const WebsocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [orderBook, setOrderBook] = useState<Record<string, number | string | string[][]>>({});

    const [exchange, setExchange] = useState<string>("btcusdt");

    useEffect(() => {
        const socket = new WebSocket(`${WS_BASE_URL}${exchange}@depth20`);

        socket.onopen = () => {
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const payload = JSON.parse(event.data);
            setOrderBook(payload.data);
        };

        socket.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, [exchange]);

    return (
        <WebsocketContext.Provider value={[isConnected, orderBook, setExchange]}>
            {children}
        </WebsocketContext.Provider>
    );
};
