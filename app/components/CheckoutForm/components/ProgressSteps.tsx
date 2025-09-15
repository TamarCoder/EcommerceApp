// CheckoutForm/components/ProgressSteps.tsx
interface ProgressStepsProps {
  currentStep: number;
}

const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Shipping' },
    { number: 3, label: 'Payment' }
  ];

  return (
    <div className="px-6 py-4 border-b">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                currentStep >= step.number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-colors ${
                currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-gray-500">
        {steps.map(step => (
          <span key={step.number}>{step.label}</span>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps