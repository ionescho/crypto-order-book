export type OrderBookLayout = 'both' | 'asks' | 'bids';

export type OrderBookConfig = {
  displaySumAvg: boolean;
  showBuySellRatio: boolean;
  rounding: boolean;
  depthVisualization: 'amount' | 'cumulative';
  animations: boolean;
  decimals: number;
  layout: OrderBookLayout;
};
