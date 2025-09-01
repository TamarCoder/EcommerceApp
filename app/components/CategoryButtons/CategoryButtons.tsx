
"use client";
import useEcommerceStore from "../../Store/useStore";

const CategoryButtons = () => {
  const { filters, setCategory } = useEcommerceStore();
  
  const categories = ['all', 'electronics', 'accessories', 'bags'];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setCategory(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            filters.category === category
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
              : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;