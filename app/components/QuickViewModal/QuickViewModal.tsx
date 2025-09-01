"use client"
import { useState } from "react";
import useEcommerceStore from "../../Store/useStore";
import { Heart, Package, Shield, Star, Truck, X } from "lucide-react";




const QuickViewModal = ({ product, onClose } :  any) => {

  const { addToCart, toggleFavorite, favorites } = useEcommerceStore();
  const isFavorite = favorites.includes(product.id);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = [product.image, product.image, product.image]; // Mock multiple images
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 cursor-pointer  rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-indigo-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 cursor-pointer  ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500">{product.reviews} reviews</span>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg line-through text-gray-400">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">In Stock - Ready to Ship</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400 cursor-pointer" />
                <span className="text-sm text-gray-600">Free Shipping on Orders Over $50</span>
              </div>
              <div className="flex items-center gap-3 cursor-pointer">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">30-Day Return Policy</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className=" cursor-pointer flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className=" cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default QuickViewModal