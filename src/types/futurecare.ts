export type PlatformView =
  | 'overview'
  | 'mentorship'
  | 'workshops'
  | 'early-care'
  | 'network';

export type MentorTrack =
  | 'Executive Leadership'
  | 'STEM & Product'
  | 'Policy & Impact'
  | 'Return-to-Work';

export interface Mentor {
  id: string;
  name: string;
  role: string;
  organization: string;
  track: MentorTrack;
  location: string;
  experienceYears: number;
  promotedMentees: number;
  careCoveredSlots: boolean;
  availableSlots: string[];
  focusAreas: string[];
  bio: string;
  imageUrl?: string;
  initials: string;
}

export type WorkshopCategory =
  | 'Leadership'
  | 'STEM & Finance'
  | 'Early Empowerment (0–8)';

export interface Workshop {
  id: string;
  title: string;
  category: WorkshopCategory;
  facilitator: string;
  facilitatorRole: string;
  dateLabel: string;
  timeLabel: string;
  durationHours: number;
  format: 'Live Virtual' | 'Hybrid · Studio + Care' | 'In-Person · Care Included';
  careIncludedAges0to8: boolean;
  seatsTotal: number;
  seatsRemaining: number;
  summary: string;
  syllabus: string[];
}

export type AgeBracket = '0–2 Years' | '3–5 Years' | '6–8 Years';

export interface EarlyCarePlaybook {
  id: string;
  title: string;
  ageBracket: AgeBracket;
  domain: string;
  durationMinutes: number;
  caregiverOutcome: string;
  childOutcome: string;
  steps: string[];
  materials: string[];
}

export interface NetworkCircle {
  id: string;
  name: string;
  chapter: string;
  schedule: string;
  careSupport: string;
  memberCount: number;
  topicFocus: string;
  description: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  circleName: string;
  timestamp: string;
  content: string;
  repliesCount: number;
}

export interface MentorBooking {
  mentorId: string;
  mentorName: string;
  slot: string;
  goal: string;
  needsChildcare0to8: boolean;
  bookedAt: string;
}

export interface CohortApplication {
  fullName: string;
  email: string;
  currentRole: string;
  primaryTrack: MentorTrack;
  childAgeBracket: 'None' | AgeBracket;
  submittedAt: string;
}
