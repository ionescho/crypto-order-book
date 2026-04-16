import type { FC } from "react";
import { useWebsocket } from "../providers/WebSocket/WebSocketContext";


export const OrderBook: FC = () => {
  const [isConnected, orderBook] = useWebsocket();

  return (
    <div>
      <h2>Order Book</h2>
      {isConnected ? (
        orderBook ? (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, maxHeight: "400px", overflowY: "auto" }}>
                    {(orderBook?.a as string[][])?.reverse().map(([price, qty]) => (
                        <div key={price}>
                            <p>{price}: {qty}</p>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, maxHeight: "400px", overflowY: "auto" }}>
                    {(orderBook?.b as string[][])?.map(([price, qty]) => (
                        <div key={price}>
                            <p>{price}: {qty}</p>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
};
