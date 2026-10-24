import { CareerGoal, VerificationStatus } from './index';

export type ResourceType =
  | 'Study Notes'
  | 'Documentation'
  | 'Course'
  | 'Video'
  | 'Practice'
  | 'Quiz'
  | 'Lab'
  | 'Project'
  | 'Interview Questions'
  | 'Cheat Sheet';

export type ResourceDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LearningResource {
  id: string;
  skillId: string;
  topicId: string;
  title: string;
  type: ResourceType;
  description: string;
  url?: string;
  difficulty: ResourceDifficulty;
  language: string;
  estimatedDuration: string;
  prerequisiteIds?: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedDate?: string;
  isExternal: boolean;
  platformName?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CodeSnippet {
  language: string;
  code: string;
  output?: string;
  explanation?: string;
}

export interface TopicStudyNotes {
  definition: string;
  whyItMatters: string;
  coreConcepts: {
    heading: string;
    explanation: string;
    codeExample?: CodeSnippet;
  }[];
  stepByStepGuide?: string[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  practicalApplications: string[];
  summary: string;
  revisionChecklist: string[];
  complexityAnalysis?: {
    timeComplexity: string;
    spaceComplexity: string;
    notes: string;
  };
}

export interface TopicInterviewQuestion {
  id: string;
  question: string;
  companyTags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answerSummary: string;
  deepDive: string;
}

export interface TopicProject {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterSteps: string[];
  deliverable: string;
  techStack: string[];
}

export interface TopicLearningDetail {
  id: string;
  skillId: string;
  skillName: string;
  topicTitle: string;
  skillCategory: string;
  careerPaths: CareerGoal[];
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedMinutes: number;
  difficulty: ResourceDifficulty;
  studyNotes: TopicStudyNotes;
  resources: LearningResource[];
  quiz: QuizQuestion[];
  projects: TopicProject[];
  interviewQuestions: TopicInterviewQuestion[];
  nextTopicId?: string;
  prevTopicId?: string;
}

export interface StudentResourceData {
  bookmarkedResourceIds: string[];
  completedTopicIds: string[];
  quizScores: Record<string, number>; // topicId -> percentage score (0-100)
  lastVisitedTopicId: string | null;
  reviewedResourceIds: string[];
}
