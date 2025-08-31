"use client"

import CategoryButtons from "../CategoryButtons/CategoryButtons";
import FilterToggleButton from "../FilterToggleButton/FilterToggleButton";
import SortDropdown from "../SortDropdown/SortDropdown";
import ViewToggle from "../ViewToggle/ViewToggle";
import ExpandableFilters from "../ExpandableFilters/ExpandableFilters";

const HeaderFilters = () => {

    return (

        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <CategoryButtons/>
                         <FilterToggleButton/>
                    </div>
                    <div className="flex items-center gap-4">
                         <SortDropdown/>
                         <ViewToggle/>
                    </div>
                </div>
                <ExpandableFilters/>
            </div>
        </div>
    )
}

export default HeaderFilters;