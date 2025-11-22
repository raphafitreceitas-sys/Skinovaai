export enum AppView {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  TRY_ON = 'TRY_ON',
  ANALYSIS = 'ANALYSIS',
  ROUTINES = 'ROUTINES',
  CONFIDENCE = 'CONFIDENCE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  PRODUCTS = 'PRODUCTS'
}

export interface UserProfile {
  name: string;
  skinType: string;
  skinTone: string;
  goals: string[];
  subscriptionStatus: 'free' | 'premium';
}

export interface RoutineStep {
  id: string;
  name: string;
  product: string;
  duration: string;
  completed: boolean;
  type: 'skincare' | 'makeup';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  shade: string;
  category: string;
  price: number;
  image: string;
  matchScore: number;
}

export interface ConfidenceMessage {
  id: string;
  text: string;
  category: 'beauty' | 'strength' | 'calm';
}