// Main/Main.jsx
"use client";
import { useMemo } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import useEcommerceStore from "../../Store/useStore";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge: string | null;
  description: string;
}

interface MainProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "electronics",
    rating: 4.5,
    reviews: 234,
    badge: "Best Seller",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "accessories",
    rating: 4.8,
    reviews: 189,
    badge: "New",
    description: "Elegant minimalist design with premium materials and Swiss movement",
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500",
    category: "electronics",
    rating: 4.3,
    reviews: 567,
    badge: "Sale",
    description: "Track your fitness goals with advanced sensors and long battery life",
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 199.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    category: "bags",
    rating: 4.7,
    reviews: 123,
    badge: null,
    description: "Premium leather backpack for everyday use with multiple compartments",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    category: "electronics",
    rating: 4.6,
    reviews: 456,
    badge: "Hot",
    description: "Crystal clear sound with long battery life and noise cancellation",
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 129.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
    category: "accessories",
    rating: 4.4,
    reviews: 321,
    badge: null,
    description: "Stylish and UV protected designer sunglasses with polarized lenses",
  },
  {
    id: 7,
    name: "Gaming Mouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "electronics",
    rating: 4.2,
    reviews: 892,
    badge: "Sale",
    description: "High-precision gaming mouse with customizable RGB lighting",
  },
  {
    id: 8,
    name: "Canvas Tote Bag",
    price: 39.99,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "bags",
    rating: 4.5,
    reviews: 156,
    badge: null,
    description: "Durable canvas tote bag perfect for daily use and shopping",
  }
];

const Main = ({ isCartOpen, setIsCartOpen }: MainProps) => {
  const { getFilteredProducts, filters } = useEcommerceStore();


  const filteredProducts = useMemo(() => {
    return getFilteredProducts(products);
  }, [products, filters, getFilteredProducts]);


  const NoResults = () => (
    <div className="col-span-full cursor-pointer text-center py-16">
      <div className="text-gray-400 mb-4 cursor-pointer">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
      <div className="flex cursor-pointer flex-wrap justify-center gap-2 text-sm text-gray-500">
        {filters.searchQuery && (
          <span className="bg-gray-100 px-2 py-1 rounded">
            Search: "{filters.searchQuery}"
          </span>
        )}
        {filters.category !== 'all' && (
          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            Category: {filters.category}
          </span>
        )}
        {(filters.priceRange.min || filters.priceRange.max) && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
            Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <main className="w-full cursor-pointer px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto cursor-pointer">
          

          <div className="mb-6 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-600 text-sm sm:text-base">
                {filteredProducts.length === 0 ? (
                  "No products found"
                ) : (
                  <>
                    Showing <span className="font-semibold">{filteredProducts.length}</span> 
                    {filteredProducts.length === 1 ? ' product' : ' products'}
                    {filters.category !== 'all' && (
                      <span> in <span className="font-semibold capitalize">{filters.category}</span></span>
                    )}
                  </>
                )}
              </p>
              

              {(filters.searchQuery || filters.category !== 'all' || filters.priceRange.min || filters.priceRange.max || filters.minRating > 0) && (
                <div className="flex cursor-pointer flex-wrap gap-2 mt-2">
                  {filters.searchQuery && (
                    <span className="text-xs cursor-pointer bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      "{filters.searchQuery}"
                    </span>
                  )}
                  {filters.category !== 'all' && (
                    <span className="text-xs cursor-pointer bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize">
                      {filters.category}
                    </span>
                  )}
                  {(filters.priceRange.min || filters.priceRange.max) && (
                    <span className="text-xs cursor-pointer bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                    </span>
                  )}
                  {filters.minRating > 0 && (
                    <span className="text-xs cursor-pointer bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      {filters.minRating}+ ⭐ 
                    </span>
                  )}
                </div>
              )}
            </div>

            {filteredProducts.length > 0 && (
              <div className="text-sm text-gray-500 cursor-pointer">
                Sorted by: <span className="font-medium capitalize">
                  {filters.sortBy === 'price-low' ? 'Price (Low to High)' : 
                   filters.sortBy === 'price-high' ? 'Price (High to Low)' : 
                   filters.sortBy === 'rating' ? 'Highest Rated' : 'Featured'}
                </span>
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <NoResults />
          ) : (
            <div className={`
              ${filters.viewMode === 'grid' 
                ? 'grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'flex flex-col cursor-pointer  gap-4'
              }
            `}>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={filters.viewMode}
                />
              ))}
            </div>
          )}

          {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
            <div className="mt-12 cursor-pointer text-center">
              <button className="px-6 cursor-pointer py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Load More Products
              </button>
            </div>
          )}
        </div>
      </main>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Main;