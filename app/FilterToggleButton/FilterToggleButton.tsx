"use client"
import React, {useState} from 'react';
import { Filter} from 'lucide-react';




const FilterToggleButton = () => {

    const [showFilters, setShowFilters] = useState(false);
    return (
        <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <Filter className="w-4 h-4" />
            Filters
        </button>
    )
}

export default FilterToggleButton;