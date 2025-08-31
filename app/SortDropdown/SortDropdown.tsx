const SortDropdown = () => {


    const sortOptions = [
        {value: 'featured', label: 'Featured'},
        {value: 'price-low', label: 'Price: Low to High'},
        {value: 'price-high', label: 'Price: High to Low'},
        {value: 'rating', label: 'Highest Rated'}
    ];


    return (<select


        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
    >
        {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>)
}