"use client";
import { Search, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { useState } from "react";


interface HeaderProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}


const Header = ({ isCartOpen, setIsCartOpen } :  HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-0">
          {/* Logo */}
          <div className="flex justify-between items-center w-full sm:w-auto">
            <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>

            {/* Cart icon for small screens */}
            <button
              className="sm:hidden relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Cart button for medium+ screens */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
