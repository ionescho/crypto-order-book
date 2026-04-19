import type { Exchange, OrderBookConfig } from './types';

export const CONFIG_DECIMALS_OPTIONS = [0.01, 0.1, 1, 10];

export const CONFIG_EXCHANGE_OPTIONS: Exchange[] = ['btcusdt', 'ethusdt', 'bnbusdt'];

export const EXCHANGE_LABELS: Record<Exchange, string> = {
  btcusdt: 'BTC/USDT',
  ethusdt: 'ETH/USDT',
  bnbusdt: 'BNB/USDT',
};

export const INITIAL_CONFIG: OrderBookConfig = {
  displaySumAvg: true,
  showBuySellRatio: true,
  rounding: true,
  depthVisualization: 'amount',
  animations: true,
  decimals: 0.01,
  layout: 'both',
  exchange: 'btcusdt',
};
