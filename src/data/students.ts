import { StudentUser } from '../types';

export const INITIAL_STUDENTS: StudentUser[] = [];

// Factory function for an authentic new student with zero fake progress
export const createAuthenticNewStudent = (details: Partial<StudentUser>): StudentUser => {
  return {
    id: `student-${Date.now()}`,
    name: details.name || '',
    email: details.email || '',
    avatarUrl: details.avatarUrl || '',
    college: details.college || '',
    degree: details.degree || '',
    academicYear: details.academicYear || '',
    careerGoal: details.careerGoal || 'Software Engineer',
    targetCompanyId: details.targetCompanyId || '',
    joinedDate: new Date().toISOString().split('T')[0],
    streakDays: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    totalStudyMinutes: 0,
    weeklyGoalMinutes: 300,
    solvedCodingCount: 0,
    solvedAptitudeCount: 0,
    completedProjectsCount: 0,
    completedAssessmentsCount: 0,
    selectedRoadmapId: null,
    enrolledCourseIds: [],
    isNewlyRegistered: true,
    badges: [],
    studyLogs: [],
    themeSettings: {
      accent: 'violet',
      background: 'obsidian',
      glow: 'vivid',
      density: 'comfortable',
    },
  };
};
