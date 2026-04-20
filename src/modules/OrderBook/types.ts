export type OrderBookLayout = 'both' | 'asks' | 'bids';

export type Exchange = 'btcusdt' | 'ethusdt' | 'bnbusdt' | 'dogeusdt';

export type OrderBookConfig = {
  displaySumAvg: boolean;
  showBuySellRatio: boolean;
  rounding: boolean;
  depthVisualization: 'amount' | 'cumulative';
  animations: boolean;
  decimals: number;
  layout: OrderBookLayout;
  exchange: Exchange;
};

export type OrderTuple = [string, string];
export type OrderBookResponse = {
  asks: OrderTuple[]; // Array of [price, quantity] tuples
  bids: OrderTuple[]; // Array of [price, quantity] tuples
  lastUpdateId: number;
};

export type ParsedGroupedOrder = {
  price: string;
  quantity: string;
  total: string;
  sumCurrency: number;
  sumCrypto: number;
  percentage: number;
};
