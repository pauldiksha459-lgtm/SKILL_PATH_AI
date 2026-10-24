import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CompanyDashboard } from './components/CompanyDashboard';
import { HiringStagesView } from './components/HiringStagesView';
import { RoadmapView } from './components/RoadmapView';
import { CompetencyMatrixView } from './components/CompetencyMatrixView';
import { PracticeCentre } from './components/PracticeCentre';
import { AptitudeSimulator } from './components/AptitudeSimulator';
import { MockInterviewView } from './components/MockInterviewView';
import { InterviewTrackerView } from './components/InterviewTrackerView';
import { CompanyComparisonView } from './components/CompanyComparisonView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { ResourceCatalogView } from './components/ResourceCatalogView';
import { SkillResourceDetailView } from './components/SkillResourceDetailView';
import { OnboardingModal } from './components/OnboardingModal';
import { AdaptiveRemediationModal } from './components/AdaptiveRemediationModal';
import { AuthModal } from './components/AuthModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, setIsAuthModalOpen } = useApp();

  const theme = currentUser?.themeSettings || {
    accent: 'violet',
    background: 'obsidian',
    glow: 'vivid',
    density: 'comfortable',
  };

  const bgToneClass =
    theme.background === 'pure-black'
      ? 'bg-black'
      : theme.background === 'midnight'
      ? 'bg-[#090D18]'
      : 'bg-[#07070B]';

  const densityClass = theme.density === 'compact' ? 'py-5' : 'py-8';

  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage />
        <OnboardingModal />
        <AdaptiveRemediationModal />
        <AuthModal />
        <ThemeCustomizerModal />
      </>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgToneClass} text-[#F8F8FC] transition-colors duration-200`}>
      <Navbar />

      <main className={`flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${densityClass}`}>
        {activeTab === 'student-dashboard' && <StudentDashboardView />}
        {activeTab === 'resources' && <ResourceCatalogView />}
        {activeTab === 'topic-detail' && <SkillResourceDetailView />}
        {activeTab === 'dashboard' && <CompanyDashboard />}
        {activeTab === 'stages' && <HiringStagesView />}
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'competencies' && <CompetencyMatrixView />}
        {activeTab === 'practice' && <PracticeCentre />}
        {activeTab === 'aptitude' && <AptitudeSimulator />}
        {activeTab === 'mock-interview' && <MockInterviewView />}
        {activeTab === 'tracker' && <InterviewTrackerView />}
        {activeTab === 'compare' && <CompanyComparisonView />}
      </main>

      {/* Clean Footer adhering to design constitution */}
      <footer className="border-t border-white/[0.08] bg-[#07070B] py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A5A5B8]">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-white">SkillPath AI</span>
            <span>·</span>
            <span>AI-Powered Career Roadmap & Placement Platform</span>
          </div>

          <div className="flex items-center gap-6 text-[#A5A5B8]">
            <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors cursor-pointer">
              Landing Page
            </button>
            <button onClick={() => setActiveTab('student-dashboard')} className="hover:text-white transition-colors cursor-pointer text-purple-400 font-semibold">
              Student Hub
            </button>
            <button onClick={() => setActiveTab('resources')} className="hover:text-white transition-colors cursor-pointer text-purple-300 font-medium">
              Resource Library
            </button>
            <button onClick={() => setActiveTab('stages')} className="hover:text-white transition-colors cursor-pointer">
              Hiring Stages
            </button>
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-white transition-colors cursor-pointer">
              Roadmaps
            </button>
            <button onClick={() => setActiveTab('tracker')} className="hover:text-white transition-colors cursor-pointer">
              Interview Tracker
            </button>
            <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors cursor-pointer">
              Compare Companies
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <OnboardingModal />
      <AdaptiveRemediationModal />
      <AuthModal />
      <ThemeCustomizerModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
