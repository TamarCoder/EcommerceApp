"use client";
import { useState } from "react";
import Image from "next/image";
import useEcommerceStore from "../../Store/useStore";
import { Check, Heart, Star } from "lucide-react";

const ProductCard = ({ product }: any) => {
  const { cart, favorites, addToCart, toggleFavorite,   } = useEcommerceStore();
  const [isGridView, setIsGridView] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const isInCart = cart.some((item) => item.id === product.id);
  const isFavorite = favorites.includes(product.id);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
        isGridView ? "" : "flex"
      } 
  w-full sm:w-[300px] md:w-[350px] lg:w-[400px] 
  h-[400px] sm:h-[420px] md:h-[440px] lg:h-[450px]`}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute cursor-pointer  top-4 left-4 z-10 px-3 py-1 text-xs font-semibold rounded-full ${
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
        className="absolute cursor-pointer  top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* Image */}
      <div
        className={`relative overflow-hidden   ${
          isGridView ? "h-64" : "w-48 h-48"
        }`}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          onLoadingComplete={() => setImageLoaded(true)}
          className={`cursor-pointer w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Quick View Overlay */}
        <div className="absolute cursor-pointer   inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => setShowQuickView(true)}
            className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${isGridView ? "" : "flex-1"}`}>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex cursor-pointer  items-center gap-2 mb-2">
          <div className="flex items-center">
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
          <span className=" cursor-pointer  text-sm text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
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

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className={` cursor-pointer  w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart
            </>
          ) : (
            <>
              {/* <ShoppingCart className="w-5 h-5" /> */}
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Quick View Modal
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )} */}
    </div>
  );
};

export default ProductCard;
