````markdown
# 📺 YouTube Clone Application

A modern, fast, and fully responsive YouTube Clone application built using **React**, **TypeScript**, **Tailwind CSS**, and **React Router**. This application connects directly with the YouTube Data API to stream home video feeds, process live keyword searching, display category-specific routes like Shorts and Subscriptions, and render an immersive, theater-mode video playback environment.

---

## ✨ Features

- **Dynamic Video Grids**: Fluid 4-column responsive grid matching the exact typography and card layout of modern YouTube Web.
- **Live Search Execution**: Global navigation header equipped with a reactive lookup system to fetch real-time search strings.
- **Immersive Theater Media Player**: Custom watch page (`/video/:id`) with an aspect-locked 16:9 player frame, interactive engagement metrics, functional utility bars, and sub-channel subscription models.
- **Up-Next Sidebar Panel**: Intelligent auto-fetching sidebar column displaying related media content loops directly on the playback route.
- **Micro-Interaction Feedback**: Animated, fluid hover preview windows, custom page-loading spins, and elegant layout animations utilizing clean hardware-accelerated transitions.

---

## 📸 Interface Preview

Here is a comprehensive look at the implemented layouts and visual identity of the application:

### 1. Unified Dashboard Home Feed

The application home feed organizes video card blocks inside a beautifully aligned layout, leaving standard utility navigation panels locked neatly to the sidebar.
![Dashboard Home Feed](./img1.PNG)

### 2. High-Performance Sidebar Navigation

Modern curved pill-shaped tabs (`rounded-xl`) shift color schemas dynamically using React Router bindings to highlight current location modules instantly.
![Sidebar Component View](./img2.PNG)

### 3. Integrated Global Header Search System

The top navigation hub manages input search parameters gracefully, maintaining structural stability even as browser frame contexts stretch or shrink.
![Search Architecture Preview](./img3.PNG)

### 4. Advanced Two-Column Watch Page

A premium theater view optimizing display space with a 72% primary layout for live streaming media next to an independent, active recommended video side column.
![Theater Mode Media Player View](./img4.PNG)

---

## 🛠️ Tech Stack & Architecture

- **Frontend Library**: React (with Function Components & Custom State Memoization Hooks)
- **Type Checker**: TypeScript (Strict Structural Contracts)
- **Styling Engine**: Tailwind CSS (Utility-First Responsive Flexbox & Grid Systems)
- **Routing Framework**: React Router DOM (`BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`, `useParams`)
- **Icon Library**: Lucide React

---

## ⚡ Getting Started Locally

Follow these precise steps to pull the project dependencies and launch your developer execution environment:

### Step 1: Install Application Dependencies

Install all core and secondary package nodes declared within the project manifest:

```bash
npm i
```

### Step 2: Compile the Production Build

Trigger the TypeScript compiler and compile optimized static chunk bundles through the Vite build pipelines:

```bash
npm run build
```

### Step 3: Launch Local Production Preview

Instantiate a high-performance local production server instance to preview the compiled build artifact locally before hosting:

```bash
npm run preview
```
````
