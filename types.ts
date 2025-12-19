export type Language = 'pt' | 'en' | 'es';

export type CategoryType = 'wisdom' | 'life_fate' | 'art_truth' | 'morality_critique';

export interface Poem {
  id: number;
  title: Record<Language, string>;
  content: Record<Language, string>;
  originalGerman: string;
  category: CategoryType;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export type ViewState = 'home' | 'blog' | 'register';