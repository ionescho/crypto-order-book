import './App.css';
import { WebsocketProvider } from '../websocket/WebSocketProvider';
import { OrderBook } from '../modules/OrderBook/OrderBook';

function App() {
  return (
    <WebsocketProvider>
      <OrderBook />
    </WebsocketProvider>
  );
}

export default App;
