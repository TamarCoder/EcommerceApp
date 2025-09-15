 
"use client";

import useEcommerceStore from "../../Store/useStore";

 

// TypeScript interface for icon props
interface IconProps {
  className?: string;
}

// Custom Grid Icon (lucide-react-ის ნაცვლად)
const Grid = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

// Custom List Icon (lucide-react-ის ნაცვლად)
const List = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

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
          className={`p-2 cursor-pointer rounded transition-colors ${
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