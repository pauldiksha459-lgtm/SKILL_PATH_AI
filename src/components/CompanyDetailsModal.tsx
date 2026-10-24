import React, { useState } from 'react';
import { CompanyProfile, CareerGoal, ExperienceLevel, ProgrammingLanguage } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MapPin,
  Banknote,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

interface CompanyDetailsModalProps {
  company: CompanyProfile | null;
  onClose: () => void;
}

const ACADEMIC_YEARS = [
  'First Year',
  'Second Year',
  'Third Year',
  'Final Year (Graduating 2026/2027)',
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
const PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = ['Python', 'Java', 'C++', 'JavaScript', 'Go'];

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ company, onClose }) => {
  const { userProfile, updateUserProfile, setTargetCompany, setActiveTab } = useApp();

  if (!company) return null;

  const [selectedRole, setSelectedRole] = useState<CareerGoal>(
    company.supportedRoles.includes(userProfile.careerGoal)
      ? userProfile.careerGoal
      : company.supportedRoles[0] || 'Software Engineer'
  );
  const [selectedYear, setSelectedYear] = useState(userProfile.academicYear);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel>(userProfile.currentLevel);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>(
    userProfile.preferredLanguage
  );
  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    company.hiringPrograms[0]?.id || ''
  );

  const handleBuildRoadmap = () => {
    setTargetCompany(company.id);
    updateUserProfile({
      careerGoal: selectedRole,
      targetCompanyId: company.id,
      academicYear: selectedYear,
      currentLevel: selectedLevel,
      preferredLanguage: selectedLanguage,
      recruitmentProgramId: selectedProgramId,
    });
    onClose();
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/[0.12] bg-[#09090F] p-6 sm:p-8 text-white shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Violet ambient glow in background */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/15 blur-[80px]" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Company Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <CompanyLogo
              companyId={company.id}
              name={company.name}
              size="lg"
              forceLightBg={company.logoBg === 'light'}
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  {company.name}
                </h2>
                <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Official Verified</span>
                </span>
              </div>
              <p className="text-xs text-purple-300 font-mono mt-0.5">
                {company.industryCategory} · HQ: {company.headquarters}
              </p>
              <p className="text-xs text-[#A5A5B8] mt-1.5 leading-relaxed max-w-md">
                {company.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Compensation & Program Insights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Banknote className="h-3 w-3 text-emerald-400" />
              <span>Full-Time CTC</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono mt-1">
              {company.packageInsights.fullTimeCTCLPA.split('(')[0]}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-purple-400" />
              <span>Internship Stipend</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 font-mono mt-1">
              {company.packageInsights.internshipStipendPerMonth}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Layers className="h-3 w-3 text-indigo-400" />
              <span>Interview Rounds</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-purple-300 font-mono mt-1">
              {company.hiringStages.length} Verified Stages
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          {/* Target Role Selector */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-purple-400" />
              <span>Target Role at {company.name}</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {company.supportedRoles.map((role) => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    type="button"
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`text-left rounded-xl border p-2.5 text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-950/40 text-white shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/[0.18] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{role}</span>
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Year & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-2">
                <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                <span>Academic Year</span>
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-xl border border-white/[0.12] bg-[#0E0E18] p-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                {ACADEMIC_YEARS.map((y) => (
                  <option key={y} value={y} className="bg-[#09090F] text-white">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span>Current Level</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {EXPERIENCE_LEVELS.map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-lg border py-2 text-center text-xs font-medium transition-colors cursor-pointer ${
                      selectedLevel === level
                        ? 'border-purple-500 bg-purple-950/40 text-white'
                        : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-2">
              Preferred Practice Language
            </label>
            <div className="flex flex-wrap gap-2">
              {PROGRAMMING_LANGUAGES.map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-mono font-medium transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'border-purple-500 bg-purple-950/40 text-purple-200'
                      : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Official Hiring Track / Program */}
          {company.hiringPrograms.length > 0 && (
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                Recruitment Program Track
              </label>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-xs space-y-1">
                <div className="font-semibold text-purple-300 font-mono">
                  {company.hiringPrograms[0].name}
                </div>
                <p className="text-[11px] text-[#A5A5B8] leading-relaxed">
                  {company.hiringPrograms[0].overview}
                </p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Eligibility: <span className="text-slate-300">{company.hiringPrograms[0].eligibility}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={company.officialCareersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Visit {company.name} Careers</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-full border border-white/[0.12] px-5 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBuildRoadmap}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 px-6 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build My Preparation Roadmap</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
