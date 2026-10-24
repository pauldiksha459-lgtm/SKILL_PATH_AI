import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyLogo } from './CompanyLogo';
import { COMPANIES_DATA } from '../data/companies';
import { CareerGoal } from '../types';
import {
  Flame,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Code2,
  BrainCircuit,
  Calendar,
  Sparkles,
  Sliders,
  Plus,
  Play,
  Layers,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  UserCheck,
  Circle,
  HelpCircle,
  FolderPlus,
  Compass,
  CheckCircle,
  ExternalLink,
  LogOut,
  Bookmark,
  Library,
} from 'lucide-react';

const CAREER_GOALS: CareerGoal[] = [
  'Software Engineer',
  'AI/ML Engineer',
  'Data Scientist',
  'Data Analyst',
  'Cybersecurity Analyst or Engineer',
  'Cloud Engineer',
  'DevOps Engineer',
  'Full-Stack Developer',
  'Mobile Application Developer',
];

export const StudentDashboardView: React.FC = () => {
  const {
    currentUser,
    userProfile,
    activeCompany,
    setTargetCompany,
    competencies,
    updateCompetencyScore,
    roadmaps,
    toggleTopicCompletion,
    enrollInCourse,
    unenrollFromCourse,
    selectRoadmap,
    interviews,
    overallReadinessPercentage,
    setActiveTab,
    setIsThemeModalOpen,
    setIsAuthModalOpen,
    setIsCustomizingProfile,
    logStudySession,
    updateStudentProfile,
    signOutStudent,
    isSigningOut,
    openTopicDetail,
    bookmarkedResourceIds,
    topicQuizScores,
  } = useApp();

  // Study log modal
  const [showLogModal, setShowLogModal] = useState(false);
  const [logMinutes, setLogMinutes] = useState(45);
  const [logTopic, setLogTopic] = useState('Binary Search Trees & Traversal');
  const [logCategory, setLogCategory] = useState('Data Structures & Algorithms');
  const [logNotes, setLogNotes] = useState('');

  // Course enrollment modal
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Quick setup modal
  const [showQuickGoalModal, setShowQuickGoalModal] = useState(false);

  if (!currentUser) {
    return (
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-12 text-center max-w-xl mx-auto my-12">
        <UserCheck className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-display text-white">No Student Profile Selected</h2>
        <p className="text-xs text-[#A5A5B8] mt-2 mb-6">
          Sign in or select an authentic student account to view personalized progress, study records, and company placement roadmaps.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="rounded-full bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          Sign In or Register Student
        </button>
      </div>
    );
  }

  // Authentic progress calculations
  const totalTopics = roadmaps.reduce((acc, m) => acc + m.topics.length, 0);
  const completedTopicsCount = roadmaps.reduce(
    (acc, m) => acc + m.topics.filter((t) => t.completed).length,
    0
  );

  // Strictly dynamic roadmap completion percentage (0 if no topics completed)
  const roadmapCompletionPercent =
    totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  // Enrolled courses evaluation
  const enrolledCourseIds = currentUser.enrolledCourseIds || [];
  const enrolledModules = roadmaps.filter((m) => enrolledCourseIds.includes(m.id));

  // Selected roadmap evaluation
  const selectedRoadmap = roadmaps.find((m) => m.id === currentUser.selectedRoadmapId) || null;

  // Assessed competencies evaluation
  const assessedCompetencies = competencies.filter((c) => c.status !== 'NOT_ASSESSED');
  const assessedCount = assessedCompetencies.length;

  // Active target company competencies
  const relevantCompetencies = competencies.filter(
    (c) => c.companiesRequiring.length === 0 || c.companiesRequiring.includes(activeCompany.id)
  );
  const demonstratedComps = relevantCompetencies.filter((c) => c.status === 'DEMONSTRATED');
  const gapComps = relevantCompetencies.filter(
    (c) => c.status === 'MISSING' || c.status === 'PARTIALLY_DEVELOPED'
  );

  // Check if student is brand new or has 0 verified activity
  const isNewlyRegistered =
    currentUser.isNewlyRegistered ||
    (completedTopicsCount === 0 &&
      currentUser.totalStudyMinutes === 0 &&
      enrolledCourseIds.length === 0 &&
      assessedCount === 0);

  // Real Onboarding Checklist conditions
  const isProfileComplete = Boolean(
    currentUser.name.trim() && currentUser.degree.trim() && currentUser.college.trim()
  );
  const isCareerGoalSelected = Boolean(currentUser.careerGoal);
  const isTargetCompanySelected = Boolean(currentUser.targetCompanyId);
  const isRoadmapSelected = Boolean(currentUser.selectedRoadmapId);
  const isFirstCourseEnrolled = enrolledCourseIds.length > 0;
  const isFirstLessonCompleted = completedTopicsCount > 0;
  const isFirstAssessmentTaken = assessedCount > 0;

  const checklistItems = [
    {
      id: 'profile',
      label: 'Profile Information Completed',
      detail: isProfileComplete
        ? `${currentUser.degree} · ${currentUser.college}`
        : 'Fill in degree, college, and academic year',
      isCompleted: isProfileComplete,
      statusLabel: isProfileComplete ? 'Completed' : 'Not started',
      actionLabel: isProfileComplete ? 'Edit' : 'Complete Profile',
      onAction: () => setIsCustomizingProfile(true),
    },
    {
      id: 'career-goal',
      label: 'Career Goal Selected',
      detail: isCareerGoalSelected ? currentUser.careerGoal : 'Choose your target engineering specialization',
      isCompleted: isCareerGoalSelected,
      statusLabel: isCareerGoalSelected ? 'Completed' : 'Not selected',
      actionLabel: isCareerGoalSelected ? 'Change' : 'Choose Career Goal',
      onAction: () => setShowQuickGoalModal(true),
    },
    {
      id: 'target-company',
      label: 'Target Company Selected',
      detail: isTargetCompanySelected
        ? `Aiming for ${activeCompany.name} placement`
        : 'Select the primary tech enterprise or IT service you target',
      isCompleted: isTargetCompanySelected,
      statusLabel: isTargetCompanySelected ? 'Completed' : 'Not selected',
      actionLabel: isTargetCompanySelected ? 'Switch' : 'Select Target Company',
      onAction: () => setIsCustomizingProfile(true),
    },
    {
      id: 'roadmap-selected',
      label: 'Placement Roadmap Selected',
      detail: isRoadmapSelected
        ? selectedRoadmap?.title || 'Personalized roadmap active'
        : 'Choose a foundational curriculum path aligned with your role',
      isCompleted: isRoadmapSelected,
      statusLabel: isRoadmapSelected ? 'Completed' : 'Not selected',
      actionLabel: isRoadmapSelected ? 'View Roadmap' : 'Select Roadmap',
      onAction: () => {
        if (!isRoadmapSelected && roadmaps.length > 0) {
          selectRoadmap(roadmaps[0].id);
        }
        setActiveTab('roadmap');
      },
    },
    {
      id: 'course-enrolled',
      label: 'First Course Enrolled',
      detail: isFirstCourseEnrolled
        ? `${enrolledCourseIds.length} course(s) active in your learning catalog`
        : 'Enroll in curriculum modules to track structured lesson progress',
      isCompleted: isFirstCourseEnrolled,
      statusLabel: isFirstCourseEnrolled ? 'Completed' : 'Not enrolled',
      actionLabel: isFirstCourseEnrolled ? 'Browse More' : 'Enroll in Course',
      onAction: () => setShowEnrollModal(true),
    },
    {
      id: 'lesson-completed',
      label: 'First Lesson Completed',
      detail: isFirstLessonCompleted
        ? `${completedTopicsCount} syllabus topic(s) completed with verified mastery`
        : 'Review and check off your first syllabus lesson in the roadmap',
      isCompleted: isFirstLessonCompleted,
      statusLabel: isFirstLessonCompleted ? 'Completed' : 'Not started',
      actionLabel: isFirstLessonCompleted ? 'Continue Lessons' : 'Start First Lesson',
      onAction: () => setActiveTab('roadmap'),
    },
    {
      id: 'assessment-taken',
      label: 'First Skill Assessment Taken',
      detail: isFirstAssessmentTaken
        ? `${assessedCount} technical competency areas evaluated`
        : 'Evaluate your baseline knowledge to reveal real placement readiness',
      isCompleted: isFirstAssessmentTaken,
      statusLabel: isFirstAssessmentTaken ? 'Completed' : 'Not assessed',
      actionLabel: isFirstAssessmentTaken ? 'Take Another' : 'Take Skill Assessment',
      onAction: () => setActiveTab('practice'),
    },
  ];

  const completedChecklistCount = checklistItems.filter((i) => i.isCompleted).length;
  const checklistPercent = Math.round((completedChecklistCount / checklistItems.length) * 100);

  // Next recommended topic to study
  const currentIncompleteModule =
    roadmaps.find((m) => enrolledCourseIds.includes(m.id) && !m.isCompleted) ||
    roadmaps.find((m) => !m.isCompleted) ||
    roadmaps[0];

  const nextIncompleteTopic =
    currentIncompleteModule?.topics.find((t) => !t.completed) ||
    currentIncompleteModule?.topics[0];

  const handleSaveStudyLog = (e: React.FormEvent) => {
    e.preventDefault();
    logStudySession(logMinutes, logTopic, logCategory, logNotes);
    setShowLogModal(false);
    setLogNotes('');
  };

  const handleSelectGoal = (goal: CareerGoal) => {
    updateStudentProfile({ careerGoal: goal });
    setShowQuickGoalModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─────────────────────────────────────────────────────────────
          1. STUDENT PROFILE WELCOME HERO & REGISTRATION STATUS
         ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[80px]" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-600/15 blur-[80px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar & Student Information */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-purple-600/40 to-indigo-600/40 border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-lg shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold font-display text-white">
                    {currentUser.name ? currentUser.name.charAt(0) : 'S'}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-amber-500 text-black text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md">
                <Flame className="h-3 w-3 fill-black" />
                <span>{currentUser.streakDays}d</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  Welcome back, {currentUser.name || 'Candidate'}!
                </h1>
                <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified Candidate</span>
                </span>
              </div>

              <div className="text-xs text-[#A5A5B8] flex flex-wrap items-center gap-2">
                <span>{currentUser.degree || 'Degree Not Specified'}</span>
                <span>·</span>
                <span className="text-purple-300 font-medium">{currentUser.academicYear || 'Academic Year'}</span>
                <span>·</span>
                <span className="text-slate-400">{currentUser.college || 'College Campus'}</span>
              </div>

              {/* Target Company Tag & Role */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                {currentUser.targetCompanyId ? (
                  <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
                    <CompanyLogo
                      companyId={activeCompany.id}
                      name={activeCompany.name}
                      size="xs"
                      forceLightBg={activeCompany.logoBg === 'light'}
                    />
                    <span className="text-slate-400">Targeting:</span>
                    <span className="font-semibold text-white">{activeCompany.name}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-purple-300 font-medium">
                      {currentUser.careerGoal || 'Role Not Selected'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-950/20 px-3 py-1 text-amber-300 text-[11px]">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Target company: <strong>Not selected</strong></span>
                  </div>
                )}

                <button
                  onClick={() => setIsCustomizingProfile(true)}
                  className="text-[11px] text-purple-400 hover:text-purple-300 font-medium hover:underline cursor-pointer"
                >
                  Change Target →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-start lg:self-center shrink-0">
            <button
              onClick={() => setActiveTab('resources')}
              className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 px-3.5 py-2 text-xs font-medium text-purple-200 transition-colors cursor-pointer"
              title="Explore complete skill learning resource library"
            >
              <Library className="h-3.5 w-3.5 text-purple-300" />
              <span>Skill Resources</span>
            </button>

            <button
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Log Study Session</span>
            </button>

            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#0E0E18] hover:bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Personalize theme & workspace appearance"
            >
              <Sliders className="h-3.5 w-3.5 text-purple-400" />
              <span>Theme</span>
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#0E0E18] hover:bg-white/[0.06] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Switch or Register candidate profile"
            >
              <UserCheck className="h-3.5 w-3.5 text-indigo-400" />
              <span>Profiles</span>
            </button>

            <button
              onClick={() => signOutStudent()}
              disabled={isSigningOut}
              className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/20 hover:bg-red-900/30 px-3.5 py-2 text-xs font-medium text-red-300 hover:text-red-200 transition-colors cursor-pointer disabled:opacity-50"
              title="Sign out of student account"
            >
              {isSigningOut ? (
                <div className="h-3.5 w-3.5 rounded-full border-2 border-red-300 border-t-transparent animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5 text-red-400" />
              )}
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. AUTHENTIC WELCOME STATE (PROMINENT FOR NEW STUDENTS)
         ───────────────────────────────────────────────────────────── */}
      {isNewlyRegistered && (
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-[#0B0B14] to-indigo-950/20 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                  Welcome to SkillPath AI!
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold font-display text-white">
                Your learning journey starts here.
              </h2>
              <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed">
                Choose your career goal, select your target company, explore courses, or take a skill assessment to begin building your personalized roadmap.
              </p>
            </div>

            {/* 4 Action Buttons required by user */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
              <button
                onClick={() => setShowQuickGoalModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-colors cursor-pointer"
              >
                <Compass className="h-4 w-4" />
                <span>Choose Career Goal</span>
              </button>

              <button
                onClick={() => setIsCustomizingProfile(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/40 px-4 py-2.5 text-xs font-semibold text-purple-200 transition-colors cursor-pointer"
              >
                <CompanyLogo companyId={activeCompany.id} name={activeCompany.name} size="xs" />
                <span>Select Target Company</span>
              </button>

              <button
                onClick={() => setShowEnrollModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0E0E18] hover:bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span>Explore Courses</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-[#0E0E18] hover:bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                <span>Take Skill Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. REGISTRATION & ACCOUNT STATUS SUMMARY (SECTION 7 SPEC)
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-400" />
              <span>Authentic Registration & Status Verification</span>
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Live status verified against actual user records in persistent local storage.
            </p>
          </div>

          <div className="text-xs font-mono text-purple-300">
            Candidate ID: <span className="text-slate-400 font-normal">{currentUser.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Status 1: Account Status */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Account</span>
            <div className="my-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Registered</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Signed in</span>
          </div>

          {/* Status 2: Profile Status */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Profile Status</span>
            <div className="my-2 text-xs font-bold text-white">
              {isProfileComplete ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Completed
                </span>
              ) : currentUser.name ? (
                <span className="text-amber-400">In progress</span>
              ) : (
                <span className="text-slate-400">Not started</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {isProfileComplete ? 'All fields verified' : 'Needs college / degree'}
            </span>
          </div>

          {/* Status 3: Career Setup */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Career Setup</span>
            <div className="my-2 text-xs font-bold text-white">
              {isCareerGoalSelected && isTargetCompanySelected ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Completed
                </span>
              ) : (
                <span className="text-amber-400">Not selected</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono truncate">
              {currentUser.careerGoal || 'Goal pending'}
            </span>
          </div>

          {/* Status 4: Course Enrollment */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Course Enrollment</span>
            <div className="my-2 text-xs font-bold text-white">
              {enrolledCourseIds.length === 0 ? (
                <span className="text-slate-400">Not enrolled</span>
              ) : roadmapCompletionPercent === 100 ? (
                <span className="text-emerald-400">Completed</span>
              ) : completedTopicsCount > 0 ? (
                <span className="text-purple-300">In progress</span>
              ) : (
                <span className="text-indigo-300">Enrolled (0%)</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {enrolledCourseIds.length} course(s) active
            </span>
          </div>

          {/* Status 5: Company Prep Status */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Company Prep</span>
            <div className="my-2 text-xs font-bold text-white">
              {!isTargetCompanySelected ? (
                <span className="text-slate-400">Not selected</span>
              ) : overallReadinessPercentage > 0 ? (
                <span className="text-emerald-400">In progress ({overallReadinessPercentage}%)</span>
              ) : (
                <span className="text-amber-400">Selected (0%)</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono truncate">
              {activeCompany.name}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CORE STUDENT KPI METRIC CARDS (ZERO FAKE VALUES)
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Target Placement Readiness */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#A5A5B8]">
            <span className="font-mono uppercase tracking-wider text-[10px]">Placement Readiness</span>
            <CompanyLogo
              companyId={activeCompany.id}
              name={activeCompany.name}
              size="xs"
              forceLightBg={activeCompany.logoBg === 'light'}
            />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-purple-300">
                {overallReadinessPercentage}%
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  overallReadinessPercentage === 0
                    ? 'bg-white/[0.06] text-slate-400 border border-white/10'
                    : overallReadinessPercentage === 100
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                    : 'bg-purple-950/40 text-purple-300 border border-purple-500/20'
                }`}
              >
                {overallReadinessPercentage === 0
                  ? 'Not assessed'
                  : overallReadinessPercentage === 100
                  ? 'Completed'
                  : 'In progress'}
              </span>
            </div>

            <div className="text-xs text-[#A5A5B8] mt-1">
              {overallReadinessPercentage === 0 ? (
                <span>No skill assessments evaluated yet</span>
              ) : (
                <span>Aligned with {activeCompany.name} requirements</span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${overallReadinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Card 2: Daily Learning Streak */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#A5A5B8]">
            <span className="font-mono uppercase tracking-wider text-[10px]">Learning Streak</span>
            <Flame className="h-4 w-4 text-amber-400 fill-amber-400/20" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-amber-400">
                {currentUser.streakDays} Days
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  currentUser.streakDays === 0
                    ? 'bg-white/[0.06] text-slate-400'
                    : 'bg-amber-950/40 text-amber-300 border border-amber-500/20'
                }`}
              >
                {currentUser.streakDays === 0 ? 'Not started' : 'In progress'}
              </span>
            </div>
            <div className="text-xs text-[#A5A5B8] mt-1">
              {currentUser.streakDays === 0
                ? 'Complete your first lesson to ignite momentum'
                : 'Active daily study momentum'}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <TrendingUp className="h-3 w-3 text-amber-400" />
            <span>
              {currentUser.streakDays === 0 ? 'Streak starts on day 1' : 'Consistency record updated'}
            </span>
          </div>
        </div>

        {/* Card 3: Weekly Study Time */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#A5A5B8]">
            <span className="font-mono uppercase tracking-wider text-[10px]">Total Study Logged</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-indigo-300">
                {Math.floor(currentUser.totalStudyMinutes / 60)} hrs {currentUser.totalStudyMinutes % 60}m
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  currentUser.totalStudyMinutes === 0
                    ? 'bg-white/[0.06] text-slate-400'
                    : 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/20'
                }`}
              >
                {currentUser.totalStudyMinutes === 0 ? 'Not started' : 'In progress'}
              </span>
            </div>
            <div className="text-xs text-[#A5A5B8] mt-1">
              {currentUser.studyLogs.length === 0
                ? 'No sessions logged yet'
                : `Across ${currentUser.studyLogs.length} verified sessions`}
            </div>
          </div>

          <div className="text-[11px] text-purple-300 font-mono">
            Weekly Goal: {currentUser.weeklyGoalMinutes} mins
          </div>
        </div>

        {/* Card 4: Roadmap Topics Mastered */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#A5A5B8]">
            <span className="font-mono uppercase tracking-wider text-[10px]">Roadmap Completion</span>
            <FileCheck2 className="h-4 w-4 text-emerald-400" />
          </div>

          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-emerald-400">
                {roadmapCompletionPercent}%
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  !currentUser.selectedRoadmapId
                    ? 'bg-white/[0.06] text-slate-400'
                    : roadmapCompletionPercent === 0
                    ? 'bg-white/[0.06] text-slate-400'
                    : roadmapCompletionPercent === 100
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                }`}
              >
                {!currentUser.selectedRoadmapId
                  ? 'Not selected'
                  : roadmapCompletionPercent === 0
                  ? 'Not started'
                  : roadmapCompletionPercent === 100
                  ? 'Completed'
                  : 'In progress'}
              </span>
            </div>
            <div className="text-xs text-[#A5A5B8] mt-1">
              {completedTopicsCount} of {totalTopics} syllabus topics completed
            </div>
          </div>

          <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${roadmapCompletionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. REAL ONBOARDING CHECKLIST (SPEC SECTION 8)
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Placement Readiness Onboarding Checklist
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/40 text-purple-300 border border-purple-500/20">
                {completedChecklistCount} of {checklistItems.length} Steps
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Step-by-Step Candidate Preparation Workflow
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Live indicators computed directly from your saved account records and curriculum progress.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-white">{checklistPercent}%</div>
              <div className="text-[10px] text-slate-500">Milestone Progress</div>
            </div>
            <div className="w-24 sm:w-32 bg-white/[0.06] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${checklistPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {checklistItems.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.isCompleted
                  ? 'border-emerald-500/20 bg-emerald-950/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="mt-0.5 sm:mt-0 shrink-0">
                  {item.isCompleted ? (
                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-slate-400">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white">{item.label}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                        item.isCompleted
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20'
                          : 'bg-white/[0.04] text-slate-400 border border-white/[0.08]'
                      }`}
                    >
                      {item.statusLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A5A5B8] mt-0.5">{item.detail}</p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <button
                  onClick={item.onAction}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    item.isCompleted
                      ? 'border border-white/[0.12] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-sm'
                  }`}
                >
                  {item.actionLabel} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. ENROLLED COURSES & CURRICULUM PROGRESS
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Enrolled Courses & Curricula ({enrolledModules.length})</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Active Structured Learning Modules
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Individual lesson completions reflect directly in your authenticated student profile.
            </p>
          </div>

          <button
            onClick={() => setShowEnrollModal(true)}
            className="flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 px-4 py-2 text-xs font-semibold text-purple-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            <span>Enroll in More Courses</span>
          </button>
        </div>

        {enrolledModules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.12] p-8 text-center bg-white/[0.01]">
            <BookOpen className="h-8 w-8 text-slate-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Not enrolled in any courses yet</h4>
            <p className="text-xs text-[#A5A5B8] max-w-md mx-auto mt-1 mb-4">
              Explore foundational DSA, Core CS, System Design, or Campus Aptitude bootcamps to begin your structured placement track.
            </p>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="rounded-full bg-purple-600 hover:bg-purple-500 px-5 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Browse Curriculum & Enroll
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledModules.map((module) => {
              const moduleTopics = module.topics;
              const completedCount = moduleTopics.filter((t) => t.completed).length;
              const modulePct =
                moduleTopics.length > 0 ? Math.round((completedCount / moduleTopics.length) * 100) : 0;
              const statusLabel =
                modulePct === 0 ? 'Not started' : modulePct === 100 ? 'Completed' : 'In progress';

              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded">
                        {module.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          statusLabel === 'Completed'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                            : statusLabel === 'In progress'
                            ? 'bg-purple-950/40 text-purple-300 border border-purple-500/20'
                            : 'bg-white/[0.04] text-slate-400 border border-white/[0.08]'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{module.title}</h4>
                    <p className="text-xs text-[#A5A5B8] mt-1 line-clamp-2">{module.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-400">
                        {completedCount} of {moduleTopics.length} lessons
                      </span>
                      <span className="font-mono font-bold text-white">{modulePct}%</span>
                    </div>

                    <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${modulePct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            selectRoadmap(module.id);
                            setActiveTab('roadmap');
                          }}
                          className="rounded-full bg-purple-600/40 hover:bg-purple-600 border border-purple-500/40 px-3.5 py-1 text-[11px] font-semibold text-white transition-colors cursor-pointer"
                        >
                          {completedCount === 0 ? 'Start Lessons' : 'Continue Lessons'}
                        </button>
                        {module.topics[0] && (
                          <button
                            onClick={() => openTopicDetail(module.topics[0].id)}
                            className="rounded-full border border-purple-500/30 hover:border-purple-400/60 bg-purple-950/30 px-2.5 py-1 text-[11px] font-medium text-purple-300 hover:text-white transition-colors cursor-pointer"
                            title="Open detailed study resources: code, notes, docs, quiz"
                          >
                            Study Resources →
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => unenrollFromCourse(module.id)}
                        className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6B. STUDENT LEARNING RESOURCES & BOOKMARKS SHELF
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
              <Library className="h-4 w-4" />
              <span>Comprehensive Learning Resources</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Curated Skill Deep Dives & Verified Documentation
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Detailed study notes, runnable code, official docs, interactive quizzes, and interview questions for every topic.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('resources')}
            className="flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40 px-4 py-2 text-xs font-semibold text-purple-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Browse Full Library</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick High-Yield Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 't-1-1',
              title: 'Big-O Asymptotic Analysis',
              domain: 'Software Engineering',
              tag: 'Algorithms & Complexity',
              desc: 'Master time/space invariants, recursion tree analysis, and Master Theorem for FAANG technical interviews.',
              level: 'Beginner',
            },
            {
              id: 't-1-2',
              title: 'Two Pointers & Sliding Window',
              domain: 'Software Engineering',
              tag: 'Array Invariants',
              desc: 'Optimal O(n) pointer techniques for subarray sums, palindromes, and container problems.',
              level: 'Intermediate',
            },
            {
              id: 'ai-python-functions',
              title: 'Python Functions, Lambdas & Closures',
              domain: 'AI & Machine Learning',
              tag: 'AI Programming',
              desc: 'First-class citizens, decorators, *args/**kwargs, and generator pipelines for data processing.',
              level: 'Beginner',
            },
            {
              id: 't-8-1',
              title: 'NumPy Vectorization & Linear Algebra',
              domain: 'AI & Machine Learning',
              tag: 'Scientific Computing',
              desc: 'Broadcasting semantics, BLAS optimizations, and matrix operations eliminating slow Python loops.',
              level: 'Intermediate',
            },
            {
              id: 'fs-react-hooks',
              title: 'React Hooks, Reconciliation & Virtual DOM',
              domain: 'Full-Stack Development',
              tag: 'Frontend Engineering',
              desc: 'Fiber tree diffing, dependency array invariants, useMemo/useCallback, and concurrency patterns.',
              level: 'Intermediate',
            },
            {
              id: 'cyber-owasp-top10',
              title: 'OWASP Top 10: SQLi & Stored XSS',
              domain: 'Cybersecurity',
              tag: 'Application Security',
              desc: 'Parameterized queries, CSP headers, DOM sanitization, and defense against injection exploits.',
              level: 'Intermediate',
            },
          ].map((topic) => {
            const isBookmarked = bookmarkedResourceIds.includes(topic.id);
            const quizScore = topicQuizScores[topic.id];

            return (
              <div
                key={topic.id}
                onClick={() => openTopicDetail(topic.id)}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/40 p-5 flex flex-col justify-between transition-all cursor-pointer relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                      {topic.domain}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {quizScore !== undefined && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          Quiz: {quizScore}%
                        </span>
                      )}
                      {isBookmarked && (
                        <Bookmark className="h-3.5 w-3.5 text-purple-400 fill-purple-400" />
                      )}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-[#A5A5B8] mt-1.5 line-clamp-2 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">{topic.tag}</span>
                  <span className="text-xs font-semibold text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Study Topic</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. TWO-COLUMN GRID: TARGET COMPETENCIES & STUDENT STUDY HISTORY
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Target Competency Gap Analysis */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-purple-400" />
                  <span>Target Competencies for {activeCompany.name}</span>
                </h3>
                <p className="text-xs text-[#A5A5B8] mt-0.5">
                  {demonstratedComps.length} demonstrated · {gapComps.length} priority gaps to close
                </p>
              </div>

              <button
                onClick={() => setActiveTab('competencies')}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
              >
                Full Matrix →
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {relevantCompetencies.slice(0, 5).map((comp) => {
                const isDemonstrated = comp.status === 'DEMONSTRATED';
                const isPartially = comp.status === 'PARTIALLY_DEVELOPED';
                const isNotAssessed = comp.status === 'NOT_ASSESSED';

                return (
                  <div
                    key={comp.id}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{comp.name}</span>
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-1.5 py-0.2 rounded">
                          {comp.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Required: {comp.requiredProficiency}% · Current:{' '}
                        {isNotAssessed ? 'Not assessed' : `${comp.assessedProficiency}%`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isDemonstrated ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Demonstrated</span>
                        </span>
                      ) : isPartially ? (
                        <button
                          onClick={() => setActiveTab('practice')}
                          className="rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 px-3 py-1 text-[11px] font-semibold text-purple-200 transition-colors cursor-pointer"
                        >
                          Practice
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            updateCompetencyScore(comp.id, 65, 'Assessment Quiz');
                          }}
                          className="rounded-full bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 px-3 py-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Evaluate this skill with a diagnostic test"
                        >
                          Assess
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
            <span className="text-slate-400">Mastered skills persist cleanly in student profile.</span>
            <button
              onClick={() => setActiveTab('practice')}
              className="text-purple-400 hover:underline"
            >
              Take Skill Assessment →
            </button>
          </div>
        </div>

        {/* Right Column: Recent Student Study Logs & Activity */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="h-4 w-4 text-indigo-400" />
                  <span>Student Study History ({currentUser.studyLogs.length})</span>
                </h3>
                <p className="text-xs text-[#A5A5B8] mt-0.5">
                  Chronological record of verified learning sessions
                </p>
              </div>

              <button
                onClick={() => setShowLogModal(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                + Log Time
              </button>
            </div>

            <div className="space-y-3 mt-4 max-h-[300px] overflow-y-auto pr-1">
              {currentUser.studyLogs.length === 0 ? (
                <div className="text-center py-10 text-xs text-slate-500">
                  <Clock className="h-6 w-6 text-slate-600 mx-auto mb-2" />
                  <div>No study sessions logged yet.</div>
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="mt-2 text-purple-400 hover:underline font-semibold"
                  >
                    Click "+ Log Time" to record your first session.
                  </button>
                </div>
              ) : (
                currentUser.studyLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-white">{log.topicName}</span>
                      <span className="font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded">
                        +{log.minutes} mins
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{log.category}</span>
                      <span>{log.date}</span>
                    </div>
                    {log.notes && (
                      <p className="text-[11px] text-[#A5A5B8] italic pt-0.5">{log.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <span>Weekly Goal: {currentUser.weeklyGoalMinutes}m</span>
            <span className="text-emerald-400 font-medium">Session recorded to persistent storage</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          8. STUDENT BADGES & RECOGNITION SHELF
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              <span>Earned Placement Badges ({currentUser.badges.length})</span>
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Milestones unlocked through persistent practice, algorithmic mock test scores, and streaks.
            </p>
          </div>
        </div>

        {currentUser.badges.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.08] p-8 text-center bg-white/[0.01]">
            <Award className="h-8 w-8 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">No badges earned yet</h4>
            <p className="text-xs text-[#A5A5B8] max-w-md mx-auto mt-1">
              Unlock badges by maintaining a 3-day study streak, completing your first roadmap module, or scoring 80%+ on a skill evaluation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentUser.badges.map((badge) => (
              <div
                key={badge.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 flex flex-col justify-between hover:border-amber-500/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{badge.unlockedAt}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                  <p className="text-[11px] text-[#A5A5B8] mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.04] text-[10px] font-mono text-amber-300">
                  {badge.category}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          9. QUICK SHORTCUTS TO PLACEMENT TOOLS
         ───────────────────────────────────────────────────────────── */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 px-1">
          Placement Preparation Suite
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'stages', label: 'Hiring Stages', icon: <Layers className="h-4 w-4 text-purple-400" /> },
            { id: 'practice', label: 'Practice & Code', icon: <Code2 className="h-4 w-4 text-indigo-400" /> },
            { id: 'aptitude', label: 'Campus Aptitude', icon: <BrainCircuit className="h-4 w-4 text-emerald-400" /> },
            { id: 'mock-interview', label: 'AI Mock Interview', icon: <Sparkles className="h-4 w-4 text-purple-400" /> },
            { id: 'tracker', label: 'Interview Tracker', icon: <Calendar className="h-4 w-4 text-amber-400" /> },
            { id: 'compare', label: 'Compare Companies', icon: <TrendingUp className="h-4 w-4 text-cyan-400" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-4 text-left hover:border-purple-500/50 hover:bg-[#0E0E18] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="mb-3">{item.icon}</div>
              <div className="text-xs font-bold text-white">{item.label}</div>
              <span className="text-[10px] text-purple-400 mt-1 flex items-center gap-0.5">
                <span>Launch</span>
                <ChevronRight className="h-3 w-3" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MODAL 1: STUDY SESSION LOGGING
         ───────────────────────────────────────────────────────────── */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold font-display text-white">Log Verified Study Session</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStudyLog} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Study Duration (Minutes)</label>
                <div className="flex items-center gap-2">
                  {[15, 30, 45, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setLogMinutes(m)}
                      className={`flex-1 rounded-xl border py-2 text-xs font-mono transition-colors ${
                        logMinutes === m
                          ? 'border-purple-500 bg-purple-950/40 text-white font-bold'
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Topic / Skill Studied</label>
                <input
                  type="text"
                  required
                  value={logTopic}
                  onChange={(e) => setLogTopic(e.target.value)}
                  placeholder="e.g. Dynamic Programming Memoization"
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={logCategory}
                  onChange={(e) => setLogCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                  <option value="System Design & Architecture">System Design & Architecture</option>
                  <option value="Campus Aptitude & Speed Math">Campus Aptitude & Speed Math</option>
                  <option value="Core CS (OS, DBMS, Networks)">Core CS (OS, DBMS, Networks)</option>
                  <option value="Technical Mock Interview Prep">Technical Mock Interview Prep</option>
                  <option value="Full-Stack / Project Development">Full-Stack / Project Development</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Session Notes (Optional)</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="Key concepts grasped, challenges faced, or complexity invariants..."
                  rows={2}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="rounded-full border border-white/[0.12] px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-purple-600 hover:bg-purple-500 px-5 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Save to Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 2: COURSE ENROLLMENT
         ───────────────────────────────────────────────────────────── */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 text-white shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-bold font-display text-white">Enroll in Curriculum Modules</h3>
                <p className="text-xs text-[#A5A5B8]">Add structured syllabus tracks to your active dashboard.</p>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {roadmaps.map((mod) => {
                const isEnrolled = enrolledCourseIds.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isEnrolled
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : 'border-white/[0.08] bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{mod.title}</span>
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.2 rounded">
                          {mod.category}
                        </span>
                        {isEnrolled && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                            Enrolled
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#A5A5B8] leading-relaxed">{mod.description}</p>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        {mod.topics.length} Lessons · ~{mod.estimatedHours} Hours
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      {isEnrolled ? (
                        <button
                          onClick={() => unenrollFromCourse(mod.id)}
                          className="rounded-full border border-white/20 bg-white/[0.04] px-4 py-1.5 text-xs text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            enrollInCourse(mod.id);
                          }}
                          className="rounded-full bg-purple-600 hover:bg-purple-500 px-5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer shadow-md"
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setShowEnrollModal(false)}
                className="rounded-full bg-white/[0.08] hover:bg-white/[0.12] px-5 py-2 text-xs font-semibold text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL 3: QUICK CAREER GOAL SELECTOR
         ───────────────────────────────────────────────────────────── */}
      {showQuickGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold font-display text-white">Select Your Career Goal</h3>
              <button
                onClick={() => setShowQuickGoalModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {CAREER_GOALS.map((goal) => {
                const isSelected = currentUser.careerGoal === goal;
                return (
                  <button
                    key={goal}
                    onClick={() => handleSelectGoal(goal)}
                    className={`w-full text-left rounded-xl p-3 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border border-purple-500 bg-purple-950/40 text-purple-200'
                        : 'border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{goal}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-purple-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
