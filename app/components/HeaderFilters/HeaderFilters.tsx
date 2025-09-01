"use client";

import CategoryButtons from "../CategoryButtons/CategoryButtons";
import FilterToggleButton from "../FilterToggleButton/FilterToggleButton";
import SortDropdown from "../SortDropdown/SortDropdown";
import ViewToggle from "../ViewToggle/ViewToggle";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";

const HeaderFilters = () => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left side: Categories and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <CategoryButtons />
            <FilterToggleButton />
          </div>

          {/* Right side: Sort & View */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <SortDropdown />
            <ViewToggle />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4">
          <ExpandableFilters />
        </div>
      </div>
    </div>
  );
};

export default HeaderFilters;
