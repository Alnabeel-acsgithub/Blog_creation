export interface BusinessContentPayload {
  business_type: string;
  target_audience: string;
  tone_of_voice: string;
  website_url: string;
  [key: string]: unknown; // Optional: allows additional dynamic fields
}
export interface SocialMediaPayload {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  tone: 'professional' | 'casual' | 'friendly' | string; // You can customize or widen it
  target_audience: string;
  estimated_read_time: number; // in minutes
  business_type: string;
  [key: string]: unknown; // optional: allows flexibility for extra fields
}


// export interface BlogInputs {
//   website_url: string;
//   business_type: string;
//   target_audience: string;
//   tone_of_voice: string;
// }

export interface BlogInputs {
  company_name: string;
  website_url: string;
  our_website_url: string;
  target_audience: string;
  business_type: string;
  tone_of_voice: string;
  keywords: string[];
}


export interface BlogIdea {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

export interface BlogPayload {
  id: number;
  title: string;
  description: string;
  keywords: string[];
  website_url: string;
}

export interface BlogPost {
  title: string;
  content: string;
  estimated_read_time: number;
  tags: string[];
}

export interface PayloadImage{
  content : string
}
export interface GeneratedImage {
  url: string;
  // prompt: string;
  // alt: string;
}

export interface SocialMediaPost {
  platform: 'linkedin'| 'twitter'| 'facebook' | 'instagram';
  content: string;
  hashtags: string[];
  characterCount: number;
  imageUrl?: string;
}

export type Step = 'input' | 'ideas' | 'content' | 'image' | 'social' | 'preview';