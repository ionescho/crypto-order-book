# 🚀 Crypto Order Book

A real-time order book implementation inspired by Binance, built with
modern React and WebSockets, with a focus on performance, correctness,
and clean architecture.

---

## 🔗 Live Demo

[Crypto Order Book](https://crypto-order-book-horia.netlify.app/)

---

## 📸 Overview

This project implements a live crypto order book that closely replicates
the behavior and appearance of Binance's order book, including real-time
updates, price grouping, and depth visualization.

The application consumes Binance's public WebSocket streams and renders
high-frequency updates efficiently while maintaining a responsive UI.

---

## ✨ Features

- 📡 Real-time order book using Binance WebSocket streams\
- 🔄 Market switching (multiple trading pairs)\
- 🔢 Price grouping & decimal precision control\
- 📊 Depth visualization:
  - Amount depth\
  - Cumulative depth\
- ⚖️ Buy / Sell ratio indicator\
- 🎨 Row highlighting and update animations\
- 🧩 Custom UI controls (checkbox, radio, toggle, popover)\
- ⚡ Optimized rendering for high-frequency updates

---

## 🛠 Tech Stack

- React (latest, hooks-based)
- TypeScript
- Vite
- Native WebSocket API
- CSS Modules
- lucide-react (icons)

---

## 🧠 Key Engineering Decisions

### 1. WebSocket Lifecycle Management

- Subscriptions are properly opened and closed when switching markets\
- Prevents duplicate streams and memory leaks\
- Data is processed incrementally instead of recomputing the entire
  order book

---

### 2. Performance Optimization

The order book updates multiple times per second, so performance was a
key concern:

- Components are memoized where appropriate\
- State updates are scoped to avoid unnecessary re-renders\
- Expensive computations (grouping, depth calculations) are localized\
- UI controls are kept outside frequently updating components

---

### 3. Precision Handling (Floating Point Issues)

JavaScript floating point arithmetic introduced inconsistencies when
grouping prices:

```js
74674.01 / 0.01 !== 7467401;
```

To ensure stable and deterministic grouping:

- Implemented a fixed-point approach using string manipulation\
- Avoided floating point operations for decimal precisions\
- Applied integer-like logic for grouping calculations

This guarantees correct grouping even for small precisions (e.g. 0.01,
0.001).

---

### 4. Price Grouping Logic

- Supports both floor (bids) and ceil (asks) grouping strategies\
- Handles arbitrary decimal precision (powers of 10)\
- Ensures no collapsing or misalignment of price levels

---

### 5. Depth Visualization

- Depth bars are normalized relative to visible rows\
- Supports:
  - raw amount\
  - cumulative totals\
- Implemented using lightweight DOM updates to maintain performance

---

### 6. UI Architecture

- Built custom UI components instead of using a UI framework\
- Reasoning:
  - small, well-defined scope\
  - need for precise visual control\
  - reduced bundle size and overhead

Components implemented:

- Toggle\
- Checkbox\
- Radio\
- Popover menu

---

### 7. State & Data Flow

- UI controls emit configuration changes (uncontrolled inputs)\
- Order book reacts to configuration updates\
- Data flow is unidirectional and predictable

---

## 📦 Installation

```bash
npm install
npm run dev
```

The app will run on:

    http://localhost:5173

---

## 🧪 Assumptions

- Precision values are powers of 10\
- Order book depth is limited to a small number of visible rows\
- The application is focused on visualization, not financial
  calculations

---

## 🔍 Possible Improvements

- Virtualized rendering for larger datasets\
- More advanced animation system (closer to Binance behavior)\
- Improved accessibility (ARIA roles, keyboard navigation)\
- Better handling of edge-case WebSocket reconnections

---

## 💡 Notes

This project prioritizes:

- correctness of data representation\
- performance under frequent updates\
- clean and maintainable architecture

---

## 🏁 Conclusion

The goal of this project was not only to replicate a UI, but to handle:

- real-time streaming data\
- precision-sensitive calculations\
- performance constraints

in a clean and scalable way.
