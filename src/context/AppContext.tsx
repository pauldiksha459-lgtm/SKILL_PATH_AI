import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  UserProfile,
  CompanyProfile,
  Competency,
  RoadmapModule,
  InterviewSchedule,
  CareerGoal,
  ProgrammingLanguage,
  ExperienceLevel,
  StudentUser,
  StudentThemeSettings,
  StudyLogEntry,
} from '../types';
import { COMPANIES_DATA } from '../data/companies';
import { INITIAL_COMPETENCIES, getStudentCompetencies, getCleanCompetencies } from '../data/competencies';
import { ROADMAP_MODULES, getStudentRoadmaps, getCleanRoadmaps } from '../data/roadmaps';
import { INITIAL_STUDENTS, createAuthenticNewStudent } from '../data/students';

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  activeCompany: CompanyProfile;
  setTargetCompany: (companyId: string) => void;
  competencies: Competency[];
  updateCompetencyScore: (id: string, newScore: number, evidence?: Competency['evidenceSource']) => void;
  roadmaps: RoadmapModule[];
  toggleTopicCompletion: (moduleId: string, topicId: string) => void;
  completeTopicAndAdvance: (topicId: string) => void;
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  selectRoadmap: (roadmapId: string) => void;
  interviews: InterviewSchedule[];
  addInterview: (interview: Omit<InterviewSchedule, 'id'>) => void;
  updateInterviewStatus: (id: string, status: InterviewSchedule['status']) => void;
  deleteInterview: (id: string) => void;
  toggleInterviewTask: (interviewId: string, taskIndex: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCustomizingProfile: boolean;
  setIsCustomizingProfile: (open: boolean) => void;
  activeRemediationTopic: string | null;
  setActiveRemediationTopic: (topic: string | null) => void;
  overallReadinessPercentage: number;
  // Student authentication & student-specific dashboard state
  currentUser: StudentUser | null;
  students: StudentUser[];
  loginStudent: (studentIdOrEmail: string) => void;
  signUpStudent: (details: Partial<StudentUser>) => void;
  logoutStudent: () => void;
  signOutStudent: () => Promise<boolean>;
  isSigningOut: boolean;
  signoutNotification: string | null;
  clearSignoutNotification: () => void;
  updateStudentProfile: (updates: Partial<StudentUser>) => void;
  updateStudentTheme: (settings: Partial<StudentThemeSettings>) => void;
  logStudySession: (minutes: number, topicName: string, category: string, notes?: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
  // Comprehensive Learning Resource System
  selectedTopicId: string | null;
  openTopicDetail: (topicId: string) => void;
  closeTopicDetail: () => void;
  bookmarkedResourceIds: string[];
  toggleBookmarkResource: (resourceId: string) => void;
  reviewedResourceIds: string[];
  markResourceAsReviewed: (resourceId: string) => void;
  topicQuizScores: Record<string, number>;
  saveTopicQuizScore: (topicId: string, score: number) => void;
  lastVisitedTopicId: string | null;
  setLastVisitedTopic: (topicId: string) => void;
  // Account deletion and reset operations
  resetAllStudentAccounts: () => void;
  deleteStudentAccount: (studentId: string) => void;
}

const STORAGE_KEY_STUDENTS = 'skillpath_students_v4';
const STORAGE_KEY_CURRENT_STUDENT_ID = 'skillpath_current_student_id_v4';

// Storage key helper for per-student isolated records
const getStudentStorageKey = (studentId: string, item: string) =>
  `skillpath_student_${studentId}_${item}_v4`;

// Purge all student accounts, active sessions, and personal progress records from storage
export const purgeAllStudentStorage = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith('skillpath_student') ||
          key.startsWith('skillpath_current_student') ||
          key.startsWith('skillpath_user'))
      ) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify([]));
    localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT_ID);
  } catch (e) {
    console.warn('Storage purge warning:', e);
  }
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Candidate',
  degree: 'B.Tech Computer Science & Engineering',
  academicYear: 'Second Year',
  careerGoal: 'Software Engineer',
  targetCompanyId: 'google',
  additionalCompanyIds: ['microsoft', 'amazon', 'tcs'],
  intendedJobRole: 'Software Engineer (Campus Graduate / Intern)',
  recruitmentProgramId: 'google-swe-campus',
  currentLevel: 'Beginner',
  preferredLanguage: 'Python',
  dailyStudyTimeHours: 1,
  targetDate: '2026-11-30',
  customJobDescription: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Students directory state - clean isolated state
  const [students, setStudents] = useState<StudentUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENTS);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // Clean slate initialization: clear any leftover historical test accounts
      purgeAllStudentStorage();
      return [];
    } catch {
      return [];
    }
  });

  // Authentic student session tracking - ONLY restore if explicit key exists in storage!
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_STUDENT_ID);
      return saved !== null && saved !== '' ? saved : null;
    } catch {
      return null;
    }
  });

  const currentUser = students.find((s) => s.id === currentStudentId) || null;

  // Active student's userProfile representation
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (currentUser) {
      return {
        ...DEFAULT_PROFILE,
        name: currentUser.name,
        degree: currentUser.degree,
        academicYear: currentUser.academicYear,
        careerGoal: currentUser.careerGoal || 'Software Engineer',
        targetCompanyId: currentUser.targetCompanyId || 'google',
      };
    }
    return DEFAULT_PROFILE;
  });

  // Isolated student competencies state
  const [competencies, setCompetencies] = useState<Competency[]>(() => {
    if (!currentStudentId) return getCleanCompetencies();
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'competencies'));
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed loading competencies', e);
    }
    return getStudentCompetencies(currentStudentId);
  });

  // Isolated student roadmaps state
  const [roadmaps, setRoadmaps] = useState<RoadmapModule[]>(() => {
    if (!currentStudentId) return getCleanRoadmaps();
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'roadmaps'));
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed loading roadmaps', e);
    }
    return getStudentRoadmaps(currentStudentId);
  });

  // Isolated student interviews state
  const [interviews, setInterviews] = useState<InterviewSchedule[]>(() => {
    if (!currentStudentId) return [];
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'interviews'));
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed loading interviews', e);
    }
    return [];
  });

  // Learning resource tracking per student
  const [bookmarkedResourceIds, setBookmarkedResourceIds] = useState<string[]>(() => {
    if (!currentStudentId) return [];
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'bookmarks'));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewedResourceIds, setReviewedResourceIds] = useState<string[]>(() => {
    if (!currentStudentId) return [];
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'reviewed_res'));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [topicQuizScores, setTopicQuizScores] = useState<Record<string, number>>(() => {
    if (!currentStudentId) return {};
    try {
      const saved = localStorage.getItem(getStudentStorageKey(currentStudentId, 'quiz_scores'));
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [lastVisitedTopicId, setLastVisitedTopicIdState] = useState<string | null>(() => {
    if (!currentStudentId) return null;
    try {
      return localStorage.getItem(getStudentStorageKey(currentStudentId, 'last_topic')) || null;
    } catch {
      return null;
    }
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [isCustomizingProfile, setIsCustomizingProfile] = useState<boolean>(false);
  const [activeRemediationTopic, setActiveRemediationTopic] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  // Sign out status & notification
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [signoutNotification, setSignoutNotification] = useState<string | null>(null);

  // Track previous student ID to handle transitions without stale overwrites
  const prevStudentIdRef = useRef<string | null>(currentStudentId);

  // Sync students list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.warn('Failed saving students', e);
    }
  }, [students]);

  // Sync active student ID
  useEffect(() => {
    try {
      if (currentStudentId) {
        localStorage.setItem(STORAGE_KEY_CURRENT_STUDENT_ID, currentStudentId);
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT_ID);
      }
    } catch (e) {
      console.warn('Failed saving current student ID', e);
    }
  }, [currentStudentId]);

  // When active student switches, reload their isolated records
  useEffect(() => {
    if (prevStudentIdRef.current === currentStudentId) return;
    prevStudentIdRef.current = currentStudentId;

    if (!currentStudentId) {
      setCompetencies(getCleanCompetencies());
      setRoadmaps(getCleanRoadmaps());
      setInterviews([]);
      setBookmarkedResourceIds([]);
      setReviewedResourceIds([]);
      setTopicQuizScores({});
      setLastVisitedTopicIdState(null);
      return;
    }

    // 1. Load student's competencies
    try {
      const savedComps = localStorage.getItem(getStudentStorageKey(currentStudentId, 'competencies'));
      if (savedComps) {
        setCompetencies(JSON.parse(savedComps));
      } else {
        setCompetencies(getStudentCompetencies(currentStudentId));
      }
    } catch {
      setCompetencies(getStudentCompetencies(currentStudentId));
    }

    // 2. Load student's roadmaps
    try {
      const savedRoadmaps = localStorage.getItem(getStudentStorageKey(currentStudentId, 'roadmaps'));
      if (savedRoadmaps) {
        setRoadmaps(JSON.parse(savedRoadmaps));
      } else {
        setRoadmaps(getStudentRoadmaps(currentStudentId));
      }
    } catch {
      setRoadmaps(getStudentRoadmaps(currentStudentId));
    }

    // 3. Load student's interviews
    try {
      const savedInterviews = localStorage.getItem(getStudentStorageKey(currentStudentId, 'interviews'));
      if (savedInterviews) {
        setInterviews(JSON.parse(savedInterviews));
      } else {
        setInterviews([]);
      }
    } catch {
      setInterviews([]);
    }

    // 4. Load student's bookmarks
    try {
      const savedBookmarks = localStorage.getItem(getStudentStorageKey(currentStudentId, 'bookmarks'));
      setBookmarkedResourceIds(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    } catch {
      setBookmarkedResourceIds([]);
    }

    // 5. Load student's reviewed resources
    try {
      const savedReviewed = localStorage.getItem(getStudentStorageKey(currentStudentId, 'reviewed_res'));
      setReviewedResourceIds(savedReviewed ? JSON.parse(savedReviewed) : []);
    } catch {
      setReviewedResourceIds([]);
    }

    // 6. Load student's quiz scores
    try {
      const savedScores = localStorage.getItem(getStudentStorageKey(currentStudentId, 'quiz_scores'));
      setTopicQuizScores(savedScores ? JSON.parse(savedScores) : {});
    } catch {
      setTopicQuizScores({});
    }

    // 7. Load student's last visited topic
    try {
      const savedLast = localStorage.getItem(getStudentStorageKey(currentStudentId, 'last_topic'));
      setLastVisitedTopicIdState(savedLast || null);
    } catch {
      setLastVisitedTopicIdState(null);
    }
  }, [currentStudentId]);

  // Persist current student's competencies
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'competencies'), JSON.stringify(competencies));
    } catch (e) {
      console.warn('Failed saving student competencies', e);
    }
  }, [competencies, currentStudentId]);

  // Persist current student's roadmaps
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'roadmaps'), JSON.stringify(roadmaps));
    } catch (e) {
      console.warn('Failed saving student roadmaps', e);
    }
  }, [roadmaps, currentStudentId]);

  // Persist current student's interviews
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'interviews'), JSON.stringify(interviews));
    } catch (e) {
      console.warn('Failed saving student interviews', e);
    }
  }, [interviews, currentStudentId]);

  // Persist bookmarks
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'bookmarks'), JSON.stringify(bookmarkedResourceIds));
    } catch (e) {
      console.warn('Failed saving bookmarks', e);
    }
  }, [bookmarkedResourceIds, currentStudentId]);

  // Persist reviewed resources
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'reviewed_res'), JSON.stringify(reviewedResourceIds));
    } catch (e) {
      console.warn('Failed saving reviewed resources', e);
    }
  }, [reviewedResourceIds, currentStudentId]);

  // Persist quiz scores
  useEffect(() => {
    if (!currentStudentId) return;
    try {
      localStorage.setItem(getStudentStorageKey(currentStudentId, 'quiz_scores'), JSON.stringify(topicQuizScores));
    } catch (e) {
      console.warn('Failed saving quiz scores', e);
    }
  }, [topicQuizScores, currentStudentId]);

  // Sync userProfile with active student
  useEffect(() => {
    if (currentUser) {
      setUserProfile((prev) => {
        if (
          prev.name === currentUser.name &&
          prev.degree === currentUser.degree &&
          prev.academicYear === currentUser.academicYear &&
          prev.careerGoal === currentUser.careerGoal &&
          prev.targetCompanyId === currentUser.targetCompanyId
        ) {
          return prev;
        }
        return {
          ...prev,
          name: currentUser.name || prev.name,
          degree: currentUser.degree || prev.degree,
          academicYear: currentUser.academicYear || prev.academicYear,
          careerGoal: currentUser.careerGoal || prev.careerGoal,
          targetCompanyId: currentUser.targetCompanyId || prev.targetCompanyId,
        };
      });
    }
  }, [currentUser?.id, currentUser?.name, currentUser?.careerGoal, currentUser?.targetCompanyId]);

  const loginStudent = (studentIdOrEmail: string) => {
    const found = students.find(
      (s) => s.id === studentIdOrEmail || s.email.toLowerCase() === studentIdOrEmail.toLowerCase()
    );
    if (found) {
      setCurrentStudentId(found.id);
      setStudents((prev) =>
        prev.map((s) =>
          s.id === found.id
            ? { ...s, lastActiveDate: new Date().toISOString().split('T')[0] }
            : s
        )
      );
    }
  };

  const signUpStudent = (details: Partial<StudentUser>) => {
    const newStudent = createAuthenticNewStudent(details);
    const freshRoadmaps = getCleanRoadmaps();
    const freshCompetencies = getCleanCompetencies();
    const freshInterviews: InterviewSchedule[] = [];

    // Pre-save to storage before updating state to guarantee clean isolation
    try {
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'roadmaps'), JSON.stringify(freshRoadmaps));
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'competencies'), JSON.stringify(freshCompetencies));
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'interviews'), JSON.stringify(freshInterviews));
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'bookmarks'), JSON.stringify([]));
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'reviewed_res'), JSON.stringify([]));
      localStorage.setItem(getStudentStorageKey(newStudent.id, 'quiz_scores'), JSON.stringify({}));
    } catch (e) {
      console.warn('Failed writing initial new student store', e);
    }

    setStudents((prev) => [newStudent, ...prev]);
    setCurrentStudentId(newStudent.id);
    setRoadmaps(freshRoadmaps);
    setCompetencies(freshCompetencies);
    setInterviews(freshInterviews);
    setBookmarkedResourceIds([]);
    setReviewedResourceIds([]);
    setTopicQuizScores({});

    if (newStudent.targetCompanyId) {
      setTargetCompany(newStudent.targetCompanyId);
    }
  };

  // Robust, functional sign-out implementation
  const signOutStudent = async (): Promise<boolean> => {
    if (isSigningOut) return false;
    setIsSigningOut(true);
    try {
      // Small graceful execution pause
      await new Promise((res) => setTimeout(res, 200));

      // 1. Clear session key from localStorage
      localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT_ID);

      // 2. Clear sensitive in-memory user-specific states
      setCurrentStudentId(null);
      setRoadmaps(getCleanRoadmaps());
      setCompetencies(getCleanCompetencies());
      setInterviews([]);
      setBookmarkedResourceIds([]);
      setReviewedResourceIds([]);
      setTopicQuizScores({});
      setLastVisitedTopicIdState(null);
      setSelectedTopicId(null);

      // 3. Redirect to public landing page
      setActiveTab('landing');
      setIsAuthModalOpen(false);

      // 4. Set confirmation message
      setSignoutNotification('You have signed out successfully.');
      setTimeout(() => {
        setSignoutNotification(null);
      }, 5000);

      return true;
    } catch (err) {
      console.error('Error during sign out:', err);
      setSignoutNotification('Failed to sign out. Please try again.');
      return false;
    } finally {
      setIsSigningOut(false);
    }
  };

  // Alias logoutStudent to signOutStudent for backward compatibility
  const logoutStudent = () => {
    void signOutStudent();
  };

  const clearSignoutNotification = () => {
    setSignoutNotification(null);
  };

  // Administrative reset function to delete all existing student accounts and personal records
  const resetAllStudentAccounts = () => {
    purgeAllStudentStorage();
    setStudents([]);
    setCurrentStudentId(null);
    setRoadmaps(getCleanRoadmaps());
    setCompetencies(getCleanCompetencies());
    setInterviews([]);
    setBookmarkedResourceIds([]);
    setReviewedResourceIds([]);
    setTopicQuizScores({});
    setLastVisitedTopicIdState(null);
    setSelectedTopicId(null);
    setActiveTab('landing');
    setIsAuthModalOpen(false);
    setSignoutNotification('All existing student accounts have been safely reset. Application is in a clean state.');
    setTimeout(() => {
      setSignoutNotification(null);
    }, 6000);
  };

  // Delete an individual student account and its isolated records
  const deleteStudentAccount = (studentId: string) => {
    try {
      const items = ['competencies', 'roadmaps', 'interviews', 'bookmarks', 'reviewed_res', 'quiz_scores', 'last_topic'];
      items.forEach((item) => {
        localStorage.removeItem(getStudentStorageKey(studentId, item));
      });
    } catch (e) {
      console.warn('Failed clearing student storage', e);
    }
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    if (currentStudentId === studentId) {
      setCurrentStudentId(null);
      setRoadmaps(getCleanRoadmaps());
      setCompetencies(getCleanCompetencies());
      setInterviews([]);
      setBookmarkedResourceIds([]);
      setReviewedResourceIds([]);
      setTopicQuizScores({});
      setLastVisitedTopicIdState(null);
      setSelectedTopicId(null);
      setActiveTab('landing');
    }
  };

  const updateStudentProfile = (updates: Partial<StudentUser>) => {
    if (!currentStudentId) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === currentStudentId ? { ...s, ...updates } : s))
    );
    if (updates.targetCompanyId) {
      const found = COMPANIES_DATA.find((c) => c.id === updates.targetCompanyId);
      if (found) {
        setUserProfile((prev) => ({
          ...prev,
          targetCompanyId: updates.targetCompanyId!,
          recruitmentProgramId: found.hiringPrograms[0]?.id || '',
        }));
      }
    }
  };

  const updateStudentTheme = (settings: Partial<StudentThemeSettings>) => {
    if (!currentStudentId) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === currentStudentId
          ? {
              ...s,
              themeSettings: { ...s.themeSettings, ...settings },
            }
          : s
      )
    );
  };

  const enrollInCourse = (courseId: string) => {
    if (!currentStudentId) return;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== currentStudentId) return s;
        const currentEnrolled = s.enrolledCourseIds || [];
        if (currentEnrolled.includes(courseId)) return s;
        return {
          ...s,
          enrolledCourseIds: [...currentEnrolled, courseId],
          selectedRoadmapId: s.selectedRoadmapId || courseId,
          isNewlyRegistered: false,
        };
      })
    );
  };

  const unenrollFromCourse = (courseId: string) => {
    if (!currentStudentId) return;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== currentStudentId) return s;
        const updated = (s.enrolledCourseIds || []).filter((id) => id !== courseId);
        return {
          ...s,
          enrolledCourseIds: updated,
          selectedRoadmapId: s.selectedRoadmapId === courseId ? (updated[0] || null) : s.selectedRoadmapId,
        };
      })
    );
  };

  const selectRoadmap = (roadmapId: string) => {
    if (!currentStudentId) return;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== currentStudentId) return s;
        const currentEnrolled = s.enrolledCourseIds || [];
        const enrolled = currentEnrolled.includes(roadmapId)
          ? currentEnrolled
          : [...currentEnrolled, roadmapId];
        return {
          ...s,
          selectedRoadmapId: roadmapId,
          enrolledCourseIds: enrolled,
          isNewlyRegistered: false,
        };
      })
    );
  };

  const logStudySession = (
    minutes: number,
    topicName: string,
    category: string,
    notes?: string
  ) => {
    if (!currentStudentId) return;
    const newLog: StudyLogEntry = {
      id: `sl-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      minutes,
      topicName,
      category,
      notes,
    };

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== currentStudentId) return s;
        const newTotal = (s.totalStudyMinutes || 0) + minutes;
        const newStreak = s.streakDays === 0 ? 1 : s.streakDays;
        return {
          ...s,
          totalStudyMinutes: newTotal,
          streakDays: newStreak,
          isNewlyRegistered: false,
          studyLogs: [newLog, ...(s.studyLogs || [])],
        };
      })
    );
  };

  const activeCompany =
    COMPANIES_DATA.find((c) => c.id === (currentUser?.targetCompanyId || userProfile.targetCompanyId)) ||
    COMPANIES_DATA[0];

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    if (currentStudentId) {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== currentStudentId) return s;
          return {
            ...s,
            ...(updates.name !== undefined ? { name: updates.name } : {}),
            ...(updates.degree !== undefined ? { degree: updates.degree } : {}),
            ...(updates.academicYear !== undefined ? { academicYear: updates.academicYear } : {}),
            ...(updates.careerGoal !== undefined ? { careerGoal: updates.careerGoal } : {}),
            ...(updates.targetCompanyId !== undefined ? { targetCompanyId: updates.targetCompanyId } : {}),
          };
        })
      );
    }
  };

  const setTargetCompany = (companyId: string) => {
    const found = COMPANIES_DATA.find((c) => c.id === companyId);
    if (found) {
      const primaryProgram = found.hiringPrograms[0]?.id || '';
      setUserProfile((prev) => ({
        ...prev,
        targetCompanyId: companyId,
        recruitmentProgramId: primaryProgram,
      }));
      if (currentStudentId) {
        setStudents((prev) =>
          prev.map((s) => (s.id === currentStudentId ? { ...s, targetCompanyId: companyId } : s))
        );
      }
    }
  };

  const updateCompetencyScore = (
    id: string,
    newScore: number,
    evidence: Competency['evidenceSource'] = 'Assessment Quiz'
  ) => {
    const boundedScore = Math.min(100, Math.max(0, newScore));
    setCompetencies((prev) =>
      prev.map((comp) => {
        if (comp.id !== id) return comp;
        let status: Competency['status'] = 'NOT_ASSESSED';
        if (boundedScore >= comp.requiredProficiency * 0.9) {
          status = 'DEMONSTRATED';
        } else if (boundedScore >= 40) {
          status = 'PARTIALLY_DEVELOPED';
        } else if (boundedScore > 0) {
          status = 'MISSING';
        }
        return {
          ...comp,
          assessedProficiency: boundedScore,
          status,
          evidenceSource: evidence,
        };
      })
    );

    // Update student's completed assessments count and streak if this was their first activity
    if (currentStudentId && boundedScore > 0) {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== currentStudentId) return s;
          const currentCount = s.completedAssessmentsCount || 0;
          return {
            ...s,
            completedAssessmentsCount: currentCount + 1,
            streakDays: s.streakDays === 0 ? 1 : s.streakDays,
            isNewlyRegistered: false,
          };
        })
      );
    }
  };

  const toggleTopicCompletion = (moduleId: string, topicId: string) => {
    let nowCompleted = false;
    setRoadmaps((prev) =>
      prev.map((m) => {
        if (m.id !== moduleId) return m;
        const updatedTopics = m.topics.map((t) => {
          if (t.id === topicId) {
            nowCompleted = !t.completed;
            return { ...t, completed: nowCompleted };
          }
          return t;
        });
        const allCompleted = updatedTopics.every((t) => t.completed);
        return {
          ...m,
          topics: updatedTopics,
          isCompleted: allCompleted,
        };
      })
    );

    // If lesson was completed, update student activity streak and enrollment
    if (currentStudentId && nowCompleted) {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== currentStudentId) return s;
          const enrolled = s.enrolledCourseIds || [];
          const updatedEnrolled = enrolled.includes(moduleId) ? enrolled : [...enrolled, moduleId];
          return {
            ...s,
            streakDays: s.streakDays === 0 ? 1 : s.streakDays,
            enrolledCourseIds: updatedEnrolled,
            selectedRoadmapId: s.selectedRoadmapId || moduleId,
            isNewlyRegistered: false,
          };
        })
      );
    }
  };

  // Complete a topic directly by ID (used from the dedicated learning resource page)
  const completeTopicAndAdvance = (topicId: string) => {
    let targetModuleId: string | null = null;
    for (const m of roadmaps) {
      if (m.topics.some((t) => t.id === topicId)) {
        targetModuleId = m.id;
        break;
      }
    }

    if (targetModuleId) {
      toggleTopicCompletion(targetModuleId, topicId);
    } else if (currentStudentId) {
      // If outside roadmap, count towards streak and student activity
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== currentStudentId) return s;
          return {
            ...s,
            streakDays: s.streakDays === 0 ? 1 : s.streakDays,
            isNewlyRegistered: false,
          };
        })
      );
    }
  };

  const addInterview = (interview: Omit<InterviewSchedule, 'id'>) => {
    const newEntry: InterviewSchedule = {
      ...interview,
      id: `int-${Date.now()}`,
    };
    setInterviews((prev) => [newEntry, ...prev]);
  };

  const updateInterviewStatus = (id: string, status: InterviewSchedule['status']) => {
    setInterviews((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  };

  const deleteInterview = (id: string) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleInterviewTask = (interviewId: string, taskIndex: number) => {
    setInterviews((prev) =>
      prev.map((i) => {
        if (i.id !== interviewId) return i;
        const updated = [...i.preparationChecklist];
        if (updated[taskIndex]) {
          updated[taskIndex] = {
            ...updated[taskIndex],
            done: !updated[taskIndex].done,
          };
        }
        return { ...i, preparationChecklist: updated };
      })
    );
  };

  // Resource interaction actions
  const openTopicDetail = (topicId: string) => {
    setSelectedTopicId(topicId);
    setLastVisitedTopic(topicId);
    setActiveTab('topic-detail');
  };

  const closeTopicDetail = () => {
    setSelectedTopicId(null);
  };

  const toggleBookmarkResource = (resourceId: string) => {
    setBookmarkedResourceIds((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]
    );
  };

  const markResourceAsReviewed = (resourceId: string) => {
    setReviewedResourceIds((prev) =>
      prev.includes(resourceId) ? prev : [...prev, resourceId]
    );
  };

  const saveTopicQuizScore = (topicId: string, score: number) => {
    setTopicQuizScores((prev) => ({
      ...prev,
      [topicId]: score,
    }));
  };

  const setLastVisitedTopic = (topicId: string) => {
    setLastVisitedTopicIdState(topicId);
    if (currentStudentId) {
      try {
        localStorage.setItem(getStudentStorageKey(currentStudentId, 'last_topic'), topicId);
      } catch (e) {
        console.warn('Failed saving last topic', e);
      }
    }
  };

  // Authentic readiness percentage calculation: ONLY from genuine assessed competencies
  const relevantCompetencies = competencies.filter(
    (c) => !activeCompany?.id || c.companiesRequiring.length === 0 || c.companiesRequiring.includes(activeCompany.id)
  );

  const totalPossible = relevantCompetencies.length * 100;
  const totalAssessed = relevantCompetencies.reduce(
    (sum, c) => sum + (c.assessedProficiency || 0),
    0
  );
  const hasAssessedAny = relevantCompetencies.some((c) => (c.assessedProficiency || 0) > 0);

  // Return strictly 0 if no competencies have been assessed. Never fallback to arbitrary 65%!
  const overallReadinessPercentage =
    hasAssessedAny && totalPossible > 0
      ? Math.round((totalAssessed / totalPossible) * 100)
      : 0;

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        activeCompany,
        setTargetCompany,
        competencies,
        updateCompetencyScore,
        roadmaps,
        toggleTopicCompletion,
        completeTopicAndAdvance,
        enrollInCourse,
        unenrollFromCourse,
        selectRoadmap,
        interviews,
        addInterview,
        updateInterviewStatus,
        deleteInterview,
        toggleInterviewTask,
        activeTab,
        setActiveTab,
        isCustomizingProfile,
        setIsCustomizingProfile,
        activeRemediationTopic,
        setActiveRemediationTopic,
        overallReadinessPercentage,
        currentUser,
        students,
        loginStudent,
        signUpStudent,
        logoutStudent,
        signOutStudent,
        isSigningOut,
        signoutNotification,
        clearSignoutNotification,
        updateStudentProfile,
        updateStudentTheme,
        logStudySession,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isThemeModalOpen,
        setIsThemeModalOpen,
        selectedTopicId,
        openTopicDetail,
        closeTopicDetail,
        bookmarkedResourceIds,
        toggleBookmarkResource,
        reviewedResourceIds,
        markResourceAsReviewed,
        topicQuizScores,
        saveTopicQuizScore,
        lastVisitedTopicId,
        setLastVisitedTopic,
        resetAllStudentAccounts,
        deleteStudentAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
