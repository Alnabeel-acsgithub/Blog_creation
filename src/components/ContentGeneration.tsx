import { ArrowRight, Clock, RefreshCw, Tag } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { fetchBlog } from '../Services/Content';
import { BlogInputs, BlogPayload, BlogPost } from '../types';

interface ContentGenerationProps {
  inputs: BlogInputs;
  selectedIdea: BlogPayload;
  onGenerateImage: (post: BlogPost) => void;
  onBackToIdeas: () => void;
}

export const ContentGeneration: React.FC<ContentGenerationProps> = ({ 
  // inputs, 
  selectedIdea, 
  onGenerateImage, 
  onBackToIdeas 
}) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock blog post generation
  const generatePost = () => {
    setLoading(true);
     fetchBlog(selectedIdea).then((ideas) => {
        setPost(ideas);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (!hasGenerated.current) {
      hasGenerated.current = true;
      generatePost();
    }
  }, [selectedIdea]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Crafting Your Blog Post...</h3>
          <p className="text-gray-600">Creating engaging, SEO-optimized content tailored to your audience and brand voice.</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Blog Post is Ready!
        </h2>
        <p className="text-lg text-gray-600">
          Review your content and add compelling visuals to complete your post.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {post.estimated_read_time} min read
              </span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <span className="text-sm">{post.tags.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div
            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content || "<p>No content available.</p>" }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBackToIdeas}
          className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Different Topic
        </button>

        <button
          onClick={() => onGenerateImage(post)}
          className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Generate Featured Image
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};