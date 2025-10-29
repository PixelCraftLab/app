export type UserRole = 'patient' | 'hospital_authority' | 'hospital_doctor' | 'pg_student' | null;

export interface User {
  id: string;
  role: UserRole;
  email: string;
  name?: string;
  hospitalName?: string;
  studentId?: string;
  verified?: boolean;
  universityProofUrl?: string;
  universityProofVerified?: boolean;
  idCardUrl?: string;
  idCardVerified?: boolean;
  creditScore?: number;
}

export interface PatientCase {
  id: string;
  caseId: string;
  uploadDate: string;
  hospitalId: string;
  hospitalName: string;
  status: 'pending' | 'under_review' | 'reviewed' | 'urgent';
  aiAnalysis?: {
    severity: 'low' | 'medium' | 'high' | 'critical';
    warning?: string;
    recommendations: string[];
    detectedConditions: string[];
  };
  reports: {
    id: string;
    type: string;
    uploadDate: string;
    url?: string;
  }[];
  pgOpinions: PGOpinion[];
  medications?: Medication[];
}

export interface PGOpinion {
  id: string;
  studentId: string;
  studentName: string;
  opinion: string;
  timestamp: string;
  ratings: DoctorRating[];
  averageRating?: number;
  flagged?: boolean;
  aiDetected?: boolean;
}

export interface DoctorRating {
  id: string;
  doctorId: string;
  doctorName: string;
  hospitalName: string;
  rating: number;
  feedback?: string;
  timestamp: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  endDate?: string;
  taken: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
