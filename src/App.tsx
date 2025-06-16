import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { IdeaGeneration } from './components/IdeaGeneration';
import { ContentGeneration } from './components/ContentGeneration';
import { ImageGeneration } from './components/ImageGeneration';
import { SocialMediaGeneration } from './components/SocialMediaGeneration';
import { PreviewAndPost } from './components/PreviewAndPost';
import { ProgressIndicator } from './components/ProgressIndicator';
import { BlogInputs, BlogIdea, BlogPost, GeneratedImage, SocialMediaPost, Step } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [inputs, setInputs] = useState<BlogInputs | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<BlogIdea | null>(null);
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);

  const handleInputSubmit = (formInputs: BlogInputs) => {
    setInputs(formInputs);
    setCurrentStep('ideas');
  };

  const handleIdeaSelect = (idea: BlogIdea) => {
    setSelectedIdea(idea);
    setCurrentStep('content');
  };

  const handleRegenerateIdeas = () => {
    setSelectedIdea(null);
    // Stay on ideas step to show regenerated ideas
  };

  const handleGenerateImage = (post: BlogPost) => {
    setGeneratedPost(post);
    setCurrentStep('image');
  };

  const handleBackToIdeas = () => {
    setSelectedIdea(null);
    setCurrentStep('ideas');
  };

  const handleBackToContent = () => {
    setGeneratedImage(null);
    setCurrentStep('content');
  };

  const handleProceedToSocial = (image: GeneratedImage) => {
    setGeneratedImage(image);
    setCurrentStep('social');
  };

  const handleBackToImage = () => {
    setSocialPosts([]);
    setCurrentStep('image');
  };

  const handleProceedToPreview = (posts: SocialMediaPost[]) => {
    setSocialPosts(posts);
    setCurrentStep('preview');
  };

  const handleStartOver = () => {
    setCurrentStep('input');
    setInputs(null);
    setSelectedIdea(null);
    setGeneratedPost(null);
    setGeneratedImage(null);
    setSocialPosts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog Content Generation System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your ideas into engaging, SEO-optimized blog posts with AI-powered content generation, stunning visuals, and social media integration.
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {currentStep === 'input' && (
            <InputForm onSubmit={handleInputSubmit} />
          )}

          {currentStep === 'ideas' && inputs && (
            <IdeaGeneration 
              inputs={inputs}
              onSelectIdea={handleIdeaSelect}
              onRegenerateIdeas={handleRegenerateIdeas}
            />
          )}

          {currentStep === 'content' && inputs && selectedIdea && (
            <ContentGeneration
              inputs={inputs}
              selectedIdea={selectedIdea}
              onGenerateImage={handleGenerateImage}
              onBackToIdeas={handleBackToIdeas}
            />
          )}

          {currentStep === 'image' && generatedPost && (
            <ImageGeneration
              post={generatedPost}
              onBackToContent={handleBackToContent}
              onProceedToSocial={handleProceedToSocial}
            />
          )}

          {currentStep === 'social' && generatedPost && generatedImage && (
            <SocialMediaGeneration
              post={generatedPost}
              image={generatedImage}
              onBackToImage={handleBackToImage}
              onProceedToPreview={handleProceedToPreview}
            />
          )}

          {currentStep === 'preview' && generatedPost && generatedImage && socialPosts.length > 0 && (
            <PreviewAndPost
              post={generatedPost}
              image={generatedImage}
              socialPosts={socialPosts}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Powered by AI • Built for content creators and marketers • Complete content workflow solution
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;