// CheckoutForm/CheckoutForm.tsx
"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { X } from "lucide-react";
import useEcommerceStore from "../../Store/useStore";
import {
  CheckoutFormValues,
  checkoutInitialValues,
  formatCardNumber,
  formatExpiryDate,
} from "../checkoutValidation/checkoutValidation";

// Import step components
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ShippingAddressStep from "./steps/ShippingAddressStep";
import PaymentInfoStep from "./steps/PaymentInfoStep";
import OrderSummary from "./components/OrderSummary";
import ProgressSteps from "./components/ProgressSteps";
// SuccessModal არ გვჭირდება - alert გამოვიყენებთ

// Import validation logic
import { useFormValidation } from "./hooks/useFormValidation";

interface CheckoutFormProps {
  onClose: () => void;
  total: number;
}

const CheckoutForm = ({ onClose, total }: CheckoutFormProps) => {
  const { cart, clearCart } = useEcommerceStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Use custom validation hook
  const {
    formData,
    errors,
    touched,
    setFormData,
    setErrors,
    setTouched,
    validateStep,
    validateField,
  } = useFormValidation(checkoutInitialValues);

  // Input handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let newValue = type === "checkbox" ? checked : value;

    // Special formatting for card number and expiry
    if (name === "cardNumber") {
      newValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      newValue = formatExpiryDate(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Step navigation
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order data
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: cart,
        total,
        timestamp: new Date().toISOString(),
      };

      // Store order data (in real app, send to backend)
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      // Show success alert and close modal
      alert("Order completed successfully! Thank you for your purchase.");
      clearCart();
      onClose(); // Close the checkout modal
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
 
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        );
      case 2:
        return (
          <ShippingAddressStep
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        );
      case 3:
        return (
          <PaymentInfoStep
            formData={formData}
            errors={errors}
            touched={touched}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onCardNumberChange={handleCardNumberChange}
            onExpiryChange={handleExpiryChange}
          />
        );
      default:
        return null;
    }
  };

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
        <ProgressSteps currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8 p-6">
            {/* Form Steps */}
            <div className="md:col-span-2 space-y-8">{renderCurrentStep()}</div>

            {/* Order Summary Sidebar */}
            <OrderSummary cart={cart} total={total} />
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
                  disabled={isProcessing}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Complete Order (${total.toFixed(2)})`}
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
