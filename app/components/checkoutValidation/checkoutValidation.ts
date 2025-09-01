// validations/checkoutValidation.ts
import * as Yup from "yup";

 
export interface CheckoutFormValues {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
 
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
 
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
 
  agreeToTerms: boolean;
}

 
export const checkoutInitialValues: CheckoutFormValues = {
  // Personal Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  
 
  address: '',
  city: '',
  postalCode: '',
  country: 'Georgia',
  
 
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: '',
  
 
  agreeToTerms: false
};

 
export const checkoutValidationSchema = Yup.object({
  
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .required('First name is required'),
  
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .required('Last name is required'),
  
  email: Yup.string()
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters')
    .required('Email is required'),
  
  phone: Yup.string()
    .matches(
      /^[\+]?[\d\s\-\(\)]{8,20}$/, 
      'Please enter a valid phone number (8-20 digits with optional formatting)'
    )
    .required('Phone number is required'),
  
  // Shipping Address Validation
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address cannot exceed 200 characters')
    .required('Address is required'),
  
  city: Yup.string()
    .min(2, 'City name must be at least 2 characters')
    .max(100, 'City name cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s-']+$/, 'City name can only contain letters, spaces, hyphens, and apostrophes')
    .required('City is required'),
  
  postalCode: Yup.string()
    .matches(
      /^[\d\w\s-]{3,10}$/, 
      'Please enter a valid postal code (3-10 characters, letters, numbers, spaces, or hyphens)'
    )
    .required('Postal code is required'),
  
  country: Yup.string()
    .oneOf(['Georgia', 'United States', 'United Kingdom', 'Canada', 'Germany', 'France'], 'Please select a valid country')
    .required('Country is required'),
  
  // Payment Information Validation
  cardNumber: Yup.string()
    .matches(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Please enter a valid 16-digit card number')
    .test('luhn-check', 'Please enter a valid card number', (value) => {
      if (!value) return false;
      
      // Remove spaces and convert to array of numbers
      const digits = value.replace(/\s/g, '').split('').map(Number);
      
      // Luhn algorithm for basic card validation
      let sum = 0;
      let isEven = false;
      
      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0;
    })
    .required('Card number is required'),
  
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter valid expiry date (MM/YY)')
    .test('expiry-date', 'Card has expired', (value) => {
      if (!value) return false;
      
      const [month, year] = value.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
      const currentMonth = currentDate.getMonth() + 1;
      
      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;
      
      return true;
    })
    .required('Expiry date is required'),
  
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required'),
  
  cardName: Yup.string()
    .min(2, 'Name on card must be at least 2 characters')
    .max(100, 'Name on card cannot exceed 100 characters')
    .matches(/^[a-zA-Z\s-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and dots')
    .required('Name on card is required'),
  
  // Terms Validation
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions')
});

// Step-specific validation schemas for multi-step forms
export const personalInfoSchema = Yup.object().shape({
  firstName: checkoutValidationSchema.fields.firstName,
  lastName: checkoutValidationSchema.fields.lastName,
  email: checkoutValidationSchema.fields.email,
  phone: checkoutValidationSchema.fields.phone,
});

export const shippingAddressSchema = Yup.object().shape({
  address: checkoutValidationSchema.fields.address,
  city: checkoutValidationSchema.fields.city,
  postalCode: checkoutValidationSchema.fields.postalCode,
  country: checkoutValidationSchema.fields.country,
});

export const paymentInfoSchema = Yup.object().shape({
  cardNumber: checkoutValidationSchema.fields.cardNumber,
  expiryDate: checkoutValidationSchema.fields.expiryDate,
  cvv: checkoutValidationSchema.fields.cvv,
  cardName: checkoutValidationSchema.fields.cardName,
  agreeToTerms: checkoutValidationSchema.fields.agreeToTerms,
});

// Helper functions for form handling
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\s/g, '');
  const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
  return formatted.substring(0, 19); // Max length with spaces
};

export const formatExpiryDate = (value: string): string => {
  let cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length >= 2) {
    cleanValue = cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
  }
  return cleanValue;
};

// Validation field groups for step navigation
export const stepValidationFields = {
  1: ['firstName', 'lastName', 'email', 'phone'],
  2: ['address', 'city', 'postalCode', 'country'],
  3: ['cardNumber', 'expiryDate', 'cvv', 'cardName', 'agreeToTerms']
} as const;

// Country options
export const countryOptions = [
  { value: 'Georgia', label: 'Georgia' },
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Sweden', label: 'Sweden' },
] as const;