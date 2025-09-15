// CheckoutForm/components/OrderSummary.tsx
import { CartItem } from "../../../Store/useStore";

interface OrderSummaryProps {
  cart: CartItem[];
  total: number;
}

const OrderSummary = ({ cart, total }: OrderSummaryProps) => {
  const subtotal = total - total * 0.08 - (total > 50 ? 0 : 9.99);
  const tax = total * 0.08;
  const shipping = total > 50 ? 0 : 9.99;

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;