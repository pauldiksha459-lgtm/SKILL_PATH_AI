import React from 'react';
import { useApp } from '../context/AppContext';
import { CompanyLogo } from './CompanyLogo';
import {
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  BookOpen,
  Code2,
  Target,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const {
    userProfile,
    activeCompany,
    competencies,
    roadmaps,
    interviews,
    setActiveTab,
    setIsCustomizingProfile,
    overallReadinessPercentage,
    setActiveRemediationTopic,
  } = useApp();

  // Find recruitment program details
  const currentProgram =
    activeCompany.hiringPrograms.find((p) => p.id === userProfile.recruitmentProgramId) ||
    activeCompany.hiringPrograms[0];

  // Competency breakdown
  const relevantComps = competencies.filter(
    (c) => c.companiesRequiring.length === 0 || c.companiesRequiring.includes(activeCompany.id)
  );

  const demonstratedComps = relevantComps.filter((c) => c.status === 'DEMONSTRATED');
  const partiallyDeveloped = relevantComps.filter((c) => c.status === 'PARTIALLY_DEVELOPED');
  const missingComps = relevantComps.filter((c) => c.status === 'MISSING');
  const notAssessed = relevantComps.filter((c) => c.status === 'NOT_ASSESSED');

  // Next recommended action
  const topCriticalGap =
    missingComps.find((c) => c.importanceForRole === 'Critical') ||
    partiallyDeveloped.find((c) => c.importanceForRole === 'Critical') ||
    missingComps[0] ||
    partiallyDeveloped[0];

  // Daily study schedule calculation based on available daily study time (e.g. 1 hour/day)
  const dailyTasks = [
    {
      time: '25 min',
      category: 'Concept & Invariants',
      title: topCriticalGap ? `Study ${topCriticalGap.name}` : 'Review Dynamic Programming Memoization',
      action: () => {
        if (topCriticalGap) {
          setActiveRemediationTopic(topCriticalGap.name);
        } else {
          setActiveTab('roadmap');
        }
      },
    },
    {
      time: '25 min',
      category: 'Hands-on Practice',
      title: 'Solve 1 Medium Coding Challenge in Python/Java',
      action: () => setActiveTab('practice'),
    },
    {
      time: '10 min',
      category: 'Revision & Flashcards',
      title: 'Review System Design / Core CS Placement Notes',
      action: () => setActiveTab('competencies'),
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Mandatory Transparency & Official Verification Disclaimer Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Verification Standard: </span>
              {activeCompany.name} guidance is cross-referenced with official early-career portals ({activeCompany.lastVerifiedDate}).
              <span className="text-slate-400 ml-1">
                Hiring processes vary by job title, location, recruitment program, and campus season. Never rely on an estimated process as guaranteed.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <a
              href={activeCompany.earlyCareerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Official Careers Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Company Hero & Target Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: activeCompany.logoColor }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2 text-xs text-slate-400">
              <span className="font-medium text-slate-300">{activeCompany.category}</span>
              <span>·</span>
              <span>{userProfile.degree}</span>
              <span>·</span>
              <span>{userProfile.academicYear}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <CompanyLogo
                companyId={activeCompany.id}
                name={activeCompany.name}
                size="md"
                forceLightBg={activeCompany.logoBg === 'light'}
              />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeCompany.name}
              </h1>
              <span className="text-xl sm:text-2xl text-slate-500 font-light">—</span>
              <span className="text-xl sm:text-2xl font-semibold text-indigo-400">
                {userProfile.careerGoal}
              </span>
            </div>

            {currentProgram && (
              <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                <span className="font-semibold text-white">Target Track: </span>
                {currentProgram.name}. {currentProgram.overview}
              </p>
            )}

            {/* Compensation & Campus Package Insights */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Internship: </span>
                <span className="font-semibold text-slate-200 font-mono tabular-nums">
                  {activeCompany.packageInsights.internshipStipendPerMonth}
                </span>
              </div>
              <span>·</span>
              <div>
                <span className="text-slate-500">Full-Time Package: </span>
                <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                  {activeCompany.packageInsights.fullTimeCTCLPA}
                </span>
              </div>
              <span>·</span>
              <div>
                <span className="text-slate-500">India Locations: </span>
                <span className="text-slate-300">{activeCompany.packageInsights.locationInIndia.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Quick Target Switcher button & Readiness score card */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
            <div className="text-left lg:text-right">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Readiness</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                  {overallReadinessPercentage}%
                </span>
                <span className="text-xs text-slate-400 font-mono">/ 100%</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {demonstratedComps.length} of {relevantComps.length} competencies verified
              </div>
            </div>

            <button
              onClick={() => setIsCustomizingProfile(true)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-sm"
            >
              Switch Company / Track
            </button>
          </div>
        </div>
      </div>

      {/* 3. Three-Column Strategic Insight Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Competency Gaps & Next Remediation */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                <span>Competency Status</span>
              </h2>
              <button
                onClick={() => setActiveTab('competencies')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                View Matrix
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Demonstrated Mastery</span>
                <span className="font-semibold text-emerald-400 font-mono tabular-nums">
                  {demonstratedComps.length} skills
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Partially Developed</span>
                <span className="font-semibold text-amber-400 font-mono tabular-nums">
                  {partiallyDeveloped.length} skills
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <span className="text-slate-300">Missing Competencies</span>
                <span className="font-semibold text-rose-400 font-mono tabular-nums">
                  {missingComps.length} skills
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Not Yet Assessed</span>
                <span className="font-semibold text-slate-500 font-mono tabular-nums">
                  {notAssessed.length} skills
                </span>
              </div>
            </div>

            {topCriticalGap && (
              <div className="mt-5 rounded-lg border border-rose-950/60 bg-rose-950/20 p-3.5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-rose-300">Highest Priority Gap</span>
                  <span className="text-[10px] text-rose-400 uppercase font-mono">
                    {topCriticalGap.importanceForRole}
                  </span>
                </div>
                <p className="text-xs font-medium text-white">{topCriticalGap.name}</p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {topCriticalGap.recommendedNextAction}
                </p>
                <button
                  onClick={() => setActiveRemediationTopic(topCriticalGap.name)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white transition-colors"
                >
                  <span>Launch 8-Step Adaptive Pathway</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Column 2: Daily Study Plan (Calculated from Available Study Time) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400" />
                <span>Today’s Study Plan ({userProfile.dailyStudyTimeHours}h / day)</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Paced for {userProfile.currentLevel}</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Customized for {userProfile.degree.split('(')[0]} student targeting {activeCompany.name} in {userProfile.preferredLanguage}.
            </p>

            <div className="space-y-2.5">
              {dailyTasks.map((task, idx) => (
                <div
                  key={idx}
                  onClick={task.action}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/60 p-3 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold">
                      {task.category}
                    </span>
                    <h4 className="text-xs font-semibold text-white">{task.title}</h4>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-300 tabular-nums shrink-0">
                    {task.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="mt-4 flex items-center justify-center gap-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span>Explore Full Multi-Week Roadmap</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Column 3: Hiring Stages & Interview Round Quick Access */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span>Hiring Stages & Rounds</span>
              </h2>
              <button
                onClick={() => setActiveTab('stages')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                All Stages
              </button>
            </div>

            <div className="space-y-2">
              {activeCompany.hiringStages.slice(0, 4).map((stage) => {
                const isVerified = stage.verificationStatus === 'VERIFIED_OFFICIAL';
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveTab('stages')}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/70 bg-slate-950/40 hover:bg-slate-850 hover:border-slate-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] font-bold text-slate-300 font-mono shrink-0">
                        {stage.stageNumber}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{stage.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{stage.purpose}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] shrink-0 font-medium ${
                        isVerified ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {isVerified ? 'Official' : 'Reported'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setActiveTab('practice')}
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors text-center"
            >
              Coding Challenges
            </button>
            <button
              onClick={() => setActiveTab('mock-interview')}
              className="flex-1 rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors text-center"
            >
              AI Mock Interview
            </button>
          </div>
        </div>
      </div>

      {/* 4. Company Specific Interview Tips & Indian Campus Insights */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-sm font-bold text-white mb-3">
          Official & Campus Placement Insights for {activeCompany.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200">Recommended Preparation Strategy:</h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              {activeCompany.officialInterviewTips.map((tip, i) => (
                <li key={i} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200">Competency Weight Distribution:</h4>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span>Data Structures & Algorithms</span>
                <span className="text-white tabular-nums">{activeCompany.competencyWeights.dsa}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{ width: `${activeCompany.competencyWeights.dsa}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Cognitive Aptitude & Speed Reasoning</span>
                <span className="text-white tabular-nums">{activeCompany.competencyWeights.aptitude}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{ width: `${activeCompany.competencyWeights.aptitude}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Core CS (OS, DBMS, Networks, OOP)</span>
                <span className="text-white tabular-nums">{activeCompany.competencyWeights.coreCS}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${activeCompany.competencyWeights.coreCS}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
