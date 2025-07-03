import { ArrowRight, Building2, ArrowLeft, Globe, MessageSquare, Users, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { BlogInputs } from '../types';

interface InputFormProps {
  onSubmit: (inputs: BlogInputs) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [inputs, setInputs] = useState<BlogInputs>({
    website_url: "",
    target_audience: "",
    business_type : "",
    tone_of_voice:"professional",
   
  });
  
  const businessOptions = [
    'SaaS',
    'E-commerce',
    'Consulting',
    'Healthcare',
    'Education',
    'Finance',
    'Real Estate',
    'Hospitality',
    'Marketing Agency',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const isFormValid = inputs.website_url && inputs.business_type && inputs.target_audience;
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your requirements</h2>
        <p className="text-lg text-gray-600">We’ll use this information to create targeted, engaging content for your audience.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Globe className="w-5 h-5 mr-2 text-blue-500" />
              Competitor page URL
            </label>
            <input
              type="url"
              value={inputs.website_url}
              onChange={(e) => setInputs({ ...inputs, website_url: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., https://example-competitor.com"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Building2 className="w-5 h-5 mr-2 text-purple-500" />
              Business type / Industry
            </label>

            {!isOtherSelected ? (
              <div className="relative">
                <select
                  value={inputs.business_type}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'Other') {
                      setIsOtherSelected(true);
                      setInputs({ ...inputs, business_type: '' });
                    } else {
                      setInputs({ ...inputs, business_type: value });
                    }
                  }}
                  size={1} 
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                  style={{
                    maxHeight: '120px', // Limit height
                    overflowY: 'auto', // Enable scroll inside
                  }}
                >
                  <option value="" disabled>Select business type</option>
                  {businessOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={inputs.business_type}
                  onChange={(e) => setInputs({ ...inputs, business_type: e.target.value })}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter custom business type"
                  required
                />
                {/* Icon to go back to dropdown */}
                <ArrowLeft
                  className="w-5 h-5 absolute left-3 top-3.5 text-purple-500 cursor-pointer hover:text-purple-700 transition"
                  onClick={() => {
                    setIsOtherSelected(false);
                    setInputs({ ...inputs, business_type: '' }); // Optional: clear input
                  }}
                />
              </div>
            )}
          </div>


          {/* <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Building2 className="w-5 h-5 mr-2 text-purple-500" />
              Business type / Industry
            </label>
            <input
              type="text"
              value={inputs.business_type}
              onChange={(e) => setInputs({ ...inputs, business_type: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., SaaS, E-commerce, Consulting, Healthcare"
              required
            />
          </div> */}

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Target audience
            </label>
            <textarea
              value={inputs.target_audience}
              onChange={(e) => setInputs({ ...inputs, target_audience: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 h-24 resize-none"
              placeholder="Describe your ideal readers: e.g., Gen Z, influencers, startups, parents..."
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <MessageSquare className="w-5 h-5 mr-2 text-orange-500" />
              Tone
            </label>
            <select
              value={inputs.tone_of_voice}
              onChange={(e) => setInputs({ ...inputs, tone_of_voice: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            >
              <option value="casual">Casual & Friendly</option>
              <option value="professional">Professional</option>
              <option value="technical">Technical & Detailed</option>
              <option value="conversational">Conversational</option>
              <option value="authoritative">Authoritative</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`
            w-full flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200
            ${isFormValid 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          Generate Blog Ideas
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </form>
    </div>
  );
};