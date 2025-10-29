export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currentRole?: string;
  targetRole?: string;
  skills: string[];
  experienceYears: number;
}

export interface CompanyInfo {
  name: string;
  logo?: string;
  about: string;
  industry: string;
  founded: string;
  employees: string;
  headquarters: string;
  website?: string;
  culture: string[];
  benefits: string[];
  techStack?: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyInfo?: CompanyInfo;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  remote: boolean;
  description: string;
  requirements: string[];
  skills: string[];
  matchScore?: number;
  postedDate: Date;
}

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  status: 'draft' | 'submitted' | 'under-review' | 'interview' | 'offered' | 'rejected';
  appliedDate: Date;
  lastUpdated: Date;
  notes?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
  inDemand?: boolean;
}

export interface CareerNode {
  id: string;
  type: 'skill' | 'role' | 'company' | 'milestone';
  label: string;
  status: 'completed' | 'current' | 'target' | 'potential';
  data: any;
  position: { x: number; y: number };
}

export interface CareerPath {
  nodes: CareerNode[];
  edges: { from: string; to: string; label?: string }[];
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface MentorRequest {
  mentorId: string;
  mentorName: string;
  subject: string;
  message: string;
  preferredTime?: Date;
}
