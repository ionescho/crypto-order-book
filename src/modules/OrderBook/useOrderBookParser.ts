import { useMemo } from 'react';
import type { OrderBookConfig, OrderBookResponse, OrderTuple, ParsedGroupedOrder } from './types';
import { formatNumber } from '../../utils/utils';

type GroupedOrders = {
  price: string;
  quantity: number;
  total: number;
  sumCrypto: number;
  sumCurrency: number;
};

// simply dividing by precision, then floor/ceil and then multiplying again by precision for obtaining the group index can lead to floating point errors  (ex: 74674.01 / 0.01 === 7467400.999999999 even though normally it should be 7467401), trying to solve it by using Number.EPSILON is not bullet proof so we do it manually for subunit precisions by using string operations
const getGroupPriceIndex = (price: string, precision: number, isAsk: boolean) => {
  if (precision >= 1) {
    return String(Math[isAsk ? 'ceil' : 'floor'](Number(price) / precision) * precision);
  }

  const decimalsNr = (precision.toString().split('.')[1] || '').length;
  const [priceIntegerPart, priceDecimals = ''] = price.split('.');

  let paddedDecimals = priceDecimals;
  if (priceDecimals.length < decimalsNr) {
    paddedDecimals += '0'.repeat(decimalsNr - priceDecimals.length);
  }

  const decimalsToRepresent = paddedDecimals.substring(0, decimalsNr);
  if (!isAsk) {
    return priceIntegerPart + '.' + decimalsToRepresent;
  }

  const restDecimals = paddedDecimals.substring(decimalsNr);

  const ceilingPriceInteger = String(Math.ceil(Number(priceIntegerPart + decimalsToRepresent + '.' + restDecimals)));

  return ceilingPriceInteger.slice(0, -decimalsNr) + '.' + ceilingPriceInteger.slice(-decimalsNr);
};

const groupOrdersByPrecision = (
  tuples: OrderTuple[],
  precision: OrderBookConfig['decimals'],
  isAsk: boolean = false,
): { maxTotal: number; groupedOrders: GroupedOrders[] } => {
  let sumCrypto = 0;
  let sumCurrency = 0;
  let maxTotal = 0;

  const groupedOrders: Record<string, GroupedOrders> = tuples.reduce(
    (acc, [price, qty]) => {
      const priceNr = Number(price);
      const quantityNr = Number(qty);
      const priceIndex = getGroupPriceIndex(price, precision, isAsk);

      if (acc[priceIndex] === undefined) {
        acc[priceIndex] = { price: priceIndex, quantity: 0, total: 0, sumCrypto, sumCurrency };
      }
      acc[priceIndex].quantity += quantityNr;

      sumCrypto += quantityNr;
      acc[priceIndex].sumCrypto = sumCrypto;

      const tupleTotal = priceNr * quantityNr;
      acc[priceIndex].total += tupleTotal;
      sumCurrency += tupleTotal;
      acc[priceIndex].sumCurrency = sumCurrency;

      if (acc[priceIndex].total > maxTotal) maxTotal = acc[priceIndex].total;

      return acc;
    },
    {} as Record<string, GroupedOrders>,
  );

  return {
    maxTotal,
    groupedOrders: Object.values(groupedOrders),
  };
};

const parseGroupedOrders: (
  groupedOrders: GroupedOrders[],
  maxTotal: number,
  maxRunningTotal: number,
  config: Partial<OrderBookConfig>,
) => ParsedGroupedOrder[] = (groupedOrders, maxTotal, maxRunningTotal, config) =>
  groupedOrders.map(({ price, quantity, sumCurrency, sumCrypto }) => {
    const total = Number(price) * quantity;

    let percentage = 0;
    if (config.depthVisualization === 'amount') {
      percentage = (total / maxTotal) * 100;
    } else {
      percentage = (sumCurrency / maxRunningTotal) * 100;
    }
    let formattedTotal = total.toFixed(6);
    let formattedQuantity = quantity.toFixed(5);
    if (config.rounding) {
      if (total > 1000000) {
        formattedTotal = `${(total / 1000000).toFixed(2)}M`;
      } else if (total > 1000) {
        formattedTotal = `${(total / 1000).toFixed(2)}K`;
      }
      if (quantity > 1000000) {
        formattedQuantity = `${(quantity / 1000000).toFixed(2)}M`;
      } else if (quantity > 1000) {
        formattedQuantity = `${(quantity / 1000).toFixed(2)}K`;
      }
    }

    return {
      price: formatNumber(Number(price)),
      quantity: formattedQuantity,
      total: formattedTotal,
      sumCurrency,
      sumCrypto,
      percentage,
    };
  });

const parseOrderBook = (orderBook: OrderBookResponse, config: Partial<OrderBookConfig>) => {
  const { groupedOrders: groupedAsks, maxTotal: maxTotalAsks } = groupOrdersByPrecision(orderBook.asks, config.decimals as number, true);
  const { groupedOrders: groupedBids, maxTotal: maxTotalBids } = groupOrdersByPrecision(orderBook.bids, config.decimals as number);

  const maxTotal = Math.max(maxTotalAsks, maxTotalBids);
  const maxRunningTotalAsks = groupedAsks[groupedAsks.length - 1]?.sumCurrency || 0;
  const maxRunningTotalBids = groupedBids[groupedBids.length - 1]?.sumCurrency || 0;
  const maxRunningTotal = Math.max(maxRunningTotalAsks, maxRunningTotalBids);

  const asks = parseGroupedOrders(groupedAsks, maxTotal, maxRunningTotal, config);
  const bids = parseGroupedOrders(groupedBids, maxTotal, maxRunningTotal, config);

  return {
    //for order book rows
    asks,
    bids,
    //for order book ratio
    asksTotal: maxRunningTotalAsks,
    bidsTotal: maxRunningTotalBids,
  };
};

export const useOrderBookParser = (orderBook: OrderBookResponse, dataConfig: Partial<OrderBookConfig>) => {
  const parsedOrderBook = useMemo(() => {
    return orderBook
      ? parseOrderBook(orderBook as OrderBookResponse, {
          decimals: dataConfig.decimals,
          depthVisualization: dataConfig.depthVisualization,
          rounding: dataConfig.rounding,
        })
      : null;
  }, [orderBook, dataConfig.decimals, dataConfig.depthVisualization, dataConfig.rounding]);

  return parsedOrderBook;
};
