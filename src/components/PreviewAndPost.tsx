import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  RefreshCw,
  Share2,
  Tag,
  Twitter
} from 'lucide-react';
import React, { useState } from 'react';
import { BlogPost, GeneratedImage, SocialMediaPost } from '../types';

interface PreviewAndPostProps {
  post: BlogPost;
  image: GeneratedImage;
  socialPosts: SocialMediaPost[];
  onStartOver: () => void;
}

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

const platformColors = {
  twitter: 'bg-black',
  linkedin: 'bg-blue-600',
  facebook: 'bg-blue-500',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
};

export const PreviewAndPost: React.FC<PreviewAndPostProps> = ({
  post,
  image,
  socialPosts,
  onStartOver,
}) => {
  const [activeTab, setActiveTab] = useState<'blog' | 'social'>('blog');
  const [postedPlatforms, setPostedPlatforms] = useState<string[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<{[key: string]: string}>({});

  const handlePostToSocial = (platform: string) => {
    // Simulate posting to social media
    setTimeout(() => {
      setPostedPlatforms(prev => [...prev, platform]);
    }, 1000);
  };

  const handleSchedulePost = (platform: string, datetime: string) => {
    setScheduledPosts(prev => ({ ...prev, [platform]: datetime }));
  };

  const handleDownloadBlog = () => {
    const blogContent = `# ${post.title}\n\n${post.content}`;
    const blob = new Blob([blogContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_featured_image.jpg`;
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Preview & Publishing</h2>
        <p className="text-lg text-gray-600">Review your complete content package and publish to your chosen platforms.</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-xl mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('blog')}
              className={`
                flex-1 py-4 px-6 text-center font-medium transition-colors duration-200
                ${activeTab === 'blog' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <Eye className="w-5 h-5 inline mr-2" />
              Blog Preview
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`
                flex-1 py-4 px-6 text-center font-medium transition-colors duration-200
                ${activeTab === 'social' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <Share2 className="w-5 h-5 inline mr-2" />
              Social Media Posts ({socialPosts.length})
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'blog' && (
            <div className="space-y-8">
              {/* Blog Post Preview */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
                    <div className="flex items-center space-x-6 text-sm text-gray-200">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{post.estimated_read_time} min read</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        <span>{post.tags.join(', ')}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        <span>Published Today</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.substring(0, 500).replace(/\n/g, '<br>').replace(/#{1,6}\s+(.+)/g, (match, p1) => {
                        const level = match.match(/^#+/)[0].length;
                        return `<h${level} class="font-bold text-gray-900 mt-6 mb-3">${p1}</h${level}>`;
                      }) + '...'
                    }}
                  />
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      This is a preview of your blog post. The full content contains {Math.ceil(post.content.length / 500)} paragraphs and approximately {post.content.split(' ').length} words.
                    </p>
                  </div>
                </div>
              </div>

              {/* Blog Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownloadBlog}
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Blog Post
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
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              {socialPosts.map((socialPost) => {
                const Icon = platformIcons[socialPost.platform];
                const isPosted = postedPlatforms.includes(socialPost.platform);
                const isScheduled = scheduledPosts[socialPost.platform];
                
                return (
                  <div key={socialPost.platform} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${platformColors[socialPost.platform]} text-white mr-3`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 capitalize">{socialPost.platform}</h4>
                          <p className="text-sm text-gray-600">{socialPost.characterCount} characters</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isPosted ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            <span className="text-sm font-medium">Posted</span>
                          </div>
                        ) : isScheduled ? (
                          <div className="flex items-center text-blue-600">
                            <Calendar className="w-5 h-5 mr-1" />
                            <span className="text-sm font-medium">Scheduled</span>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <input
                              type="datetime-local"
                              onChange={(e) => handleSchedulePost(socialPost.platform, e.target.value)}
                              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => handlePostToSocial(socialPost.platform)}
                              className={`
                                px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-200
                                ${platformColors[socialPost.platform]} hover:opacity-90
                              `}
                            >
                              Post Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-800 whitespace-pre-wrap">{socialPost.content}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {socialPost.hashtags.slice(0, 8).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Content Package Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
            <div className="text-sm text-blue-700">Blog Post</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">1</div>
            <div className="text-sm text-green-700">Featured Image</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">{socialPosts.length}</div>
            <div className="text-sm text-purple-700">Social Posts</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-1">{postedPlatforms.length}</div>
            <div className="text-sm text-orange-700">Published</div>
          </div>
        </div>
      </div>

      {/* Final Actions */}
      <div className="text-center">
        <button
          onClick={onStartOver}
          className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Create Another Content Package
        </button>
      </div>
    </div>
  );
};