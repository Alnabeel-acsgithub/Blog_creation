import React, { useState, useEffect, useRef } from 'react';
import {
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Hash,
  MessageCircle,
  Image as ImageIcon,
  Download,
  RotateCw,
  Loader2,
  X
} from 'lucide-react';
import { GeneratedImage, SocialMediaPayload, SocialMediaPost } from '../types';
import { socialMediaContent } from '../Services/socialMediaContent';
import { socialMediaImage1, socialMediaImage2, socialMediaImage3, socialMediaImage4 } from '../Services/generatePostImage ';

interface SocialMediaGenerationProps {
  post: SocialMediaPayload;
  image: GeneratedImage;
  onBackToImage: () => void;
  onProceedToPreview: (socialPosts: SocialMediaPost[], platformImages: PlatformImages) => void;
}

interface PlatformImage {
  url: string;
  prompt: string;
  alt: string;
  loading: boolean;
}

interface PlatformImages {
  [key: string]: PlatformImage | null;
}

const platformConfigs = {
  linkedin: {
    icon: Linkedin,
    name: 'LinkedIn',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    maxLength: 3000,
    bgColor: 'bg-blue-50',
    imageSize: '1200x627',
    imagePrompt: 'LinkedIn professional post image, corporate style, business-focused design',
  },
  twitter: {
    icon: X,
    name: 'Twitter/X',
    color: 'bg-black',
    hoverColor: 'hover:bg-gray-800',
    maxLength: 280,
    bgColor: 'bg-gray-50',
    imageSize: '1200x675',
    imagePrompt: 'Twitter header image, modern minimalist design, professional business theme',
  },
  facebook: {
    icon: Facebook,
    name: 'Facebook',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    maxLength: 63206,
    bgColor: 'bg-blue-50',
    imageSize: '1200x630',
    imagePrompt: 'Facebook post image, engaging and social, vibrant colors, community-focused',
  },
  instagram: {
    icon: Instagram,
    name: 'Instagram',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    maxLength: 2200,
    bgColor: 'bg-purple-50',
    imageSize: '1080x1080',
    imagePrompt: 'Instagram square post, aesthetic and visually appealing, modern design',
  },
};

export const SocialMediaGeneration: React.FC<SocialMediaGenerationProps> = ({
  post,
  image,
  onBackToImage,
  onProceedToPreview,
}) => {
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);
  const [platformImages, setPlatformImages] = useState<PlatformImages>({});
  const [loading, setLoading] = useState(true);
  const [copiedPlatform, setCopiedPlatform] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'twitter',]);
  const generatedPlatforms = useRef<Set<string>>(new Set());
  const generatingPlatforms = useRef<Set<string>>(new Set());

  // Generate social media posts
  const generateSocialPosts = async () => {
    setLoading(true);

    const posts: SocialMediaPost[] = await socialMediaContent(post)

    // Calculate character counts
    const updatedPosts = posts.map(socialPost => ({
      ...socialPost,
      characterCount: socialPost.content.length,
    }));

    setSocialPosts(updatedPosts);
    setLoading(false);

  };

  const platformOrder = ['linkedin', 'twitter', 'facebook', 'instagram'];  // LinkedIn comes first, Twitter second

  // Generate platform-specific image

  const generatePlatformImage = async (platform: string) => {
    if (generatingPlatforms.current.has(platform)) return;
    generatingPlatforms.current.add(platform);

    setPlatformImages(prev => ({
      ...prev,
      [platform]: { ...prev[platform], loading: true } as PlatformImage,
    }));

    let imageUrl;

    try {
      const url = { content: post.content, platform };
      if (platform === 'twitter') {
        imageUrl = await socialMediaImage1(url);
      } else if (platform === 'linkedin') {
        imageUrl = await socialMediaImage2(url);
      } else if (platform === 'facebook') {
        imageUrl = await socialMediaImage3(url);
      } else if (platform === 'instagram') {
        imageUrl = await socialMediaImage4(url);
      }

      const config = platformConfigs[platform];

      const generatedImage: PlatformImage = {
        url: imageUrl ?? '',
        prompt: `${config.imagePrompt} for "${post.title}". ${config.imageSize} dimensions.`,
        alt: `${config.name} image for ${post.title}`,
        loading: false,
      };

      setPlatformImages(prev => ({
        ...prev,
        [platform]: generatedImage,
      }));
    } finally {
      generatingPlatforms.current.delete(platform); // Clean up
    }
  };

  // Auto-generate images for selected platforms
  useEffect(() => {
    if (!loading && selectedPlatforms.length > 0) {
      selectedPlatforms.forEach(platform => {
        if (!generatedPlatforms.current.has(platform)) {
          generatedPlatforms.current.add(platform);
          generatePlatformImage(platform);
        }
      });
    }
  }, [loading, selectedPlatforms]);


  const hasGeneratedPosts = useRef(false);

  useEffect(() => {
    if (!hasGeneratedPosts.current) {
      hasGeneratedPosts.current = true;
      generateSocialPosts();
    }
  }, []);

  const handleCopyPost = (platform: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(''), 2000);
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => {
      const newSelection = prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform];

      // Generate image for newly selected platform
      if (!prev.includes(platform) && !platformImages[platform]) {
        generatePlatformImage(platform);
      }

      return newSelection;
    });
  };

  const handleUpdatePost = (platform: string, newContent: string) => {
    setSocialPosts(prev => prev.map(post =>
      post.platform === platform
        ? { ...post, content: newContent, characterCount: newContent.length }
        : post
    ));
  };

  const handleDownloadImage = (platform: string) => {
    const platformImage = platformImages[platform];
    if (platformImage && !platformImage.loading) {
      const link = document.createElement('a');
      link.href = platformImage.url;
      link.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${platform}_image.jpg`;
      link.click();
    }
  };

  const handleRegenerateImage = (platform: string) => {
    generatePlatformImage(platform);
  };

  const handleProceed = () => {
    const selectedSocialPosts = socialPosts
      .filter(post => selectedPlatforms.includes(post.platform))
      .map(post => ({
        ...post,
        imageUrl: platformImages[post.platform]?.url || '', // ✅ Inject image
      }));

    onProceedToPreview(selectedSocialPosts, platformImages); // Optional if platformImages is no longer needed separately
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Creating social media posts...</h3>
            <p className="text-gray-600">Generating engaging content optimised for each platform.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Social media content ready!</h2>
        <p className="text-lg text-gray-600">Customise your posts and images for each platform, then select which ones to include in your campaign.</p>
      </div>

      {/* Platform Selection */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
          Select Platforms
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          { Object.entries(platformConfigs).map(([platform, config]) => {
            const Icon = config.icon;
            const isSelected = selectedPlatforms.includes(platform);

            return (
              <button
                key={platform}
                onClick={() => handlePlatformToggle(platform)}
                className={`
                  flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }
                `}
              >
                <Icon className="w-6 h-6 mr-2" />
                <span className="font-medium">{config.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Social Media Posts with Images */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {socialPosts
          .sort((a, b) => {
            // Sort posts based on platform order
            const platformAIndex = platformOrder.indexOf(a.platform);
            const platformBIndex = platformOrder.indexOf(b.platform);
            return platformAIndex - platformBIndex;
          })
          .map((socialPost) => {
            const config = platformConfigs[socialPost.platform];
            const Icon = config.icon;
            const isSelected = selectedPlatforms.includes(socialPost.platform);
            const isOverLimit = socialPost.characterCount > config.maxLength;
            const platformImage = platformImages[socialPost.platform];


          return (
            <div
              key={socialPost.platform}
              className={`
                bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-200
                ${isSelected ? 'ring-2 ring-blue-500' : 'opacity-60'}
              `}
            >
              <div className={`${config.color} px-6 py-4 text-white flex items-center justify-between`}>
                <div className="flex items-center">
                  <Icon className="w-6 h-6 mr-3" />
                  <h4 className="text-lg font-semibold">{config.name}</h4>
                </div>
                <button
                  onClick={() => handleCopyPost(socialPost.platform, socialPost.content)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  {copiedPlatform === socialPost.platform ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Platform Image Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-gray-900 flex items-center">
                      <ImageIcon className="w-5 h-5 mr-2 text-gray-600" />
                      Platform Image ({config.imageSize})
                    </h5>
                    {platformImage && !platformImage.loading && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownloadImage(socialPost.platform)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Download Image"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRegenerateImage(socialPost.platform)}
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                          title="Regenerate Image"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    {platformImage?.loading ? (
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Generating image...</p>
                        </div>
                      </div>
                    ) : platformImage ? (
                      <div className="relative group">
                        <img
                          src={platformImage.url}
                          alt={platformImage.alt}
                          className="w-full aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDownloadImage(socialPost.platform)}
                              className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-lg transition-all duration-200 shadow-lg"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRegenerateImage(socialPost.platform)}
                              className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-lg transition-all duration-200 shadow-lg"
                            >
                              <RotateCw className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      ) : isSelected && !platformImage?(
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Generating image...</p>
                            </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Select platform to generate image</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content Section */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900">Post Content</h5>
                  <textarea
                    value={socialPost.content}
                    onChange={(e) => handleUpdatePost(socialPost.platform, e.target.value)}
                    className={`
                      w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${config.bgColor}
                      ${isOverLimit ? 'border-red-300' : 'border-gray-300'}
                    `}
                    placeholder={`Write your ${config.name} post...`}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                        {socialPost.characterCount}/{config.maxLength}
                      </span>
                      {isOverLimit && (
                        <span className="text-xs text-red-600 font-medium">Over limit!</span>
                      )}
                    </div>

                    <div className="flex items-center">
                      <Hash className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{socialPost.hashtags.length} tags</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {socialPost.hashtags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {socialPost.hashtags.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{socialPost.hashtags.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={onBackToImage}
          className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Image
        </button>

        <button
          onClick={handleProceed}
          disabled={selectedPlatforms.length === 0}
          className={`
            flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
            ${selectedPlatforms.length > 0
              ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }
          `}
        >
          Preview & Post
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};