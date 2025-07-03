// import { ArrowRight, Check, Copy, Lightbulb, RefreshCw, Plus, MessageSquare } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { fetchBlogIdeas } from '../Services/ContentIdeas';
// import { BlogIdea, BusinessContentPayload } from '../types';
// import { Toast } from './Toast';

// interface IdeaGenerationProps {
//   inputs: BusinessContentPayload;
//   onSelectIdea: (idea: BlogIdea) => void;
//   onRegenerateIdeas: () => void;
// }

// export const IdeaGeneration: React.FC<IdeaGenerationProps> = ({ inputs, onSelectIdea, onRegenerateIdeas }) => {
//   const [ideas, setIdeas] = useState<BlogIdea[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedId, setSelectedId] = useState<string>('');
//   const [copiedId, setCopiedId] = useState<string>('');
//   const [showCustomForm, setShowCustomForm] = useState(false);
//   const [commentMap, setCommentMap] = useState<{ [id: string]: string }>({});
//   const [customIdea, setCustomIdea] = useState({
//     title: '',
//     description: '',
//     keywords: '',
//   });
//   const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({ message: '', isVisible: false });

//   // Mock blog idea generation
//   const generateIdeas = () => {
//     setLoading(true);
//     fetchBlogIdeas(inputs)
//       .then((ideas) => {
//         setIdeas(ideas);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   };

//   useEffect(() => {
//     generateIdeas();
//   }, []);

//   const handleCopy = (title: string, id: string) => {
//     navigator.clipboard.writeText(title);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(''), 2000);
//   };

//   const handleCommentChange = (id: string, value: string) => {
//     setCommentMap(prev => ({ ...prev, [id]: value }));
//   };

//   const handleCommentSubmit = (idea: BlogIdea) => {
//     const comment = commentMap[idea.id] || '';
//     const ideaWithComment = { ...idea, comment }; // Send this to the next step
//     setSelectedId(idea.id);
//     setTimeout(() => {
//       onSelectIdea(ideaWithComment as BlogIdea & { comment?: string }); // temporarily allow it
//     }, 300);
//   };

//   const handleSelect = (idea: BlogIdea) => {
//     setSelectedId(idea.id);
//     setTimeout(() => {
//       onSelectIdea(idea);
//     }, 300);
//   };

//   const handleRegenerate = () => {
//     onRegenerateIdeas();
//     generateIdeas();
//   };

//   const handleCustomIdeaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setCustomIdea((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCustomIdeaSubmit = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!customIdea.title || !customIdea.description || !customIdea.keywords) {
//       setToast({ message: 'Please fill in all fields to proceed.', isVisible: true });
//       return;
//     }

//     const newIdea: BlogIdea = {
//       id: `custom-${Date.now()}`,
//       title: customIdea.title,
//       description: customIdea.description,
//       keywords: customIdea.keywords.split(',').map((k) => k.trim()).filter((k) => k),
//     };

//     setIdeas([...ideas, newIdea]);
//     setCustomIdea({ title: '', description: '', keywords: '' });
//     setShowCustomForm(false);
//     setSelectedId(newIdea.id);
//     setTimeout(() => {
//       onSelectIdea(newIdea);
//     }, 300);
//   };

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto text-center">
//         <div className="bg-white rounded-2xl shadow-xl p-12">
//           <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">Generating Creative Ideas...</h3>
//           <p className="text-gray-600">Analyzing your business context and target audience to create compelling blog topics.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Blog Topic</h2>
//         <p className="text-lg text-gray-600">Select an idea that resonates with your audience, or regenerate for fresh options.</p>
//       </div>

//       <div className="mb-6 text-center space-x-4">
//         <button
//           onClick={handleRegenerate}
//           className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
//         >
//           <RefreshCw className="w-5 h-5 mr-2" />
//           Regenerate Ideas
//         </button>
//         {!showCustomForm && (
//           <button
//             onClick={() => setShowCustomForm(true)}
//             className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Add Your Own Idea
//           </button>
//         )}
//       </div>

//       {showCustomForm && (
//         <div className="mb-6 bg-white rounded-2xl shadow-lg p-6">
//           <h3 className="text-lg font-bold text-gray-900 mb-4">Add Your Custom Idea</h3>
//           <div className="space-y-4">
//             <div>
//               {/* <label className="block text-sm font-medium text-gray-700 mb-1">Title</label> */}
//               Title <span className="text-red-500">*</span>
//               <input
//                 type="text"
//                 name="title"
//                 value={customIdea.title}
//                 onChange={handleCustomIdeaChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your title"
//               />
//             </div>
//             <div>
//               {/* <label className="block text-sm font-medium text-gray-700 mb-1">Description</label> */}
//               Description <span className="text-red-500">*</span>
//               <textarea
//                 name="description"
//                 value={customIdea.description}
//                 onChange={handleCustomIdeaChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 rows={4}
//                 placeholder="Describe your idea"
//               />
//             </div>
//             <div>
//               {/* <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma-separated)</label> */}
//               Keywords (comma-separated) <span className="text-red-500">*</span>
//               <input
//                 type="text"
//                 name="keywords"
//                 value={customIdea.keywords}
//                 onChange={handleCustomIdeaChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., marketing, technology, trends"
//               />
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowCustomForm(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCustomIdeaSubmit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
//               >
//                 Add and Proceed
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Toast
//         message={toast.message}
//         isVisible={toast.isVisible}
//         onClose={() => setToast({ message: '', isVisible: false })}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {ideas.map((idea) => (
//           <div
//             key={idea.id}
//             className={`
//               bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group relative
//               flex flex-col h-full
//               ${selectedId === idea.id ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:transform hover:-translate-y-1'}
//             `}
//             onClick={() => handleSelect(idea)}
//           >
//             {/* Header with Icon and Copy Button */}
//             <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
//               <div className="flex items-center">
//                 <div className="p-2 bg-yellow-100 rounded-lg">
//                   <Lightbulb className="w-5 h-5 text-yellow-600" />
//                 </div>
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleCopy(idea.title, idea.id);
//                 }}
//                 className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                 title="Copy title"
//               >
//                 {copiedId === idea.id ? (
//                   <Check className="w-4 h-4 text-green-500" />
//                 ) : (
//                   <Copy className="w-4 h-4" />
//                 )}
//               </button>
//             </div>

//             {/* Content - Flexible area */}
//             <div className="px-6 flex-grow flex flex-col">
//               <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
//                 {idea.title}
//               </h3>

//               <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
//                 {idea.description}
//               </p>

//               {/* Keywords */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {idea.keywords.map((keyword) => (
//                   <span
//                     key={keyword}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
//                   >
//                     {keyword}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Footer with Call to Action - Fixed at bottom */}
//             <div className="px-6 pb-6 flex-shrink-0">
//               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                 <span className="text-sm text-gray-500 font-medium">Click to select</span>
//                 <div className="flex items-center text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
//                   <ArrowRight className="w-4 h-4" />
//                 </div>
//               </div>
//             </div>

//             {/* Comments to Modify - Optional */}
//             <div className="px-6 pb-6">
//               <details className="group" onClick={(e) => e.stopPropagation()}>
//                 <summary
//                   className="text-sm font-medium text-gray-600 cursor-pointer flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
//                   onClick={(e) => e.stopPropagation()}
//                   aria-label="Add comments to modify this idea"
//                 >
//                   <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full">
//                     <MessageSquare className="w-4 h-4" />
//                   </span>
//                   <span>Content revision input (Optional)</span>
//                 </summary>

//                 <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//                   <textarea
//                     onClick={(e) => e.stopPropagation()}
//                     onChange={(e) => handleCommentChange(idea.id, e.target.value)}
//                     value={commentMap[idea.id] || ''}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white"
//                     placeholder="Add your comments here..."
//                     rows={3}
//                   />
//                   <div className="flex justify-end mt-3">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleCommentSubmit(idea);
//                       }}
//                       className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
//                     >
//                       Submit & Proceed
//                     </button>
//                   </div>
//                 </div>
//               </details>
//             </div>

//             {/* Selection Indicator */}
//             {selectedId === idea.id && (
//               <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-10">
//                 <Check className="w-4 h-4 text-white" />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { ArrowRight, Check, Copy, Lightbulb, RefreshCw, Plus, MessageSquare, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { fetchBlogIdeas } from '../Services/ContentIdeas';
import { BlogIdea, BusinessContentPayload } from '../types';
import { Toast } from './Toast';

interface IdeaGenerationProps {
  inputs: BusinessContentPayload;
  onSelectIdea: (idea: BlogIdea) => void;
  onRegenerateIdeas: () => void;
}

export const IdeaGeneration: React.FC<IdeaGenerationProps> = ({ inputs, onSelectIdea, onRegenerateIdeas }) => {
  const [ideas, setIdeas] = useState<BlogIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [commentMap, setCommentMap] = useState<{ [id: string]: string }>({});
  const [customIdea, setCustomIdea] = useState({
    title: '',
    description: '',
    keywords: '',
  });
  const [toast, setToast] = useState<{ message: string; isVisible: boolean }>({ message: '', isVisible: false });
  const [progress, setProgress] = useState(0); // New state for progress
  const [showCommentModal, setShowCommentModal] = useState<string | null>(null); // Track modal for specific idea

  // Mock blog idea generation
  const generateIdeas = () => {
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

    fetchBlogIdeas(inputs)
      .then((ideas) => {
        clearInterval(interval); // Stop simulation on completion
        setIdeas(ideas);
        setProgress(100); // Ensure progress is 100% on completion
        setLoading(false);
      })
      .catch(() => {
        clearInterval(interval); // Stop simulation on error
        setProgress(0); // Reset progress on error
        setLoading(false);
      });
  };

  const hasGeneratedIdeas = useRef(false);

  useEffect(() => {
    if (!hasGeneratedIdeas.current) {
      hasGeneratedIdeas.current = true;
      generateIdeas();
    }
  }, []);

  const handleCopy = (title: string, id: string) => {
    navigator.clipboard.writeText(title);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const handleCommentChange = (id: string, value: string) => {
    setCommentMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleCommentSubmit = (idea: BlogIdea) => {
    const comment = commentMap[idea.id] || '';
    const ideaWithComment = { ...idea, comment };
    setSelectedId(idea.id);
    setShowCommentModal(null); // Close modal
    setTimeout(() => {
      onSelectIdea(ideaWithComment as BlogIdea & { comment?: string });
    }, 300);
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

  const handleCustomIdeaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomIdea((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomIdeaSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!customIdea.title || !customIdea.description || !customIdea.keywords) {
      setToast({ message: 'Please fill in all fields to proceed.', isVisible: true });
      return;
    }

    const newIdea: BlogIdea = {
      id: `custom-${Date.now()}`,
      title: customIdea.title,
      description: customIdea.description,
      keywords: customIdea.keywords.split(',').map((k) => k.trim()).filter((k) => k),
    };

    setIdeas([...ideas, newIdea]);
    setCustomIdea({ title: '', description: '', keywords: '' });
    setShowCustomForm(false);
    setSelectedId(newIdea.id);
    setTimeout(() => {
      onSelectIdea(newIdea);
    }, 300);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Generating content ideas...</h3>
          <p className="text-gray-600 mb-8">Brainstorming innovative and compelling content ideas tailored to your business.</p>
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {progress === 0 && 'Starting'}
            {progress > 0 && progress <= 25 && 'Brainstorming ideas'}
            {progress > 25 && progress <= 50 && 'Refining concepts'}
            {progress > 50 && progress <= 75 && 'Finalising ideas'}
            {progress > 75 && progress < 100 && 'Almost there!'}
            {progress === 100 && 'Ideas created'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your content topic</h2>
        <p className="text-lg text-gray-600">Select an idea that resonates with your audience, or regenerate for fresh options.</p>
      </div>

      <div className="mb-6 text-center space-x-4">
        <button
          onClick={handleRegenerate}
          className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Regenerate Ideas
        </button>
        {!showCustomForm && (
          <button
            onClick={() => setShowCustomForm(true)}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add your own Idea
          </button>
        )}
      </div>

      {showCustomForm && (
        <div className="mb-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Add your custom idea</h3>
          <div className="space-y-4">
            <div>
              Title <span className="text-red-500">*</span>
              <input
                type="text"
                name="title"
                value={customIdea.title}
                onChange={handleCustomIdeaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your title"
              />
            </div>
            <div>
              Description <span className="text-red-500">*</span>
              <textarea
                name="description"
                value={customIdea.description}
                onChange={handleCustomIdeaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Describe your idea"
              />
            </div>
            <div>
              Keywords (comma-separated) <span className="text-red-500">*</span>
              <input
                type="text"
                name="keywords"
                value={customIdea.keywords}
                onChange={handleCustomIdeaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., marketing, technology, trends"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCustomForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomIdeaSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Add and Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ message: '', isVisible: false })}
      />

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
              <div className="flex items-center">
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
              </button>
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCommentModal(idea.id); // Open modal for this idea
                  }}
                  className="text-sm font-medium text-gray-600 flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <span>Content revision input (Optional)</span>
                </button>
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

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 relative transition-all transform hover:scale-105">
            {/* Close Button */}
            <button
              onClick={() => setShowCommentModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add content revision input</h3>

            {/* Modal Content */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800">
                {ideas.find((idea) => idea.id === showCommentModal)?.title}
              </h4>
              <p className="text-sm text-gray-600">
                {ideas.find((idea) => idea.id === showCommentModal)?.description}
              </p>
            </div>

            {/* Textarea for Comments */}
            <textarea
              onChange={(e) => handleCommentChange(showCommentModal, e.target.value)}
              value={commentMap[showCommentModal] || ''}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 transition-all duration-300 ease-in-out"
              placeholder="Add your comments here..."
              rows={5}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-6 mt-6">
              <button
                onClick={() => setShowCommentModal(null)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 bg-gray-200 rounded-lg transition-colors duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCommentSubmit(ideas.find((idea) => idea.id === showCommentModal)!)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 ease-in-out"
              >
                Submit & proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};