import type { Exchange, OrderBookConfig } from './types';

export const CONFIG_DECIMALS_OPTIONS = [0.01, 0.1, 1, 10];

export const CONFIG_EXCHANGE_OPTIONS: Exchange[] = ['btcusdt', 'ethusdt', 'bnbusdt' /*'dogeusdt'*/];

export const EXCHANGE_LABELS: Record<Exchange, string> = {
  btcusdt: 'BTC/USDT',
  ethusdt: 'ETH/USDT',
  bnbusdt: 'BNB/USDT',
  dogeusdt: 'DOGE/USDT',
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

export const DUMMY_ORDER_BOOK_DATA = {
  asks: [
    {
      price: '74152.99',
      quantity: '2.12252',
      total: '157.39K',
      percentage: 100,
    },
    {
      price: '74153.00',
      quantity: '0.00056',
      total: '41.525680',
      percentage: 0.026383732544334088,
    },
    {
      price: '74153.02',
      quantity: '0.00209',
      total: '154.979812',
      percentage: 0.09846785896010402,
    },
    {
      price: '74153.20',
      quantity: '0.00007',
      total: '5.190724',
      percentage: 0.003297966568041761,
    },
    {
      price: '74154.00',
      quantity: '0.00280',
      total: '207.631200',
      percentage: 0.13191866272167047,
    },
    {
      price: '74154.08',
      quantity: '0.00008',
      total: '5.932326',
      percentage: 0.0037691046491905847,
    },
    {
      price: '74154.23',
      quantity: '0.00007',
      total: '5.190796',
      percentage: 0.003297966568041761,
    },
    {
      price: '74154.58',
      quantity: '0.00142',
      total: '105.299504',
      percentage: 0.06690160752313289,
    },
    {
      price: '74154.99',
      quantity: '0.00300',
      total: '222.464970',
      percentage: 0.14134142434464692,
    },
    {
      price: '74155.06',
      quantity: '0.00008',
      total: '5.932405',
      percentage: 0.0037691046491905847,
    },
    {
      price: '74155.13',
      quantity: '0.01580',
      total: '1.17K',
      percentage: 0.7443981682151405,
    },
    {
      price: '74155.27',
      quantity: '0.00016',
      total: '11.864843',
      percentage: 0.007538209298381169,
    },
    {
      price: '74155.28',
      quantity: '0.04014',
      total: '2.98K',
      percentage: 1.891148257731376,
    },
    {
      price: '74155.56',
      quantity: '0.07968',
      total: '5.91K',
      percentage: 3.754028230593822,
    },
    {
      price: '74155.57',
      quantity: '0.00007',
      total: '5.190890',
      percentage: 0.003297966568041761,
    },
    {
      price: '74155.64',
      quantity: '0.00016',
      total: '11.864902',
      percentage: 0.007538209298381169,
    },
    {
      price: '74155.66',
      quantity: '0.00030',
      total: '22.246698',
      percentage: 0.014134142434464689,
    },
    {
      price: '74155.67',
      quantity: '0.00014',
      total: '10.381794',
      percentage: 0.006595933136083522,
    },
    {
      price: '74155.68',
      quantity: '0.00022',
      total: '16.314250',
      percentage: 0.010365037785274108,
    },
    {
      price: '74155.69',
      quantity: '0.06101',
      total: '4.52K',
      percentage: 2.8744134330889697,
    },
  ],
  bids: [
    {
      price: '74146.10',
      quantity: '0.00112',
      total: '83.043632',
      percentage: 0.052767465088668176,
    },
    {
      price: '74146.21',
      quantity: '0.00007',
      total: '5.190235',
      percentage: 0.003297966568041761,
    },
    {
      price: '74146.22',
      quantity: '0.00458',
      total: '339.589688',
      percentage: 0.21578124116616096,
    },
    {
      price: '74146.23',
      quantity: '0.00014',
      total: '10.380472',
      percentage: 0.006595933136083522,
    },
    {
      price: '74146.72',
      quantity: '0.00431',
      total: '319.572363',
      percentage: 0.20306051297514272,
    },
    {
      price: '74147.74',
      quantity: '0.00007',
      total: '5.190342',
      percentage: 0.003297966568041761,
    },
    {
      price: '74148.28',
      quantity: '0.00028',
      total: '20.761518',
      percentage: 0.013191866272167044,
    },
    {
      price: '74149.40',
      quantity: '0.00007',
      total: '5.190458',
      percentage: 0.003297966568041761,
    },
    {
      price: '74150.80',
      quantity: '0.00007',
      total: '5.190556',
      percentage: 0.003297966568041761,
    },
    {
      price: '74151.03',
      quantity: '0.00007',
      total: '5.190572',
      percentage: 0.003297966568041761,
    },
    {
      price: '74151.28',
      quantity: '0.00007',
      total: '5.190590',
      percentage: 0.003297966568041761,
    },
    {
      price: '74151.46',
      quantity: '0.00007',
      total: '5.190602',
      percentage: 0.003297966568041761,
    },
    {
      price: '74151.80',
      quantity: '0.00007',
      total: '5.190626',
      percentage: 0.003297966568041761,
    },
    {
      price: '74151.81',
      quantity: '0.00014',
      total: '10.381253',
      percentage: 0.006595933136083522,
    },
    {
      price: '74151.99',
      quantity: '0.00021',
      total: '15.571918',
      percentage: 0.009893899704125284,
    },
    {
      price: '74152.02',
      quantity: '0.00007',
      total: '5.190641',
      percentage: 0.003297966568041761,
    },
    {
      price: '74152.48',
      quantity: '0.06087',
      total: '4.51K',
      percentage: 2.867817499952886,
    },
    {
      price: '74152.49',
      quantity: '0.00016',
      total: '11.864398',
      percentage: 0.007538209298381169,
    },
    {
      price: '74152.97',
      quantity: '0.00014',
      total: '10.381416',
      percentage: 0.006595933136083522,
    },
    {
      price: '74152.98',
      quantity: '2.10048',
      total: '155.76K',
      percentage: 98.96161166914798,
    },
  ],
  asksTotal: 2.3303700000000016,
  bidsTotal: 2.17306,
};
