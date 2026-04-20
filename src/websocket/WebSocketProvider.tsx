import { useEffect, useState } from 'react';
import { WebsocketContext } from './WebSocketContext';

type Props = {
  children: React.ReactNode;
};

export const WebsocketProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fetchedFirstMessage, setFetchedFirstMessage] = useState<boolean>(false);

  const [websocketUrl, setWebsocketUrl] = useState<string | null | undefined>(null);

  const [message, setMessage] = useState<unknown>(null);

  useEffect(() => {
    if (!websocketUrl) return;

    // console.log('request open', websocketUrl);
    const socket = new WebSocket(websocketUrl);

    let hasClosed = false;
    socket.onopen = () => {
      // console.log('has opened', websocketUrl);
      setIsConnected(true);
      setFetchedFirstMessage(false);
      setHasError(false);
      setMessage(null);
    };

    socket.onmessage = event => {
      // extra check  ignore messages on streams that we have just triggered close on
      if (hasClosed) return;
      // console.log('has message', websocketUrl);
      let message;
      try {
        message = JSON.parse(event.data);
      } catch {
        // json parsing error
        setHasError(true);
      }

      setFetchedFirstMessage(true);
      setMessage(message ?? null);
    };

    socket.onerror = () => {
      // ignore errors on streams that we have just triggered close on
      if (hasClosed) return;
      // console.log('has error', websocketUrl, e);
      setHasError(true);
      setIsConnected(false);
      setFetchedFirstMessage(false);
    };

    socket.onclose = () => {
      // console.log('has closed', websocketUrl);
    };

    return () => {
      // console.log('request close', websocketUrl);
      hasClosed = true;
      setIsConnected(false);
      setFetchedFirstMessage(false);
      socket.close();
    };
  }, [websocketUrl]);

  return (
    <WebsocketContext.Provider value={{ isConnected, fetchedFirstMessage, hasError, message, setWebsocketUrl }}>
      {children}
    </WebsocketContext.Provider>
  );
};
