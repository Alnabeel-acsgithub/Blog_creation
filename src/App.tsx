import { useState, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { IdeaGeneration } from './components/IdeaGeneration';
import { ContentGeneration } from './components/ContentGeneration';
import { ImageGeneration } from './components/ImageGeneration';
import { SocialMediaGeneration } from './components/SocialMediaGeneration';
import { PreviewAndPost } from './components/PreviewAndPost';
import { ProgressIndicator } from './components/ProgressIndicator';
import { BlogInputs, BlogIdea, BlogPost, GeneratedImage, SocialMediaPost, Step } from './types';

import LoginPage from './components/LoginPage';
import { signInWithGoogle, signOutUser } from './Services/firebaseConfig';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';


function App() {
  const [user, setUser] = useState<{ name?: string | null; email?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  // Persist login across refreshes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({ name: firebaseUser.displayName, email: firebaseUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (result && result.user) {
      setUser({ name: result.user.displayName, email: result.user.email });
    }
  };
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [inputs, setInputs] = useState<BlogInputs | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<BlogIdea | null>(null);
  const [generatedPost, setGeneratedPost] = useState<BlogPost | null>(null);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span className="text-blue-600 font-medium text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  // Conditional rendering for authentication
  // if (!user) {
  //   return <LoginPage onLogin={handleLogin} user={user} />;
  // }

  // Blog workflow UI (rest of your app)
  // ... (keep your existing state and handlers as before)

  // Logout handler
  const handleLogout = async () => {
    await signOutUser();
    setUser(null);
  };


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
      {/* Header Bar with Logout */}
      <div className="flex justify-end items-center px-8 pt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
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