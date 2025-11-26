"use client"
import React from 'react';

export interface SortFilterProps {
  selectedSort: string;
  setSelectedSort: (val: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ selectedSort, setSelectedSort }) => {
  return (
    <div className="space-y-3">
      <button
        onClick={() => setSelectedSort("Featured")}
        className={`w-full py-2 px-4 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors ${
          selectedSort === "Featured" ? "bg-[#d9d9d9]" : "bg-white"
        } hover:bg-[#d9d9d9]`}
      >
        Featured
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedSort("Low to High")}
          className={`flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors ${
            selectedSort === "Low to High" ? "bg-[#d9d9d9]" : "bg-white"
          } hover:bg-[#d9d9d9]`}
        >
          Low to High
        </button>
        <button
          onClick={() => setSelectedSort("High to Low")}
          className={`flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors ${
            selectedSort === "High to Low" ? "bg-[#d9d9d9]" : "bg-white"
          } hover:bg-[#d9d9d9]`}
        >
          High to Low
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedSort("A-Z")}
          className={`flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors ${
            selectedSort === "A-Z" ? "bg-[#d9d9d9]" : "bg-white"
          } hover:bg-[#d9d9d9]`}
        >
          A-Z
        </button>
        <button
          onClick={() => setSelectedSort("Z-A")}
          className={`flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 transition-colors ${
            selectedSort === "Z-A" ? "bg-[#d9d9d9]" : "bg-white"
          } hover:bg-[#d9d9d9]`}
        >
          Z-A
        </button>
      </div>
    </div>
  );
};

export default SortFilter;
