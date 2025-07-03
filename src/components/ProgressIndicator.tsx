import React from 'react';
import { Check } from 'lucide-react';
import { Step } from '../types';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const steps = [
  { key: 'input', label: 'Input Details', number: 1 },
  { key: 'ideas', label: 'Generate Ideas', number: 2 },
  { key: 'content', label: 'Create Text', number: 3 },
  { key: 'image', label: 'Add Images/Videos', number: 4 },
  { key: 'social', label: 'Social Media', number: 5 },
  { key: 'preview', label: 'Preview & Post', number: 6 },
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.key === currentStep);
  const currentIndex = getCurrentStepIndex();

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center px-4 max-w-full">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isUpcoming = index > currentIndex;

            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 font-medium text-xs md:text-sm transition-all duration-300
                      ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                      ${isCurrent ? 'bg-blue-500 border-blue-500 text-white scale-110' : ''}
                      ${isUpcoming ? 'bg-gray-100 border-gray-300 text-gray-400' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 md:w-5 md:h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <p className={`mt-2 text-xs md:text-sm font-medium text-center ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-4 md:w-8 h-0.5 transition-colors duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};