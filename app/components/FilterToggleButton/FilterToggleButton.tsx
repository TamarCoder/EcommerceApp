 
"use client";
import React from 'react';
import { Filter } from 'lucide-react';
import useEcommerceStore from '../../Store/useStore';
 

const FilterToggleButton = () => {
  const { filters, toggleFilters } = useEcommerceStore();

  return (
    <button
      onClick={toggleFilters}
      className={`flex items-center cursor-pointer gap-2 px-4 py-2 border rounded-lg transition-colors ${
        filters.showFilters 
          ? 'border-indigo-300 bg-indigo-50 text-indigo-700' 
          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
      }`}
    >
      <Filter className="w-4 h-4" />
      {filters.showFilters ? 'Hide Filters' : 'Show Filters'}
    </button>
  );
};

export default FilterToggleButton;