// CheckoutForm/hooks/useFormValidation.ts
import { useState } from 'react';
import { CheckoutFormValues } from '../../checkoutValidation/checkoutValidation';

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (initialValues: CheckoutFormValues) => {
  const [formData, setFormData] = useState<CheckoutFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Validation function
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value || value.length < 2) return `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        if (value.length > 50) return `${name === 'firstName' ? 'First' : 'Last'} name cannot exceed 50 characters`;
        if (!/^[a-zA-Z\s-']+$/.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!/^[\+]?[\d\s\-\(\)]{8,20}$/.test(value)) return 'Please enter a valid phone number';
        return '';
      
      case 'address':
        if (!value) return 'Address is required';
        if (value.length < 5) return 'Address must be at least 5 characters';
        return '';
      
      case 'city':
        if (!value) return 'City is required';
        if (value.length < 2) return 'City name must be at least 2 characters';
        return '';
      
      case 'postalCode':
        if (!value) return 'Postal code is required';
        if (!/^[\d\w\s-]{3,10}$/.test(value)) return 'Please enter a valid postal code';
        return '';
      
      case 'country':
        if (!value) return 'Country is required';
        return '';
      
      case 'cardNumber':
        if (!value) return 'Card number is required';
        const cleanCard = value.replace(/\s/g, '');
        if (!/^\d{16}$/.test(cleanCard)) return 'Please enter a valid 16-digit card number';
        
        // Basic Luhn algorithm check
        let sum = 0;
        let isEven = false;
        for (let i = cleanCard.length - 1; i >= 0; i--) {
          let digit = parseInt(cleanCard[i]);
          if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
          }
          sum += digit;
          isEven = !isEven;
        }
        if (sum % 10 !== 0) return 'Please enter a valid card number';
        return '';
      
      case 'expiryDate':
        if (!value) return 'Expiry date is required';
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return 'Please enter valid expiry date (MM/YY)';
        const [month, year] = value.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          return 'Card has expired';
        }
        return '';
      
      case 'cvv':
        if (!value) return 'CVV is required';
        if (!/^\d{3,4}$/.test(value)) return 'CVV must be 3 or 4 digits';
        return '';
      
      case 'cardName':
        if (!value) return 'Name on card is required';
        if (value.length < 2) return 'Name on card must be at least 2 characters';
        return '';
      
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms and conditions';
        return '';
      
      default:
        return '';
    }
  };

  // Validate specific step
  const validateStep = (step: number): boolean => {
    const stepFields = {
      1: ['firstName', 'lastName', 'email', 'phone'],
      2: ['address', 'city', 'postalCode', 'country'],
      3: ['cardNumber', 'expiryDate', 'cvv', 'cardName', 'agreeToTerms']
    };

    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || [];
    let isValid = true;
    const newErrors: FormErrors = { ...errors };
    const newTouched = { ...touched };

    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof CheckoutFormValues]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      } else {
        delete newErrors[field];
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  };

  // Validate all form
  const validateForm = (): boolean => {
    return validateStep(1) && validateStep(2) && validateStep(3);
  };

  return {
    formData,
    errors,
    touched,
    setFormData,
    setErrors,
    setTouched,
    validateField,
    validateStep,
    validateForm
  };
};