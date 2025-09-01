// ExpandableFilters/ExpandableFilters.tsx
"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import useEcommerceStore from "../../Store/useStore";

const ExpandableFilters = () => {
  const { 
    filters, 
    setPriceRange, 
    setMinRating, 
    clearFilters 
  } = useEcommerceStore();

  const [tempPriceRange, setTempPriceRange] = useState({
    min: filters.priceRange.min,
    max: filters.priceRange.max
  });

  if (!filters.showFilters) return null;

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const newPriceRange = { ...tempPriceRange, [type]: value };
    setTempPriceRange(newPriceRange);
    setPriceRange(newPriceRange);
  };

  const handleRatingClick = (rating: number) => {
    setMinRating(filters.minRating === rating ? 0 : rating);
  };

  return (
    <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempPriceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Min"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={tempPriceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Max"
              min="0"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Minimum Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingClick(star)}
                className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                  star <= filters.minRating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star 
                  className={`w-5 h-5 ${
                    star <= filters.minRating ? 'fill-current' : ''
                  }`} 
                />
              </button>
            ))}
          </div>
          {filters.minRating > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {filters.minRating}+ stars
            </p>
          )}
        </div>

        {/* Active Filters Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Active Filters
          </label>
          <div className="space-y-1">
            {filters.category !== 'all' && (
              <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                {filters.category}
              </span>
            )}
            {(filters.priceRange.min || filters.priceRange.max) && (
              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                {filters.minRating}+ ★
              </span>
            )}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandableFilters;