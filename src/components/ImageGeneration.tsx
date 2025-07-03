// import { ArrowLeft, ArrowRight, Download, Eye, RotateCw, Sparkles } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { blogImage } from '../Services/imageGenerate';

// import { BlogPost, GeneratedImage } from '../types';

// interface ImageGenerationProps {
//   post: BlogPost;
//   onBackToContent: () => void;
//   onProceedToSocial: (image: GeneratedImage) => void;
// }

// export const ImageGeneration: React.FC<ImageGenerationProps> = ({
//   post,
//   onBackToContent,
//   onProceedToSocial,
// }) => {
//   const [image, setImage] = useState<GeneratedImage | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [customPrompt, setCustomPrompt] = useState('');
//   const [showPromptEditor, setShowPromptEditor] = useState(false);

//   // Generate image prompt based on blog post
//   const generateImagePrompt = (customization?: string) => {
//     const basePrompt = `Professional blog header image for "${post.content}". Modern, clean design with vibrant colours. High quality, digital art style, business-focused`;
//     return customization ? `${basePrompt}. ${customization}` : basePrompt;
//   };

//   // Mock image generation
//   const generateImage = () => {
//   setLoading(true);

//   blogImage(post.content).then((imageUrl) => {
//     if (imageUrl) {
//       setImage({ url: imageUrl }); // Make sure your state supports this format
//     }
//     setLoading(false);
//   }).catch(() => setLoading(false));
// };
//   useEffect(() => {
//     generateImage();
//   }, []);

//   const handleRegenerateImage = () => {
//     // const prompt = customPrompt ? generateImagePrompt(customPrompt) : generateImagePrompt();
//     generateImage();
//     setShowPromptEditor(false);
//   };

//   const handleDownloadImage = () => {
//   const link = document.createElement("a");
//   link.href = image?.url || "";
//   link.download = `blog-image-${Date.now()}.png`;
//   link.click();
// };

//   const handleProceedToSocial = () => {
//     if (image) {
//       onProceedToSocial(image);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto text-center">
//         <div className="bg-white rounded-2xl shadow-xl p-12">
//           <div className="animate-pulse">
//             <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
//             <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
//           </div>
//           <div className="mt-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Featured Image...</h3>
//             <p className="text-gray-600">Generating a stunning visual that perfectly complements your blog post content.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Featured Image is Ready!</h2>
//         <p className="text-lg text-gray-600">Perfect visual to complement your blog post. Customise or proceed to create social media content.</p>
//       </div>

//       {/* Generated Image Display */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
//         <div className="relative">
//             <img
//             src={image?.url}
//             alt="Generated Blog Image"
//             className="w-full h-80 object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//           <div className="absolute bottom-6 left-6 right-6 text-white">
//             <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
//             <div className="flex items-center space-x-4 text-sm text-gray-200">
//               <span>{post.estimated_read_time} min read</span>
//               <span>•</span>
//               <span>{post.tags.join(', ')}</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="text-lg font-semibold text-gray-900">Featured Image</h4>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setShowPromptEditor(!showPromptEditor)}
//                 className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
//               >
//                 <Eye className="w-4 h-4 mr-1" />
//                 {showPromptEditor ? 'Hide' : 'View'} Prompt
//               </button>
//             </div>
//           </div>

//           {showPromptEditor && (
//             <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Customise Image Prompt
//               </label>
//               <textarea
//                 value={customPrompt}
//                 onChange={(e) => setCustomPrompt(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm h-20 resize-none"
//                 placeholder="Add specific details: colours, style, objects, mood..."
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Current prompt: {generateImagePrompt(customPrompt)}
//               </p>
//             </div>
//           )}

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={handleRegenerateImage}
//               className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               <RotateCw className="w-5 h-5 mr-2" />
//               Generate New Image
//             </button>

//             <button
//               onClick={handleDownloadImage}
//               className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               <Download className="w-5 h-5 mr-2" />
//               Download Image
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Blog Post Summary */}
//       <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//         <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//           <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
//           Blog Post Summary
//         </h4>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <div className="text-2xl font-bold text-blue-600 mb-1">{post.estimated_read_time}</div>
//             <div className="text-sm text-blue-700">Minutes to Read</div>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <div className="text-2xl font-bold text-green-600 mb-1">{post.tags.length}</div>
//             <div className="text-sm text-green-700">SEO Tags</div>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <div className="text-2xl font-bold text-purple-600 mb-1">{Math.ceil(post.content.length / 500)}</div>
//             <div className="text-sm text-purple-700">Paragraphs</div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <button
//           onClick={onBackToContent}
//           className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Content
//         </button>

//         <button
//           onClick={handleProceedToSocial}
//           className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//         >
//           Create Social Media Posts
//           <ArrowRight className="w-5 h-5 ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// };

import { ArrowLeft, ArrowRight, Download, Eye, RotateCw, Sparkles } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { blogImage } from '../Services/imageGenerate';
import { BlogPost, GeneratedImage } from '../types';
import { Toast } from './Toast';

interface ImageGenerationProps {
  post: BlogPost;
  onBackToContent: () => void;
  onProceedToSocial: (image: GeneratedImage) => void;
}

export const ImageGeneration: React.FC<ImageGenerationProps> = ({
  post,
  onBackToContent,
  onProceedToSocial,
}) => {
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [progress, setProgress] = useState(0); // New state for progress

  // Generate image prompt based on blog post
  const generateImagePrompt = (customization?: string) => {
    const basePrompt = `Professional blog header image for "${post.content}". Modern, clean design with vibrant colours. High quality, digital art style, business-focused`;
    return customization ? `${basePrompt}. ${customization}` : basePrompt;
  };

  // Mock image generation
  const generateImage = () => {
    setLoading(true);
    setProgress(0); // Reset progress on new generation

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 10; // Simulate progress
      });
    }, 300);

    blogImage(post.content).then((imageUrl) => {
      clearInterval(interval); // Stop simulation on completion
      if (imageUrl) {
        setImage({ url: imageUrl });
      }
      setProgress(100); // Ensure progress is 100% on completion
      setLoading(false);
    }).catch(() => {
      clearInterval(interval); // Stop simulation on error
      setProgress(0); // Reset progress on error
      setLoading(false);
    });
  };

  const hasCalled = useRef(false);

  useEffect(() => {
    if (!hasCalled.current) {
      hasCalled.current = true;
      generateImage();
    }
  }, []);

  const handleRegenerateImage = () => {
    generateImage();
    setShowPromptEditor(false);
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = image?.url || '';
    link.download = `blog-image-${Date.now()}.png`;
    link.click();
  };

  const handleProceedToSocial = () => {
    if (image) {
      onProceedToSocial(image);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Featured Image...</h3>
          <p className="text-gray-600 mb-8">Generating a stunning visual that perfectly complements your blog post content.</p>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {progress === 0 && 'Initialising'}
            {progress > 0 && progress <= 25 && 'Designing Layout'}
            {progress > 25 && progress <= 50 && 'Rendering Elements'}
            {progress > 50 && progress <= 75 && 'Applying Effects'}
            {progress > 75 && progress < 100 && 'Optimising Image'}
            {progress === 100 && 'Created'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your featured image is ready!</h2>
        <p className="text-lg text-gray-600">Perfect visual to complement your blog post. Customise or proceed to create social media content.</p>
      </div>

      {/* Generated Image Display */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="relative w-full">
          <img
            src={image?.url}
            alt="Generated Blog Image"
            className="w-full max-w-full object-contain" // Changed to object-contain
            style={{ aspectRatio: 'auto' }} // Preserve natural aspect ratio
          />
          {/* Optional Gradient and Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-200">
              <span>{post.estimated_read_time} min read</span>
              <span>•</span>
              <span>{post.tags.join(', ')}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Featured Image</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPromptEditor(!showPromptEditor)}
                className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <Eye className="w-4 h-4 mr-1" />
                {showPromptEditor ? 'Hide' : 'View'} Prompt
              </button>
            </div>
          </div>

          {showPromptEditor && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customise Image Prompt
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm h-20 resize-none"
                placeholder="Add specific details: colours, style, objects, mood..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Current prompt: {generateImagePrompt(customPrompt)}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRegenerateImage}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RotateCw className="w-5 h-5 mr-2" />
              Generate New Image
            </button>

            <button
              onClick={handleDownloadImage}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Image
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post Summary */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-yellow-500" />
          Blog Post Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{post.estimated_read_time}</div>
            <div className="text-sm text-blue-700">Minutes to Read</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{post.tags.length}</div>
            <div className="text-sm text-green-700">SEO Tags</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{Math.ceil(post.content.length / 500)}</div>
            <div className="text-sm text-purple-700">Paragraphs</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBackToContent}
          className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Content
        </button>

        <button
          onClick={handleProceedToSocial}
          className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Create Social Media Posts
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
};