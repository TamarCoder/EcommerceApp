// CheckoutForm/steps/ShippingAddressStep.tsx
import { ChangeEvent } from "react";
import { MapPin } from "lucide-react";
import { CheckoutFormValues, countryOptions } from "../../checkoutValidation/checkoutValidation";

interface ShippingAddressStepProps {
  formData: CheckoutFormValues;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ShippingAddressStep = ({ 
  formData, 
  errors, 
  touched, 
  onChange, 
  onBlur 
}: ShippingAddressStepProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            touched.address && errors.address
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="123 Main Street, Apartment 4B"
        />
        {touched.address && errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.city && errors.city
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="Tbilisi"
          />
          {touched.city && errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.postalCode && errors.postalCode
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="0100"
          />
          {touched.postalCode && errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.country && errors.country
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
          >
            {countryOptions.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressStep;