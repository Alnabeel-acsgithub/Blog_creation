export interface BlogInputs {
  websiteUrl: string;
  businessType: string;
  targetAudience: string;
  toneOfVoice: string;
}

export interface BlogIdea {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface BlogPost {
  title: string;
  content: string;
  estimatedReadTime: number;
  tags: string[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  alt: string;
}

export interface SocialMediaPost {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  hashtags: string[];
  characterCount: number;
}

export type Step = 'input' | 'ideas' | 'content' | 'image' | 'social' | 'preview';