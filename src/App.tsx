// src/App.tsx

import React, { useState } from "react";
// Added Link to the react-router-dom imports
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VideoList from "./Components/VideoList";
import Sidebar from "./Components/Sidebar";
import VideoPlayer from "../src/Components/VideoPlayer";

// Import Shorts and Subscriptions components
import Shorts from "./Components/Shorts";
import Subscriptions from "./Components/Subscriptions";

const App: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <Router>
      {/* Main wrapper is a column layout to keep Header on top */}
      <div className="flex flex-col min-h-screen bg-white">
        {/* HEADER SECTION */}
        <header className="h-14 bg-white px-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 z-50">
          {/* Clickable title that redirects cleanly to the home feed */}
          <Link
            to="/"
            className="hover:opacity-85 active:scale-[0.99] transition duration-150 block"
          >
            <h1 className="text-xl md:text-2xl font-bold text-red-600 tracking-tight whitespace-nowrap select-none">
              Muskan's YouTube Clone
            </h1>
          </Link>

          {/* Search Input field */}
          <input
            type="text"
            placeholder="Search"
            className="py-1.5 px-4 w-full max-w-md md:max-w-xl border border-zinc-300 rounded-full focus:outline-none focus:border-blue-500 bg-zinc-50 focus:bg-white transition duration-150 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Balanced spacer block matching YouTube's right side alignment layout spacing */}
          <div className="w-10 hidden md:block"></div>
        </header>

        {/* Content wrapper holding Sidebar and Main feed side-by-side */}
        <div className="flex flex-1 w-full relative">
          {/* SIDEBAR SECTION */}
          <Sidebar />

          {/* MAIN FOOTAGE/ROUTES SECTION */}
          {/* flex-1 handles fluid scaling; independent scroll prevents full-page structural jumping */}
          <main className="flex-1 p-6 h-[calc(100vh-56px)] overflow-y-auto bg-zinc-50">
            <Routes>
              {/* Home Feed Route */}
              <Route
                path="/"
                element={<VideoList query={query} filter={"All"} />}
              />

              {/* Video Player Route */}
              <Route path="/video/:videoId" element={<VideoPlayer />} />

              {/* Sidebar Feature Routes */}
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/subscriptions" element={<Subscriptions />} />

              {/* Dynamic Trending Fallback Route */}
              <Route
                path="/trending"
                element={
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-zinc-900">
                      Trending
                    </h2>
                    <VideoList query="trending" filter="All" />
                  </div>
                }
              />

              {/* Clean Library Placeholder UI */}
              <Route
                path="/library"
                element={
                  <div className="p-6 bg-white rounded-2xl border border-zinc-100 max-w-2xl mt-4">
                    <h2 className="text-2xl font-bold mb-2 text-zinc-900">
                      Library
                    </h2>
                    <p className="text-zinc-500 text-sm">
                      Your saved playlists, liked videos, and watch later items
                      will appear here.
                    </p>
                  </div>
                }
              />

              {/* Clean History Placeholder UI */}
              <Route
                path="/history"
                element={
                  <div className="p-6 bg-white rounded-2xl border border-zinc-100 max-w-2xl mt-4">
                    <h2 className="text-2xl font-bold mb-2 text-zinc-900">
                      Watch History
                    </h2>
                    <p className="text-zinc-500 text-sm">
                      Keep track of what you watch. Your watch history is
                      currently empty.
                    </p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
