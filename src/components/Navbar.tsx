import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  SlidersHorizontal,
  Palette,
  Flame,
  LogIn,
  LogOut,
  UserCheck,
  BookOpen,
  LayoutDashboard,
  X,
  CheckCircle2,
  ChevronDown,
  Loader2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeCompany,
    setIsCustomizingProfile,
    overallReadinessPercentage,
    currentUser,
    setIsAuthModalOpen,
    setIsThemeModalOpen,
    signOutStudent,
    isSigningOut,
    signoutNotification,
    clearSignoutNotification,
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOutClick = async () => {
    try {
      await signOutStudent();
      setIsUserMenuOpen(false);
    } catch {
      // Error handled inside context with honest notification
    }
  };

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'student-dashboard', label: 'Student Hub' },
    { id: 'resources', label: 'Resource Library' },
    { id: 'dashboard', label: 'Company Prep' },
    { id: 'stages', label: 'Hiring Stages' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'competencies', label: 'Competencies' },
    { id: 'practice', label: 'Practice' },
    { id: 'aptitude', label: 'Aptitude' },
    { id: 'mock-interview', label: 'AI Mock' },
    { id: 'tracker', label: 'Interviews' },
    { id: 'compare', label: 'Compare' },
  ];

  return (
    <>
      {/* Sign-out Toast Notification */}
      {signoutNotification && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-200 px-4 py-2.5 text-xs flex items-center justify-between animate-fade-in shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center gap-2 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{signoutNotification}</span>
          </div>
          <button
            onClick={clearSignoutNotification}
            className="text-emerald-400 hover:text-white p-1 rounded-full cursor-pointer"
            aria-label="Dismiss sign-out notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07070B]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand title (One line wordmark with orbital glyph) */}
          <button
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M3 12a9 9 0 0 1 15-6.7L19 4" />
                <path d="M21 12a9 9 0 0 1-15 6.7L5 20" />
              </svg>
            </div>
            <span className="font-display">
              SkillPath<span className="text-purple-400 font-medium ml-1">AI</span>
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3.5 text-xs font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold border-b-2 border-purple-500'
                      : 'text-[#A5A5B8] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Customizer + Student Profile Dropdown) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Target Company Pill */}
            <button
              onClick={() => setIsCustomizingProfile(true)}
              className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0E0E18] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-purple-500/60 hover:bg-purple-950/20 transition-all whitespace-nowrap cursor-pointer shadow-sm"
              title="Change Target Company or Role"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: activeCompany.logoColor }}
              />
              <span className="font-semibold text-white">{activeCompany.name}</span>
              <span className="text-slate-500">·</span>
              <span className="text-purple-300 font-mono tabular-nums">{overallReadinessPercentage}%</span>
              <SlidersHorizontal className="h-3 w-3 text-slate-400 ml-0.5" />
            </button>

            {/* Theme Palette Button */}
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="p-2 rounded-full border border-white/[0.12] bg-[#0E0E18] text-slate-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-950/20 transition-colors cursor-pointer"
              title="Theme & Appearance"
              aria-label="Theme settings"
            >
              <Palette className="h-3.5 w-3.5 text-purple-400" />
            </button>

            {/* Student Profile / Account Dropdown */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/20 px-2.5 sm:px-3 py-1 text-xs text-white hover:bg-purple-900/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                  title="Candidate Account Menu"
                >
                  <div className="h-6 w-6 rounded-full overflow-hidden bg-purple-600/40 flex items-center justify-center font-bold text-[10px] text-white">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-full w-full object-cover" />
                    ) : (
                      currentUser.name ? currentUser.name.charAt(0) : 'S'
                    )}
                  </div>
                  <span className="font-semibold hidden md:inline truncate max-w-[100px]">{currentUser.name}</span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-mono text-[11px] font-bold">
                    <Flame className="h-3 w-3 fill-amber-400" />
                    <span>{currentUser.streakDays}d</span>
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/[0.12] bg-[#09090F] p-2 text-white shadow-2xl z-50 animate-fade-in space-y-1">
                    {/* User summary header */}
                    <div className="px-3 py-2.5 border-b border-white/[0.08]">
                      <div className="font-bold text-xs text-white truncate">{currentUser.name}</div>
                      <div className="text-[11px] text-[#A5A5B8] truncate">{currentUser.email}</div>
                      <div className="text-[10px] text-purple-300 font-mono mt-1">
                        {currentUser.careerGoal} · {currentUser.streakDays}d Streak
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('student-dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <LayoutDashboard className="h-4 w-4 text-purple-400" />
                      <span>Student Hub Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('resources');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <span>Resource Library</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsThemeModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <Palette className="h-4 w-4 text-indigo-400" />
                      <span>Personalize Theme</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors cursor-pointer text-left"
                    >
                      <UserCheck className="h-4 w-4 text-amber-400" />
                      <span>Switch Candidate Account</span>
                    </button>

                    <div className="pt-1 border-t border-white/[0.08]">
                      <button
                        onClick={handleSignOutClick}
                        disabled={isSigningOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 rounded-xl transition-colors cursor-pointer text-left font-semibold"
                      >
                        {isSigningOut ? (
                          <Loader2 className="h-4 w-4 animate-spin text-rose-400" />
                        ) : (
                          <LogOut className="h-4 w-4 text-rose-400" />
                        )}
                        <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer shadow-md"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-bar for mobile/tablet screen navigation */}
        <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-white/[0.06] bg-[#09090F] no-scrollbar">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white/[0.04] text-[#A5A5B8] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {currentUser && (
            <button
              onClick={handleSignOutClick}
              disabled={isSigningOut}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 whitespace-nowrap flex items-center gap-1"
            >
              <LogOut className="h-3 w-3" />
              <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
            </button>
          )}
        </div>
      </header>
    </>
  );
};
