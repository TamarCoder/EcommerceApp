// CheckoutForm/steps/PaymentInfoStep.tsx
import { ChangeEvent } from "react";
import { CreditCard } from "lucide-react";
import { CheckoutFormValues } from "../../checkoutValidation/checkoutValidation";

interface PaymentInfoStepProps {
  formData: CheckoutFormValues;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onCardNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onExpiryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfoStep = ({ 
  formData, 
  errors, 
  touched, 
  onChange, 
  onBlur,
  onCardNumberChange,
  onExpiryChange
}: PaymentInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CreditCard className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={onCardNumberChange}
          onBlur={onBlur}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            touched.cardNumber && errors.cardNumber
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
        />
        {touched.cardNumber && errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Test cards: Visa (4111 1111 1111 1111) | Mastercard (5555 5555 5555 4444)
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={onExpiryChange}
            onBlur={onBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.expiryDate && errors.expiryDate
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="MM/YY"
            maxLength={5}
          />
          {touched.expiryDate && errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.cvv && errors.cvv
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="123"
            maxLength={4}
          />
          {touched.cvv && errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name on Card
        </label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            touched.cardName && errors.cardName
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {touched.cardName && errors.cardName && (
          <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={onChange}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>
      {touched.agreeToTerms && errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
      )}
    </div>
  );
};

export default PaymentInfoStep;