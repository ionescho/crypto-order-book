import type { OrderBookConfig } from './types';

export const CONFIG_DECIMALS_OPTIONS = [0.01, 0.1, 1, 10];

export const INITIAL_CONFIG: OrderBookConfig = {
  displaySumAvg: true,
  showBuySellRatio: true,
  rounding: true,
  depthVisualization: 'amount',
  animations: false,
  decimals: 0.01,
  layout: 'both',
};
