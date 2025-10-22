import { PatientCase, PGOpinion, DoctorRating } from '@/types';

export const mockDoctorRatings: DoctorRating[] = [
  {
    id: 'r1',
    doctorId: 'd1',
    doctorName: 'Dr. Sarah Johnson',
    hospitalName: 'City General Hospital',
    rating: 9,
    feedback: 'Excellent analysis and attention to detail',
    timestamp: '2025-10-18T10:30:00Z',
  },
  {
    id: 'r2',
    doctorId: 'd2',
    doctorName: 'Dr. Michael Chen',
    hospitalName: 'Metropolitan Medical Center',
    rating: 8,
    feedback: 'Good interpretation, consider differential diagnosis',
    timestamp: '2025-10-18T14:20:00Z',
  },
];

export const mockPGOpinions: PGOpinion[] = [
  {
    id: 'op1',
    studentId: 'pg1',
    studentName: 'PG Student #3847',
    opinion: 'Based on the lab results and imaging, this appears to be a case of acute appendicitis. The elevated WBC count (15,000/μL) and CT findings of appendiceal wall thickening strongly support this diagnosis. Recommend immediate surgical consultation and preoperative antibiotics. Patient should be kept NPO and monitored closely for signs of perforation.',
    timestamp: '2025-10-17T16:45:00Z',
    ratings: mockDoctorRatings,
    averageRating: 8.5,
  },
];

export const mockPatientCases: PatientCase[] = [
  {
    id: 'case1',
    caseId: 'PC-2025-1847',
    uploadDate: '2025-10-17T09:00:00Z',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    status: 'urgent',
    aiAnalysis: {
      severity: 'high',
      warning: '⚠️ URGENT: AI Analysis detected potential acute appendicitis. Immediate medical attention required.',
      recommendations: [
        'Seek immediate medical attention',
        'Do not eat or drink anything',
        'Monitor for increased pain or fever',
        'Have someone available to take you to emergency if symptoms worsen',
      ],
      detectedConditions: ['Acute Appendicitis (High Probability)', 'Elevated WBC Count', 'Peritoneal Inflammation'],
    },
    reports: [
      {
        id: 'rep1',
        type: 'Complete Blood Count (CBC)',
        uploadDate: '2025-10-17T09:00:00Z',
      },
      {
        id: 'rep2',
        type: 'CT Abdomen with Contrast',
        uploadDate: '2025-10-17T10:30:00Z',
      },
    ],
    pgOpinions: mockPGOpinions,
    medications: [
      {
        id: 'med1',
        name: 'Cefazolin',
        dosage: '1g IV',
        frequency: 'Every 8 hours',
        time: ['08:00', '16:00', '00:00'],
        startDate: '2025-10-18T08:00:00Z',
        taken: false,
      },
    ],
  },
  {
    id: 'case2',
    caseId: 'PC-2025-2193',
    uploadDate: '2025-10-15T14:20:00Z',
    hospitalId: 'h2',
    hospitalName: 'Metropolitan Medical Center',
    status: 'reviewed',
    aiAnalysis: {
      severity: 'low',
      recommendations: [
        'Continue current medication regimen',
        'Follow up with primary care physician in 2 weeks',
        'Maintain healthy diet and exercise routine',
      ],
      detectedConditions: ['Seasonal Allergies', 'Mild Rhinitis'],
    },
    reports: [
      {
        id: 'rep3',
        type: 'Allergy Panel',
        uploadDate: '2025-10-15T14:20:00Z',
      },
    ],
    pgOpinions: [],
  },
];

export const mockPendingReviewCases: PatientCase[] = [
  {
    id: 'case3',
    caseId: 'PC-2025-2894',
    uploadDate: '2025-10-20T11:15:00Z',
    hospitalId: 'h1',
    hospitalName: 'City General Hospital',
    status: 'pending',
    aiAnalysis: {
      severity: 'medium',
      recommendations: ['Further evaluation recommended', 'Monitor symptoms closely'],
      detectedConditions: ['Possible Gastritis', 'Elevated Liver Enzymes'],
    },
    reports: [
      {
        id: 'rep4',
        type: 'Liver Function Test',
        uploadDate: '2025-10-20T11:15:00Z',
      },
      {
        id: 'rep5',
        type: 'Upper GI Endoscopy Report',
        uploadDate: '2025-10-20T13:00:00Z',
      },
    ],
    pgOpinions: [],
  },
  {
    id: 'case4',
    caseId: 'PC-2025-3012',
    uploadDate: '2025-10-21T08:30:00Z',
    hospitalId: 'h3',
    hospitalName: 'University Hospital',
    status: 'pending',
    aiAnalysis: {
      severity: 'medium',
      recommendations: ['Cardiology consultation recommended', 'Continue monitoring blood pressure'],
      detectedConditions: ['Borderline Hypertension', 'Mild Left Ventricular Hypertrophy'],
    },
    reports: [
      {
        id: 'rep6',
        type: 'ECG',
        uploadDate: '2025-10-21T08:30:00Z',
      },
      {
        id: 'rep7',
        type: 'Echocardiogram',
        uploadDate: '2025-10-21T09:45:00Z',
      },
    ],
    pgOpinions: [],
  },
];
