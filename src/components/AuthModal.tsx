import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { CareerGoal } from '../types';
import { CompanyLogo } from './CompanyLogo';
import {
  X,
  UserCheck,
  UserPlus,
  LogIn,
  LogOut,
  Sparkles,
  Building2,
  GraduationCap,
  Briefcase,
  Flame,
  ArrowRight,
  ShieldCheck,
  Trash2,
  RotateCcw,
  AlertCircle,
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

const ACADEMIC_YEARS = [
  'First Year',
  'Second Year',
  'Third Year',
  'Final Year (Graduating 2026/2027)',
];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    students,
    loginStudent,
    signUpStudent,
    signOutStudent,
    isSigningOut,
    setActiveTab,
    resetAllStudentAccounts,
    deleteStudentAccount,
  } = useApp();

  const [activeMode, setActiveMode] = useState<'switch' | 'signup'>('switch');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Form fields for new account
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('Second Year');
  const [careerGoal, setCareerGoal] = useState<CareerGoal>('Software Engineer');
  const [targetCompanyId, setTargetCompanyId] = useState('google');

  if (!isAuthModalOpen) return null;

  const handleSelectStudent = (id: string) => {
    loginStudent(id);
    setIsAuthModalOpen(false);
    setActiveTab('student-dashboard');
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    signUpStudent({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
      college: college.trim() || 'Institute of Technology',
      degree,
      academicYear,
      careerGoal,
      targetCompanyId,
    });

    setIsAuthModalOpen(false);
    setActiveTab('student-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-xl rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 sm:p-8 text-white shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-[80px]" />

        {/* Modal Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Student Career Account
            </h2>
            <p className="text-xs text-[#A5A5B8]">
              Switch active candidate profile or register a new personalized roadmap.
            </p>
          </div>
        </div>

        {/* Active user status card if signed in */}
        {currentUser && (
          <div className="mb-6 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-sm text-purple-200 overflow-hidden">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-full w-full object-cover" />
                ) : (
                  currentUser.name.charAt(0)
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{currentUser.name}</span>
                  <span className="text-[10px] bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full font-mono">
                    Active Student
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {currentUser.degree} · {currentUser.academicYear}
                </div>
              </div>
            </div>

            <button
              onClick={async () => {
                await signOutStudent();
                setIsAuthModalOpen(false);
              }}
              disabled={isSigningOut}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
            </button>
          </div>
        )}

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/[0.06] pb-3">
          <button
            type="button"
            onClick={() => setActiveMode('switch')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeMode === 'switch'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-[#A5A5B8] hover:text-white'
            }`}
          >
            Switch Student Account ({students.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('signup')}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeMode === 'signup'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-[#A5A5B8] hover:text-white'
            }`}
          >
            + Register New Student
          </button>
        </div>

        {/* Tab 1: Student List / Switch */}
        {activeMode === 'switch' ? (
          <div>
            {students.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.12] p-8 text-center bg-white/[0.01]">
                <div className="h-12 w-12 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                  <UserPlus className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Clean State — No Accounts Found</h3>
                <p className="text-xs text-[#A5A5B8] max-w-sm mx-auto mt-1 mb-5 leading-relaxed">
                  All previous test student accounts and personal records have been safely reset. Register a new candidate profile below to begin tracking fresh, authentic progress.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveMode('signup')}
                  className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 px-5 py-2.5 text-xs font-semibold text-white transition-all cursor-pointer shadow-lg shadow-purple-600/30"
                >
                  + Register First Student Account
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {students.map((st) => {
                  const isSelected = currentUser?.id === st.id;
                  const targetComp = COMPANIES_DATA.find((c) => c.id === st.targetCompanyId);

                  return (
                    <div
                      key={st.id}
                      onClick={() => handleSelectStudent(st.id)}
                      className={`group rounded-2xl border p-4 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-950/30 shadow-[0_0_20px_rgba(139,92,246,0.18)]'
                          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.18] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="h-11 w-11 rounded-xl bg-[#09090F] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          {st.avatarUrl ? (
                            <img src={st.avatarUrl} alt={st.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="font-bold text-white text-base">{st.name.charAt(0)}</span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                              {st.name}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#A5A5B8] mt-0.5">
                            {st.degree} · <span className="text-slate-400">{st.academicYear}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono">
                            <span className="text-purple-300 flex items-center gap-1">
                              <Target className="h-3 w-3 text-purple-400" />
                              <span>Target: {targetComp?.name || 'Google'}</span>
                            </span>
                            <span className="text-amber-400 flex items-center gap-1">
                              <Flame className="h-3 w-3" />
                              <span>{st.streakDays}d Streak</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          className="rounded-full bg-white/[0.06] hover:bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors"
                        >
                          {isSelected ? 'View Hub →' : 'Switch'}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteStudentAccount(st.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                          title="Delete this student account and associated data"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Administrative Account Reset Option */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">Testing / Fresh State</span>
                  {showResetConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-rose-300 font-medium">Reset all accounts?</span>
                      <button
                        type="button"
                        onClick={() => {
                          resetAllStudentAccounts();
                          setShowResetConfirm(false);
                        }}
                        className="rounded-full bg-rose-600 hover:bg-rose-500 px-3 py-1 text-[11px] font-bold text-white transition-colors cursor-pointer"
                      >
                        Confirm Reset
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="rounded-full bg-white/[0.06] hover:bg-white/[0.12] px-2.5 py-1 text-[11px] text-slate-300 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset All Student Accounts</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab 2: Register New Student */
          <form onSubmit={handleCreateAccount} className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 text-xs">
            <div>
              <label className="block text-slate-200 font-semibold mb-1">Full Student Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Diksha Paul"
                className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="diksha@college.edu"
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">College / University</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="National Institute of Technology"
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">Degree / Branch</label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
                  <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                  <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                  <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                  <option value="BCA (Bachelor of Computer Applications)">BCA (Bachelor of Computer Applications)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Academic Year</label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  {ACADEMIC_YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">Career Goal</label>
                <select
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value as CareerGoal)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  {CAREER_GOALS.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">Target Placement Company</label>
                <select
                  value={targetCompanyId}
                  onChange={(e) => setTargetCompanyId(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
                >
                  {COMPANIES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveMode('switch')}
                className="rounded-full border border-white/[0.12] px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch Student Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
