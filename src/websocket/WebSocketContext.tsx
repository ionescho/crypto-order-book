import { createContext, useContext, useEffect, type Dispatch, type SetStateAction } from 'react';

export const WebsocketContext = createContext<{
  isConnected: boolean;
  fetchedFirstMessage: boolean;
  hasError: boolean;
  message: unknown | null;
  setWebsocketUrl: Dispatch<SetStateAction<string | null | undefined>>;
}>({
  isConnected: false,
  fetchedFirstMessage: false,
  hasError: false,
  message: null,
  setWebsocketUrl: () => {},
});

export const useWebsocket = (websocketUrl?: string) => {
  const context = useContext(WebsocketContext);

  const { setWebsocketUrl, ...wsProps } = context;

  useEffect(() => {
    setWebsocketUrl(websocketUrl);
  }, [websocketUrl, setWebsocketUrl]);

  return wsProps;
};
