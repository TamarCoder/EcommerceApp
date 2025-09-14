"use client";

import { useState } from "react";
import useEcommerceStore from "../../Store/useStore";
import { Minus, Plus, X } from "lucide-react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useEcommerceStore();
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed cursor-pointer inset-0 z-50 flex justify-end">
      <div className="absolute cursor-pointer inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative cursor-pointer bg-white w-full max-w-md h-full overflow-auto shadow-2xl">
        <div className="sticky cursor-pointer top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart ({cart.length})</h2>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center cursor-pointer">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4 cursor-pointer">
              {cart.map((item) => (
                <div key={item.id} className=" cursor-pointer flex gap-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 cursor-pointer object-cover rounded-lg"
                  />
                  <div className="flex-1 cursor-pointer">
                    <h4 className="font-medium cursor-pointer text-gray-900">{item.name}</h4>
                    <p className="text-sm  text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex cursor-pointer items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 cursor-pointer" />
                      </button>
                      <span className="px-3 cursor-pointer py-1 bg-white rounded">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 cursor-pointer hover:bg-gray-200 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t cursor-pointer p-4 space-y-2">
              <div className="flex  cursor-pointer justify-between text-sm">
                <span className="text-gray-600 ">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex cursor-pointer justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex  cursor-pointer justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex  cursor-pointer justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full cursor-pointer py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors mt-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full cursor-pointer py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}

        {/* Uncomment and implement when CheckoutForm is ready */}
        {showCheckout && (
          <CheckoutForm onClose={() => setShowCheckout(false)} total={total} />
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
