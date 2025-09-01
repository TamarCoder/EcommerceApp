// SortDropdown/SortDropdown.tsx
"use client";
import { ChangeEvent } from "react";
import useEcommerceStore, { Filters } from "../../Store/useStore";

const SortDropdown = () => {
  const { filters, setSortBy } = useEcommerceStore();

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ] as const;

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as Filters['sortBy']);
  };

  return (
    <div className="relative">
      <label className="block text-xs text-gray-500 mb-1">Sort by</label>
      <select
        value={filters.sortBy}
        onChange={handleSortChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white cursor-pointer min-w-[160px]"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;