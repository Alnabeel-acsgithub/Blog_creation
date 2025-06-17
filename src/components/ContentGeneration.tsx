import { ArrowRight, Clock, RefreshCw, Tag } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
//     setTimeout(() => {
//       const mockPost: BlogPost = {
//         title: selectedIdea.title,
//         content: `
// # ${selectedIdea.title}

// ## Introduction

// In today's competitive ${inputs.businessType.toLowerCase()} landscape, understanding your audience and delivering value through strategic content is more important than ever. This comprehensive guide will walk you through actionable strategies that can transform your approach and drive meaningful results.

// ## The Current Landscape

// The ${inputs.businessType.toLowerCase()} industry has evolved significantly over the past few years. With changing consumer behaviors and technological advances, businesses need to adapt their strategies to stay relevant and competitive.

// ### Key Challenges

// - **Market Saturation**: Standing out in a crowded marketplace
// - **Customer Expectations**: Meeting increasingly sophisticated demands
// - **Technology Integration**: Leveraging new tools and platforms effectively
// - **ROI Measurement**: Proving value and return on investment

// ## Strategic Approach

// ### 1. Understanding Your Audience

// Your ${inputs.targetAudience.toLowerCase()} audience has specific needs and preferences. By deeply understanding their pain points, motivations, and behaviors, you can create more targeted and effective strategies.

// ### 2. Implementing Best Practices

// Based on industry research and real-world applications, here are the proven methods that deliver results:

// **Data-Driven Decision Making**
// - Utilize analytics to guide strategy
// - Test and iterate based on performance metrics
// - Set clear KPIs and benchmarks

// **Customer-Centric Approach**
// - Prioritize user experience in all interactions
// - Gather and act on customer feedback
// - Personalize communications when possible

// ### 3. Measuring Success

// Success in ${inputs.businessType.toLowerCase()} requires consistent monitoring and optimization. Key metrics to track include:

// - Engagement rates and user interactions
// - Conversion rates and revenue impact
// - Customer satisfaction and retention
// - Market share and competitive positioning

// ## Implementation Guide

// ### Phase 1: Planning and Preparation
// Start by conducting a thorough audit of your current situation. Identify strengths, weaknesses, and opportunities for improvement.

// ### Phase 2: Execution
// Roll out your strategy in manageable phases, allowing for testing and refinement along the way.

// ### Phase 3: Optimization
// Continuously monitor performance and make data-driven adjustments to maximize results.

// ## Conclusion

// Success in the ${inputs.businessType.toLowerCase()} space requires a combination of strategic thinking, tactical execution, and continuous optimization. By following the framework outlined in this guide and staying focused on delivering value to your ${inputs.targetAudience.toLowerCase()} audience, you'll be well-positioned to achieve your goals.

// Remember, the key is to start with a solid foundation, implement systematically, and remain flexible as you learn what works best for your specific situation.

// ## Next Steps

// 1. Assess your current position and identify priority areas
// 2. Develop a detailed implementation plan with timelines
// 3. Begin with small tests to validate your approach
// 4. Scale successful strategies across your organization
// 5. Continue monitoring and optimizing for long-term success

// ---

// *Ready to implement these strategies? Start by identifying one area where you can make an immediate impact and build momentum from there.*
//         `,
//         estimatedReadTime: 8,
//         tags: ['strategy', 'business', 'growth', inputs.businessType.toLowerCase()],
//       };
//       setPost(mockPost);
//       setLoading(false);
//     }, 2000);
  };

  useEffect(() => {
    generatePost();
  },[selectedIdea]);

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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Blog Post is Ready!</h2>
        <p className="text-lg text-gray-600">Review your content and add compelling visuals to complete your post.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{post.estimated_read_time} min read</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              <span className="text-sm">{post.tags.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s+(.+)/g, (match, p1) => {
                const matchResult = match.match(/^#+/);
                const level = matchResult ? matchResult[0].length : 1;
                return `<h${level} class="font-bold text-gray-900 mt-8 mb-4">${p1}</h${level}>`;
              })
            }}
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