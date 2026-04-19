import { useMemo } from 'react';
import type { OrderBookConfig, OrderBookResponse, OrderTuple } from './types';

const groupOrdersByPrecision = (tuples: OrderTuple[], precision: OrderBookConfig['decimals']) => {
  const groupedOrders: Record<string, number> = tuples.reduce(
    (acc, [price, qty]) => {
      const priceIndex = String(Math.floor(Number(price) / precision + Number.EPSILON * 10000000)); // js floating point error can cause groups to collapse into one another so we need this correction (ex: 74674.01000000 / 0.01 === 7467400.999999999 even though normally it should be 7467401)

      if (acc[priceIndex] === undefined) {
        acc[priceIndex] = 0;
      }
      acc[priceIndex] += Number(qty);

      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.keys(groupedOrders).map(priceIndex => {
    return {
      price: Number(priceIndex) * precision,
      quantity: groupedOrders[priceIndex],
    };
  });
};

const parseSection: (
  section: { price: number; quantity: number }[],
  percentages: number[],
  config: Partial<OrderBookConfig>,
) => { price: string; quantity: string; total: string; percentage: number }[] = (section, percentages, config) =>
  section.map(({ price, quantity }, i) => {
    const total = price * quantity;

    let formattedTotal: string;
    if (config.rounding && total > 1000000) {
      formattedTotal = `${((price * quantity) / 1000000).toFixed(2)}M`;
    } else if (config.rounding && total > 1000) {
      formattedTotal = `${((price * quantity) / 1000).toFixed(2)}K`;
    } else {
      formattedTotal = (price * quantity).toFixed(6);
    }

    return {
      price: price.toFixed(2),
      quantity: quantity.toFixed(5),
      total: formattedTotal,
      percentage: percentages[i],
    };
  });

const parseOrderBook = (orderBook: OrderBookResponse, config: Partial<OrderBookConfig>) => {
  const groupedAsks = groupOrdersByPrecision(orderBook.asks, config.decimals as number);
  const groupedBids = groupOrdersByPrecision(orderBook.bids, config.decimals as number);

  const asksQuantities = groupedAsks.map(({ quantity }) => quantity);
  const bidsQuantities = groupedBids.map(({ quantity }) => quantity);

  const asksTotal = asksQuantities.reduce((acc, q) => acc + q, 0);
  const bidsTotal = bidsQuantities.reduce((acc, q) => acc + q, 0);

  const maxTotal = Math.max(...asksQuantities, ...bidsQuantities);

  let asksBarPercentages: number[];
  let bidsBarPercentages: number[];

  if (config.depthVisualization === 'amount') {
    asksBarPercentages = asksQuantities.map(qty => (qty / maxTotal) * 100);
    bidsBarPercentages = bidsQuantities.map(qty => (qty / maxTotal) * 100);
  } else {
    const maxRunningTotal = Math.max(asksTotal, bidsTotal);
    let sum = 0;
    asksBarPercentages = asksQuantities.map(qty => {
      sum += qty;
      return (sum / maxRunningTotal) * 100;
    });
    sum = 0;
    bidsBarPercentages = bidsQuantities.map(qty => {
      sum += qty;
      return (sum / maxRunningTotal) * 100;
    });
  }

  const asks = parseSection(groupedAsks, asksBarPercentages, config);
  const bids = parseSection(groupedBids, bidsBarPercentages, config);

  return {
    asks,
    bids,
    asksTotal,
    bidsTotal,
    asksBarPercentages,
    bidsBarPercentages,
  };
};

export const useOrderBookParser = (orderBook: OrderBookResponse, dataConfig: Partial<OrderBookConfig>) => {
  const parsedOrderBook = useMemo(() => {
    return orderBook ? parseOrderBook(orderBook as OrderBookResponse, dataConfig) : null;
  }, [orderBook, dataConfig]);

  return parsedOrderBook;
};
