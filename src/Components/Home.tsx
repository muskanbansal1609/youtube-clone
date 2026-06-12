// src/components/Home.tsx

import React, { useState } from 'react';
import VideoList from './VideoList';
import { useDebounce } from '../services/useDebounce';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const debouncedQuery = useDebounce(query, 300);

  // Filters for categories
  const filters = ['All', 'Music', 'Sports', 'News', 'Gaming', 'Education'];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    setQuery(''); // Reset the search query when changing filters
  };

  return (
    <div>
      <header className="bg-white p-4 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl font-bold text-red-600">Muskan's YouTube Clone</h1>
        <input
          type="text"
          placeholder="Search"
          className="p-2 w-1/2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`py-2 px-4 rounded-full transition duration-200 ${
              selectedFilter === filter ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Video List component */}
      <VideoList query={debouncedQuery} filter={selectedFilter} />
    </div>
  );
};

export default Home;
