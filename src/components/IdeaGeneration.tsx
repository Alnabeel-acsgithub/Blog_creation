import { ArrowRight, Check, Copy, Lightbulb, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { fetchBlogIdeas } from '../Services/ContentIdeas';
import { BlogIdea, BusinessContentPayload } from '../types';

interface IdeaGenerationProps {
  inputs: BusinessContentPayload
  onSelectIdea: (idea: BlogIdea) => void;
  onRegenerateIdeas: () => void;
}

export const IdeaGeneration: React.FC<IdeaGenerationProps> = ({ inputs, onSelectIdea, onRegenerateIdeas }) => {
  const [ideas, setIdeas] = useState<BlogIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');

  // Mock blog idea generation
  const generateIdeas = () => {
    setLoading(true);
    fetchBlogIdeas(inputs).then((ideas) => {
    setIdeas(ideas);
    setLoading(false);
  }).catch(() => setLoading(false));
    // setTimeout(() => {
    //   const mockIdeas: BlogIdea[] = [
    //     {
    //       id: '1',
    //       title: `10 Ways ${inputs.businessType} Companies Can Boost Customer Engagement`,
    //       description: 'Explore proven strategies to connect with your audience and build lasting relationships.',
    //       keywords: ['engagement', 'customers', 'retention'],
    //     },
    //     {
    //       id: '2',
    //       title: `The Future of ${inputs.businessType}: Trends to Watch in 2024`,
    //       description: 'Stay ahead of the curve with insights into emerging trends and technologies.',
    //       keywords: ['trends', 'future', 'innovation'],
    //     },
    //     {
    //       id: '3',
    //       title: 'Common Mistakes That Kill Your Conversion Rate',
    //       description: 'Identify and fix the critical errors that are costing you customers.',
    //       keywords: ['conversion', 'mistakes', 'optimization'],
    //     },
    //     {
    //       id: '4',
    //       title: `How to Choose the Right ${inputs.businessType} Solution for Your Needs`,
    //       description: 'A comprehensive guide to making informed decisions in a crowded market.',
    //       keywords: ['guide', 'selection', 'decision'],
    //     },
    //     {
    //       id: '5',
    //       title: 'Building Trust in the Digital Age: A Step-by-Step Guide',
    //       description: 'Learn how to establish credibility and trust with your online audience.',
    //       keywords: ['trust', 'credibility', 'digital'],
    //     },
    //     {
    //       id: '6',
    //       title: `ROI Calculator: Is Your ${inputs.businessType} Investment Worth It?`,
    //       description: 'Tools and methods to measure and maximize your return on investment.',
    //       keywords: ['ROI', 'investment', 'calculator'],
    //     },
    //   ];
    //   setIdeas(mockIdeas);
    //   setLoading(false);
    // }, 1500);
  };

  useEffect(() => {
    generateIdeas()
  }, []);

  const handleCopy = (title: string, id: string) => {
    navigator.clipboard.writeText(title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const handleSelect = (idea: BlogIdea) => {
    setSelectedId(idea.id);
    setTimeout(() => {
      onSelectIdea(idea);
    }, 300);
  };

  const handleRegenerate = () => {
    onRegenerateIdeas();
    generateIdeas();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Generating Creative Ideas...</h3>
          <p className="text-gray-600">Analyzing your business context and target audience to create compelling blog topics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Blog Topic</h2>
        <p className="text-lg text-gray-600">Select an idea that resonates with your audience, or regenerate for fresh options.</p>
      </div>

      <div className="mb-6 text-center">
        <button
          onClick={handleRegenerate}
          className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Regenerate Ideas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`
              bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group
              ${selectedId === idea.id ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:transform hover:-translate-y-1'}
            `}
            onClick={() => handleSelect(idea)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(idea.title, idea.id);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {copiedId === idea.id ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {idea.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {idea.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Click to select</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};