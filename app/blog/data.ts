export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

export const BLOG_POSTS: Record<string, BlogPost> = {};
