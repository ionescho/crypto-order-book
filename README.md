# Crypto Order Book

A real-time order book implementation inspired by Binance, built with
React and WebSockets, with a focus on performance, correctness,
and clean architecture.

---

## 🔗 Live Demo

[Crypto Order Book](https://crypto-order-book-horia.netlify.app/)

---

## Overview

This project implements a live crypto order book that emulates
the behavior and appearance of Binance's order book, including real-time
updates, price grouping, and depth visualization.

The application consumes Binance's public WebSocket streams and renders
1000ms updates while maintaining a responsive UI.

---

## ✨ Features

- Real-time order book using Binance's partial book depth stream (wss://stream.binance.com:9443/ws/${symbol}@depth${levels}${speedSuffix})
- Market switching (BTC / USDT, ETH / USDT, BNB / USDT)
- Price grouping & decimal precision control
- Depth visualization:
  - Amount depth
  - Cumulative depth
- Buy / Sell ratio indicator (toggle-able)
- Row highlighting and update animations (toggle-able)
- Custom UI controls (checkbox, radio, toggle, popover)

---

## Tech Stack

- React (19.2.x)
- TypeScript
- Vite (8.x)
- Native WebSocket API
- CSS Modules
- lucide-react (icons)

---

## 🧰 Requirements

- Node.js >= 18 (Node 20 recommended)
- npm >= 9

Tested on Node.js 20.x and npm 11.x

---

## 📦 Installation

```bash
npm install
npm run dev
```

The app will run on:

    http://localhost:5173

---

## Assumptions and Limitations

- Precision values are powers of 10
- Order book depth is limited to a maximum of 20 visible rows
- The application so far supports price groupings of maximum 2 decimal points
- No dynamic precision implemented yet ( ex DogeCoin would also have to support 3, 4 and 5 decimal points )
- When grouping with a precision of less that 2 decimals, less than 20 rows will be visible and it will not fill up the available space. This is due to the fact that stream we subscribe to supports a maximum depth level of 20. Binance uses a diff depth stream + snapshot url to maintain large lists even with less precision

---

## Key Engineering Decisions

### 1. WebSocket Lifecycle Management

- Subscriptions are opened and closed when switching markets
- Prevents duplicate streams and memory leaks

---

### 2. Performance Optimization

The order book updates multiple times per second, so performance was a
key concern:

- Components are memoized where appropriate (Individual rows indexed by price + the header containing the controls)
- UI controls are kept outside frequently updating components
- State updates are scoped to avoid unnecessary re-renders
- Expensive computations (grouping, depth calculations) are localized

---

### 3. Precision Handling (Floating Point Issues)

JavaScript floating point arithmetic introduced inconsistencies when
grouping prices:

```js
74674.01 / 0.01 !== 7467401;
```

To ensure stable and deterministic grouping:

- Implemented a fixed-point approach using string manipulation (in the useOrderBookParser.tsx)
- Avoided floating point operations for decimal precisions
- Applied integer-like logic for grouping calculations

This enables correct grouping even for small precisions (e.g. 0.01,
0.001).

---

### 4. Price Grouping Logic

- Supports both floor (bids) and ceil (asks) grouping strategies
- Handles powers of 10
- Ensures no collapsing or misalignment of price levels

---

### 5. Depth Visualization

- Depth bars are normalized relative to visible rows
- Supports:
  - raw amount
  - cumulative totals
- Implemented using lightweight DOM updates to maintain performance

---

### 6. UI Architecture

- Built custom UI toolkit components instead of using a UI framework (ex: Material UI)
- Reasoning:
  - small, well-defined scope
  - need for precise visual control
  - reduced bundle size and overhead (Material UI has many features and I only needed a few items for this project)

Components implemented:

- Toggle
- Checkbox
- Radio
- Popover menu

---

### 7. State & Data Flow

- UI controls emit configuration changes (uncontrolled inputs)
- Order book reacts to configuration updates
- Data flow is unidirectional and predictable

---

## 🔍 Possible Improvements

- Virtualized rendering for larger datasets
- Support for a larger range of precision grouping
- Support for diff depth streams.
- More advanced animation system
- Improved accessibility (ARIA roles, keyboard navigation)
- Better handling of edge-case WebSocket reconnections

---

## 💡 Notes

This project prioritizes:

- correctness of data representation
- performance under frequent updates
- clean and maintainable architecture

---

## 🏁 Conclusion

The goal of this project was not only to replicate a UI, but to handle:

- real-time streaming data
- precision-sensitive calculations
- performance constraints

in a clean and scalable way.
