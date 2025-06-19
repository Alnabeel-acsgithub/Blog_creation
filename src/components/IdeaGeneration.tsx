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
              bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group relative
              flex flex-col h-full
              ${selectedId === idea.id ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:transform hover:-translate-y-1'}
            `}
            onClick={() => handleSelect(idea)}
          >
            {/* Header with Icon and Copy Button */}
            <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
              {/* <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(idea.title, idea.id);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Copy title"
              >
                {copiedId === idea.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button> */}
            </div>

            {/* Content - Flexible area */}
            <div className="px-6 flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                {idea.title}
              </h3>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                {idea.description}
              </p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mb-6">
                {idea.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Call to Action - Fixed at bottom */}
            <div className="px-6 pb-6 flex-shrink-0">
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Click to select</span>
                <div className="flex items-center text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedId === idea.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};