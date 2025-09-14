"use client";

import CategoryButtons from "../CategoryButtons/CategoryButtons";
import FilterToggleButton from "../FilterToggleButton/FilterToggleButton";
import SortDropdown from "../SortDropdown/SortDropdown";
import ViewToggle from "../ViewToggle/ViewToggle";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";

const HeaderFilters = () => {
  return (
    <div className="bg-white border-b cursor-pointer">
      <div className="max-w-7xl cursor-pointer mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top section */}
        <div className="flex cursor-pointer flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left side: Categories and Filters */}
          <div className="flex  cursor-pointer flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <CategoryButtons  />
            <FilterToggleButton />
          </div>

          {/* Right side: Sort & View */}
          <div className="flex cursor-pointer  flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <SortDropdown />
            <ViewToggle />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 cursor-pointer">
          <ExpandableFilters />
        </div>
      </div>
    </div>
  );
};

export default HeaderFilters;
