import { useEffect, useState } from 'react';
import { WebsocketContext } from './WebSocketContext';

type Props = {
  children: React.ReactNode;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [fetchedFirstMessage, setFetchedFirstMessage] = useState<boolean>(false);

  const [websocketUrl, setWebsocketUrl] = useState<string | null | undefined>(null);

  const [message, setMessage] = useState<unknown>(null);

  useEffect(() => {
    if (!websocketUrl) return;

    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
      setIsConnected(true);
      setFetchedFirstMessage(false);
    };

    socket.onmessage = event => {
      const message = JSON.parse(event.data);

      setFetchedFirstMessage(true);
      setMessage(message);
    };

    socket.onclose = () => {
      //has closed
    };

    return () => {
      setIsConnected(false);
      setFetchedFirstMessage(false);
      socket.close();
    };
  }, [websocketUrl]);

  return (
    <WebsocketContext.Provider value={{ isConnected, fetchedFirstMessage, message, setWebsocketUrl }}>{children}</WebsocketContext.Provider>
  );
};
