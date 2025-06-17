export interface BlogInputs {
  website_url: string;
  business_type: string;
  target_audience: string;
  tone_of_voice: string;
}

export interface BlogPayload {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  website_url: string;
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
  estimated_read_time: number;
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