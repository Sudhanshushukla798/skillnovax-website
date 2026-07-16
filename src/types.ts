export interface SubService {
  name: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  subServices: string[];
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WaitlistSubmission {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  role: 'customer' | 'worker';
  interestedServices: string[];
  submittedAt: string;
}
