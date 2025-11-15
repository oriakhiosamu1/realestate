// constants.js

export const PRIMARY_COLOR = '#4A90E2';
export const SECONDARY_COLOR = '#F9A825';
export const FONT_FAMILY = 'Inter, sans-serif';

// Default placeholder images
export const DEFAULT_HOUSE_IMAGE = 'https://placehold.co/300x200/e0e7ff/4A90E2?text=Property+Image';
export const DEFAULT_AGENT_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80';
export const DEFAULT_BLOG_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop';

// Empty templates for creation
export const EMPTY_HOUSE = { 
  title: '', 
  price: 0, 
  beds: 0, 
  baths: 0, 
  sqft: 0, 
  location: '', 
  imageUrl: '' 
};

export const EMPTY_AGENT = { 
  name: '', 
  email: '', 
  phone: '', 
  role: '', 
  location: '', 
  image: '' 
};

export const EMPTY_BLOG = { 
  title: '', 
  excerpt: '', 
  content: '', 
  author: '', 
  category: 'Buying Tips', 
  image: DEFAULT_BLOG_IMAGE,
  location: 'General',
  readTime: '5 min read'
};

export const BLOG_CATEGORIES = [
  'Buying Tips', 
  'Selling Tips', 
  'Market Insights', 
  'Investment', 
  'Financing', 
  'Luxury Homes'
];