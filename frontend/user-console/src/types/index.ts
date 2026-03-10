export type MovieType = 'free' | 'premium' | 'rental';
export type QualityType = '4K' | 'Full HD' | 'HD';

export interface Episode {
  id: string | number;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface Movie {
  id: string | number;
  title: string;
  description: string;
  tagline?: string;
  image: string;
  poster?: string;
  rating: number;
  matchScore?: number; // AI Match Score %
  year: number;
  duration: string;
  quality: QualityType;
  type: MovieType;
  genres: string[];
  director?: string;
  cast?: Actor[];
  price?: string;
  isSeries?: boolean;
  seasons?: Season[];
}

export interface Actor {
  name: string;
  role: string;
  image: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  membership: 'free' | 'premium' | 'cinema';
  joinedAt: string;
}

export interface Notification {
  id: string | number;
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
