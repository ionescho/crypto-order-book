import './App.css'
import { WebsocketProvider } from '../providers/WebSocket/WebSocketProvider'
import { OrderBook } from '../modules/OrderBook/OrderBook'

function App() {

  return (
    <WebsocketProvider>
      <OrderBook />
    </WebsocketProvider>
  )
}

export default App
