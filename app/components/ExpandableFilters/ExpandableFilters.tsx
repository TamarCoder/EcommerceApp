"use client"
import {useState} from "react";
import {Star} from "lucide-react";


const ExpandableFilters = () => {

    const [showFilters, setShowFilters] = useState(false);

    if (!showFilters) return null;

    return (
        <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="number"

                        className="w-20 px-2 py-1 border border-gray-300 rounded"
                        placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"


                        className="w-20 px-2 py-1 border border-gray-300 rounded"
                        placeholder="Max"
                    />
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}

                            className="p-1"
                        >
                            <Star/>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-end">
                <button

                    className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                    Clear All Filters
                </button>
            </div>
        </div>
    )
}

export default ExpandableFilters;