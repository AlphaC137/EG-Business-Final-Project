export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Seasonal Growing Guide: Spring Vegetables',
    excerpt: 'Learn the best practices for growing spring vegetables and maximize your yield.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    category: 'seasonal',
    date: 'March 15, 2024',
    author: 'Emma Thompson',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Sustainable Pest Control Methods',
    excerpt: 'Natural and effective ways to protect your crops from pests without harmful chemicals.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1599940778173-e276d4acb2bb?auto=format&fit=crop&w=800&q=80',
    category: 'sustainable',
    date: 'March 12, 2024',
    author: 'David Chen',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Success Story: Urban Rooftop Garden',
    excerpt: 'How one community transformed an empty rooftop into a thriving garden.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
    category: 'community',
    date: 'March 10, 2024',
    author: 'Sarah Johnson',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Water Conservation Techniques',
    excerpt: 'Smart irrigation methods to reduce water usage while maintaining crop health.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    category: 'sustainable',
    date: 'March 8, 2024',
    author: 'Michael Brown',
    readTime: '8 min read'
  },
  {
    id: '5',
    title: 'Summer Crop Planning',
    excerpt: 'Strategic planning for a successful summer growing season.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1595228702420-b3640fd88620?auto=format&fit=crop&w=800&q=80',
    category: 'seasonal',
    date: 'March 5, 2024',
    author: 'Lisa Anderson',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'Building a Community Garden',
    excerpt: 'Step-by-step guide to starting and managing a successful community garden.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=800&q=80',
    category: 'community',
    date: 'March 3, 2024',
    author: 'James Wilson',
    readTime: '10 min read'
  }
];