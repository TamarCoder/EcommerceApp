// ViewToggle/ViewToggle.jsx
"use client";
import { Grid, List } from "lucide-react";
import useEcommerceStore from "../../Store/useStore";

 
const ViewToggle = () => {

  const { filters, setViewMode } = useEcommerceStore();

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">View</label>
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded transition-colors ${
            filters.viewMode === 'grid' 
              ? 'bg-white shadow-sm text-indigo-600' 
              : 'hover:bg-gray-200 text-gray-600'
          }`}
          title="Grid View"
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2  cursor-pointer rounded transition-colors ${
            filters.viewMode === 'list' 
              ? 'bg-white shadow-sm text-indigo-600' 
              : 'hover:bg-gray-200 text-gray-600'
          }`}
          title="List View"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;