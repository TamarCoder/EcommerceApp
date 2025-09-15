"use client";
import { useState } from "react";
import Image from "next/image";
import useEcommerceStore, { Product } from "../../Store/useStore";
 
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import { Heart, Star, Check, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { cart, favorites, addToCart, toggleFavorite } = useEcommerceStore();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [showQuickView, setShowQuickView] = useState<boolean>(false);

  const isInCart = cart.some((item) => item.id === product.id);
  const isFavorite = favorites.includes(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="group relative cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute cursor-pointer top-4 left-4 z-10 px-3 py-1 text-xs font-semibold rounded-full ${
              product.badge === "Sale"
                ? "bg-red-100 text-red-600"
                : product.badge === "New"
                ? "bg-green-100 text-green-600"
                : product.badge === "Hot"
                ? "bg-orange-100 text-orange-600"
                : "bg-indigo-100 text-indigo-600"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute cursor-pointer top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 cursor-pointer ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Image */}
        <div className="relative cursor-pointer w-48 h-48 flex-shrink-0 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute cursor-pointer inset-0 bg-gray-100 animate-pulse" />
          )}
          <Image
            src={`${product.image}?auto=format&fit=crop&w=400&q=80`}
            alt={product.name}
            fill
            unoptimized
            onLoadingComplete={() => setImageLoaded(true)}
            className={`cursor-pointer w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowQuickView(true)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 cursor-pointer p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex cursor-pointer items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 cursor-pointer ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex cursor-pointer items-center justify-between">
            {/* Price */}
            <div className="flex items-center  cursor-pointer gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex cursor-pointer items-center gap-2">
              <button
                onClick={() => setShowQuickView(true)}
                className=" cursor-pointer px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quick View
              </button>
              
              <button
                onClick={() => addToCart(product)}
                className={` cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  isInCart
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4 cursor-pointer" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 cursor-pointer" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        {showQuickView && (
          <QuickViewModal
            product={product}
            onClose={() => setShowQuickView(false)}
          />
        )}
      </div>
    );
  }

  // Grid View (default)
  return (
    <div className="group relative cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute cursor-pointer top-4 left-4 z-10 px-3 py-1 text-xs font-semibold rounded-full ${
            product.badge === "Sale"
              ? "bg-red-100 text-red-600"
              : product.badge === "New"
              ? "bg-green-100 text-green-600"
              : product.badge === "Hot"
              ? "bg-orange-100 text-orange-600"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Favorite Button */}
      <button
        onClick={() => toggleFavorite(product.id)}
        className="cursor-pointer absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 cursor-pointer ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative cursor-pointer h-64 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute cursor-pointer inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={`${product.image}?auto=format&fit=crop&w=500&q=80`}
          alt={product.name}
          fill
          unoptimized
          onLoadingComplete={() => setImageLoaded(true)}
          className={`cursor-pointer w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Quick View Overlay */}
        <div className="absolute cursor-pointer inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => setShowQuickView(true)}
            className="px-4 py-2 cursor-pointer bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors transform scale-95 group-hover:scale-100"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 cursor-pointer">
        <h3 className="font-semibold cursor-pointer text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex  cursor-pointer items-center gap-2 mb-2">
          <div className="flex cursor-pointer items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex  cursor-pointer items-center gap-2 mb-3">
          <span className="text-2xl cursor-pointer font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm line-through text-gray-400">
                ${product.originalPrice}
              </span>
              <span className="text-sm font-semibold text-green-600">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className={`w-full cursor-pointer py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-5 h-5 cursor-pointer" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 cursor-pointer" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;