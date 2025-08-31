const CategoryButtons = () => {

    const categories = ['all', 'electronics', 'accessories', 'bags'];


    // const filteredProducts = products.filter(product => {
    //     const matchesCategory = filters.category === 'all' || product.category === filters.category;
    //     return  matchesCategory
    // });


    return (
        <div className="flex items-center gap-2">
            {categories.map(category => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                        category
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >


                    
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default CategoryButtons