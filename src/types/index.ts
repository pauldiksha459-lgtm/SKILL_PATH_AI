export type CareerGoal =
  | 'Software Engineer'
  | 'AI/ML Engineer'
  | 'Data Scientist'
  | 'Data Analyst'
  | 'Cybersecurity Analyst or Engineer'
  | 'Cloud Engineer'
  | 'DevOps Engineer'
  | 'Full-Stack Developer'
  | 'Mobile Application Developer'
  | 'Other technical role';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ProgrammingLanguage = 'Python' | 'Java' | 'C++' | 'JavaScript' | 'Go';

export type VerificationStatus = 'VERIFIED_OFFICIAL' | 'HISTORICALLY_REPORTED' | 'AI_ESTIMATED';

export interface HiringStage {
  id: string;
  stageNumber: number;
  name: string;
  purpose: string;
  verificationStatus: VerificationStatus;
  sourceUrl: string;
  sourceDate: string;
  topicsCovered: string[];
  exampleQuestions: {
    question: string;
    type: 'Coding' | 'Aptitude' | 'Technical' | 'Behavioral' | 'System Design';
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }[];
  recommendedModules: string[];
  completionChecklist: {
    id: string;
    label: string;
    completed: boolean;
  }[];
  mockTestAvailable: boolean;
  studentPerformanceScore?: number;
}

export interface RecruitmentProgram {
  id: string;
  name: string;
  targetAudience: string;
  eligibility: string;
  overview: string;
  sourceUrl: string;
}

export type IndustryCategory =
  | 'All Companies'
  | 'Product Companies'
  | 'IT Services'
  | 'Consulting'
  | 'AI and Data'
  | 'Cloud and Enterprise Software';

export interface CompanyProfile {
  id: string;
  name: string;
  category: 'Big Tech' | 'Product Tech' | 'Enterprise / Cloud' | 'IT Services' | 'Consulting';
  industryCategory: 'Product Companies' | 'IT Services' | 'Consulting' | 'AI and Data' | 'Cloud and Enterprise Software';
  logoColor: string;
  logoBg?: 'light' | 'dark' | 'transparent';
  tagline: string;
  headquarters: string;
  officialCareersUrl: string;
  earlyCareerUrl: string;
  lastVerifiedDate: string;
  isOfficialVerified: boolean;
  supportedRoles: CareerGoal[];
  hiringPrograms: RecruitmentProgram[];
  hiringStages: HiringStage[];
  packageInsights: {
    internshipStipendPerMonth: string;
    fullTimeCTCLPA: string;
    locationInIndia: string[];
  };
  competencyWeights: {
    dsa: number;
    aptitude: number;
    systemDesign: number;
    coreCS: number;
    behavioral: number;
    projects: number;
  };
  officialInterviewTips: string[];
  disclaimer: string;
}

export type CompetencyStatus = 'DEMONSTRATED' | 'PARTIALLY_DEVELOPED' | 'MISSING' | 'NOT_ASSESSED';

export interface Competency {
  id: string;
  name: string;
  category: 'DSA' | 'Aptitude' | 'Language' | 'Core CS' | 'System Design' | 'AI/ML' | 'Behavioral' | 'Development';
  importanceForRole: 'Critical' | 'High' | 'Medium' | 'Foundational';
  requiredProficiency: number; // 0-100
  assessedProficiency: number; // 0-100
  status: CompetencyStatus;
  evidenceSource: 'Assessment Quiz' | 'Coding Task' | 'Verified Project' | 'Self Diagnostic' | 'None';
  prerequisites: string[];
  recommendedNextAction: string;
  learningResources: {
    title: string;
    type: 'Official Doc' | 'Interactive' | 'Practice Set' | 'Video Guide';
    duration: string;
    url?: string;
  }[];
  companiesRequiring: string[];
}

export interface RoadmapTopic {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  estimatedMinutes: number;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedHours: number;
  order: number;
  competencyIds: string[];
  topics: RoadmapTopic[];
  isCompleted: boolean;
  applicableCompanies: string[]; // empty means universal
  applicableRoles: CareerGoal[];
}

export interface PracticeChallenge {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags: string[];
  roleTags: CareerGoal[];
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: Record<ProgrammingLanguage, string>;
  solutionCode: Record<ProgrammingLanguage, string>;
  testCases: {
    input: string;
    expectedOutput: string;
  }[];
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
}

export interface AptitudeQuestion {
  id: string;
  category: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability' | 'Technical MCQ';
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  companyTags: string[];
}

export interface InterviewSchedule {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  roundName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: 'Upcoming' | 'Completed' | 'Shortlisted' | 'Offer Received' | 'Archived';
  applicationPortalUrl?: string;
  notes: string;
  preparationChecklist: {
    task: string;
    done: boolean;
  }[];
}

export interface UserProfile {
  name: string;
  degree: string;
  academicYear: string;
  careerGoal: CareerGoal;
  targetCompanyId: string;
  additionalCompanyIds: string[];
  intendedJobRole: string;
  recruitmentProgramId?: string;
  currentLevel: ExperienceLevel;
  preferredLanguage: ProgrammingLanguage;
  dailyStudyTimeHours: number;
  targetDate: string;
  customJobDescription?: string;
}

export type ThemeAccent = 'violet' | 'cyan' | 'emerald' | 'amber' | 'rose';
export type ThemeBackground = 'obsidian' | 'midnight' | 'pure-black';
export type ThemeGlow = 'subtle' | 'vivid' | 'off';
export type ThemeDensity = 'comfortable' | 'compact';

export interface StudentThemeSettings {
  accent: ThemeAccent;
  background: ThemeBackground;
  glow: ThemeGlow;
  density: ThemeDensity;
}

export interface StudentBadge {
  id: string;
  title: string;
  description: string;
  category: 'Milestone' | 'Skill' | 'Placement' | 'Consistency';
  icon: string;
  unlockedAt: string;
}

export interface StudyLogEntry {
  id: string;
  date: string;
  minutes: number;
  topicName: string;
  category: string;
  notes?: string;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  college: string;
  degree: string;
  academicYear: string;
  careerGoal: CareerGoal;
  targetCompanyId: string;
  joinedDate: string;
  streakDays: number;
  lastActiveDate: string;
  totalStudyMinutes: number;
  weeklyGoalMinutes: number;
  solvedCodingCount: number;
  solvedAptitudeCount: number;
  badges: StudentBadge[];
  studyLogs: StudyLogEntry[];
  themeSettings: StudentThemeSettings;
  // Authentic student tracking fields
  selectedRoadmapId?: string | null;
  enrolledCourseIds?: string[];
  completedProjectsCount?: number;
  completedAssessmentsCount?: number;
  isNewlyRegistered?: boolean;
}


