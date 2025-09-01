// CheckoutForm/CheckoutForm.tsx
"use client";
import { useState } from "react";
import { useFormik } from "formik";  
import { X, CreditCard, MapPin, User, Mail, Phone, CheckCircle } from "lucide-react";
import useEcommerceStore from "../../Store/useStore";
import { 
  CheckoutFormValues, 
  checkoutInitialValues, 
  checkoutValidationSchema, 
  countryOptions, 
  formatCardNumber, 
  formatExpiryDate, 
  stepValidationFields 
} from "../checkoutValidation/checkoutValidation";

interface CheckoutFormProps {
  onClose: () => void;
  total: number;
}

const CheckoutForm = ({ onClose, total }: CheckoutFormProps) => {
  const { cart, clearCart } = useEcommerceStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const formik = useFormik<CheckoutFormValues>({
    initialValues: checkoutInitialValues,
    validationSchema: checkoutValidationSchema,
    onSubmit: async (values: CheckoutFormValues) => { // ტიპი დაემატა
      setIsProcessing(true);
      
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would integrate with actual payment provider
        console.log('Processing order:', { values, cart, total });
        
        // Simulate API call
        const orderData = {
          orderId: `ORD-${Date.now()}`,
          customer: {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phone: values.phone,
          },
          shippingAddress: {
            address: values.address,
            city: values.city,
            postalCode: values.postalCode,
            country: values.country,
          },
          items: cart,
          total,
          timestamp: new Date().toISOString(),
        };
        
        // Store order data (in real app, send to backend)
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
        setOrderComplete(true);
        clearCart();
      } catch (error) {
        console.error('Payment failed:', error);
        alert('Payment processing failed. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  });

  // Custom handlers for formatted inputs
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    formik.setFieldValue('cardNumber', formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    formik.setFieldValue('expiryDate', formatted);
  };

  // Step navigation with validation
  const validateCurrentStep = (step: number): boolean => {
    const fieldsToCheck = stepValidationFields[step as keyof typeof stepValidationFields];
    
    const hasErrors = fieldsToCheck.some(field => {
      const fieldError = formik.errors[field as keyof CheckoutFormValues];
      const fieldValue = formik.values[field as keyof CheckoutFormValues];
      return fieldError || !fieldValue;
    });

    if (hasErrors) {
      // Touch all fields in current step to show errors
      fieldsToCheck.forEach(field => {
        formik.setFieldTouched(field as keyof CheckoutFormValues, true);
      });
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-gray-500">
            <span>Personal Info</span>
            <span>Shipping</span>
            <span>Payment</span>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8 p-6">
            
            {/* Form Steps */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Step 1: Personal Information */}
              {currentStep >= 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps('firstName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.firstName && formik.errors.firstName
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter first name"
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps('lastName')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.lastName && formik.errors.lastName
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Enter last name"
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          {...formik.getFieldProps('email')}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                            formik.touched.email && formik.errors.email
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          {...formik.getFieldProps('phone')}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                            formik.touched.phone && formik.errors.phone
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300'
                          }`}
                          placeholder="+995 XXX XXX XXX"
                        />
                      </div>
                      {formik.touched.phone && formik.errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep >= 2 && (
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
                      {...formik.getFieldProps('address')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formik.touched.address && formik.errors.address
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street, Apartment 4B"
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps('city')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.city && formik.errors.city
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Tbilisi"
                      />
                      {formik.touched.city && formik.errors.city && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps('postalCode')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.postalCode && formik.errors.postalCode
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="0100"
                      />
                      {formik.touched.postalCode && formik.errors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.postalCode}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        {...formik.getFieldProps('country')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.country && formik.errors.country
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
                      {formik.touched.country && formik.errors.country && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep >= 3 && (
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
                      value={formik.values.cardNumber}
                      onChange={handleCardNumberChange}
                      onBlur={formik.handleBlur}
                      name="cardNumber"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formik.touched.cardNumber && formik.errors.cardNumber
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formik.values.expiryDate}
                        onChange={handleExpiryChange}
                        onBlur={formik.handleBlur}
                        name="expiryDate"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.expiryDate && formik.errors.expiryDate
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {formik.touched.expiryDate && formik.errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        {...formik.getFieldProps('cvv')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          formik.touched.cvv && formik.errors.cvv
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {formik.touched.cvv && formik.errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.cvv}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      {...formik.getFieldProps('cardName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        formik.touched.cardName && formik.errors.cardName
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {formik.touched.cardName && formik.errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.cardName}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...formik.getFieldProps('agreeToTerms')}
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
                  {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                    <p className="text-sm text-red-600">{formik.errors.agreeToTerms}</p>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
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
                  <span className="font-medium">${(total - total * 0.08 - (total > 50 ? 0 : 9.99)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {total > 50 ? 'Free' : '$9.99'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="sticky bottom-0 bg-white border-t p-6">
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing || !formik.isValid}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isProcessing || !formik.isValid
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isProcessing ? 'Processing...' : `Complete Order ($${total.toFixed(2)})`}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;