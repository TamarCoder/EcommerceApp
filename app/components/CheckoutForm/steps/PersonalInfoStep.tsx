// CheckoutForm/steps/PersonalInfoStep.tsx
import { ChangeEvent } from "react";
import { User, Mail, Phone } from "lucide-react";
import { CheckoutFormValues } from "../../checkoutValidation/checkoutValidation";

interface PersonalInfoStepProps {
  formData: CheckoutFormValues;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoStep = ({ 
  formData, 
  errors, 
  touched, 
  onChange, 
  onBlur 
}: PersonalInfoStepProps) => {
  return (
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
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full cursor-pointer px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.firstName && errors.firstName
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {touched.firstName && errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full cursor-pointer px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              touched.lastName && errors.lastName
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {touched.lastName && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                touched.email && errors.email
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block  text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute  left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              onBlur={onBlur}
              className={`w-full cursor-pointer pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                touched.phone && errors.phone
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="+995 XXX XXX XXX"
            />
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;