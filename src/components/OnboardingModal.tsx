import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { CareerGoal, ExperienceLevel, ProgrammingLanguage } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { X, Search, Check, Sparkles, Building2, HelpCircle } from 'lucide-react';

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
  'Other technical role',
];

const DEGREES = [
  'B.Tech / B.E Computer Science & Engineering (CSE)',
  'B.Tech / B.E Electronics & Communication (ECE)',
  'B.Tech / B.E Information Technology (IT)',
  'B.Tech / B.E Electrical / Mechanical / Civil',
  'BCA (Bachelor of Computer Applications)',
  'MCA (Master of Computer Applications)',
  'M.Tech Computer Science / AI',
  'B.Sc / M.Sc Computer Science / IT',
];

const ACADEMIC_YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year (Graduating 2026/2027)'];

const LANGUAGES: ProgrammingLanguage[] = ['Python', 'Java', 'C++', 'JavaScript', 'Go'];

const LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export const OnboardingModal: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    isCustomizingProfile,
    setIsCustomizingProfile,
    setTargetCompany,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal>(userProfile.careerGoal);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(userProfile.targetCompanyId);
  const [additionalCompanies, setAdditionalCompanies] = useState<string[]>(userProfile.additionalCompanyIds);
  const [selectedDegree, setSelectedDegree] = useState(userProfile.degree);
  const [selectedYear, setSelectedYear] = useState(userProfile.academicYear);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel>(userProfile.currentLevel);
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>(userProfile.preferredLanguage);
  const [dailyHours, setDailyHours] = useState(userProfile.dailyStudyTimeHours);
  const [targetDate, setTargetDate] = useState(userProfile.targetDate);
  const [programId, setProgramId] = useState(userProfile.recruitmentProgramId || '');
  const [customJobDesc, setCustomJobDesc] = useState(userProfile.customJobDescription || '');

  if (!isCustomizingProfile) return null;

  const filteredCompanies = COMPANIES_DATA.filter((comp) =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCompanyObj = COMPANIES_DATA.find((c) => c.id === selectedCompanyId) || COMPANIES_DATA[0];

  const handleSave = () => {
    setTargetCompany(selectedCompanyId);
    updateUserProfile({
      careerGoal: selectedGoal,
      targetCompanyId: selectedCompanyId,
      additionalCompanyIds: additionalCompanies,
      degree: selectedDegree,
      academicYear: selectedYear,
      currentLevel: selectedLevel,
      preferredLanguage: selectedLang,
      dailyStudyTimeHours: dailyHours,
      targetDate: targetDate,
      recruitmentProgramId: programId || selectedCompanyObj.hiringPrograms[0]?.id || '',
      customJobDescription: customJobDesc,
    });
    setActiveTab('dashboard');
    setIsCustomizingProfile(false);
  };

  const toggleAdditionalCompany = (id: string) => {
    if (id === selectedCompanyId) return;
    if (additionalCompanies.includes(id)) {
      setAdditionalCompanies(additionalCompanies.filter((c) => c !== id));
    } else {
      if (additionalCompanies.length >= 3) {
        setAdditionalCompanies([...additionalCompanies.slice(1), id]);
      } else {
        setAdditionalCompanies([...additionalCompanies, id]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-8 w-full max-w-4xl rounded-2xl border border-white/10 bg-[#09090F] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold mb-0.5">
              <span>SkillPath AI</span>
              <span>·</span>
              <span>Personalized Career Engine</span>
            </div>
            <h2 className="text-lg font-bold text-white">Target Placement & Curriculum Configuration</h2>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Configure your desired role, target company, and study pacing. Mastered skills automatically transfer.
            </p>
          </div>
          <button
            onClick={() => setIsCustomizingProfile(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6">
          {/* Section 1: Career Goal */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Desired Career or Job Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {CAREER_GOALS.map((goal) => {
                const isSelected = selectedGoal === goal;
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setSelectedGoal(goal)}
                    className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{goal}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Primary Target Company */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Primary Target Company
              </label>
              <span className="text-xs text-slate-400">
                Active target determines primary roadmap & hiring stages
              </span>
            </div>

            {/* Search filter */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search companies (Google, Microsoft, Amazon, TCS, Infosys, Wipro...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Company selection grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredCompanies.map((comp) => {
                const isPrimary = selectedCompanyId === comp.id;
                const isSecondary = additionalCompanies.includes(comp.id);
                return (
                  <div
                    key={comp.id}
                    onClick={() => {
                      setSelectedCompanyId(comp.id);
                      setProgramId(comp.hiringPrograms[0]?.id || '');
                    }}
                    className={`group relative flex flex-col justify-between rounded-lg border p-2.5 cursor-pointer transition-all ${
                      isPrimary
                        ? 'border-indigo-500 bg-indigo-500/15 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-2 truncate">
                        <CompanyLogo
                          companyId={comp.id}
                          name={comp.name}
                          size="xs"
                          forceLightBg={comp.logoBg === 'light'}
                        />
                        <span className="text-xs font-semibold text-white truncate">{comp.name}</span>
                      </div>
                      {isPrimary && (
                        <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                      <span>{comp.category}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAdditionalCompany(comp.id);
                        }}
                        className={`text-[10px] hover:text-white transition-colors ${
                          isSecondary ? 'text-amber-400 font-medium' : 'text-slate-500'
                        }`}
                        title="Add to comparison list"
                      >
                        {isSecondary ? 'Comparing' : '+ Compare'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Recruitment Program & Job Description */}
          {selectedCompanyObj.hiringPrograms.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Hiring Program / Cadre at {selectedCompanyObj.name}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCompanyObj.hiringPrograms.map((prog) => {
                  const isSelected = programId === prog.id;
                  return (
                    <div
                      key={prog.id}
                      onClick={() => setProgramId(prog.id)}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{prog.name}</h4>
                        {isSelected && <Check className="h-4 w-4 text-indigo-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{prog.overview}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block">
                        Eligibility: {prog.eligibility}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional Job Description customizer */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Custom Job Posting / Requirements (Optional)
            </label>
            <p className="text-[11px] text-slate-400 mb-2">
              If you have a specific job description or on-campus drive notice, paste it here to tailor focus modules.
            </p>
            <textarea
              rows={2}
              value={customJobDesc}
              onChange={(e) => setCustomJobDesc(e.target.value)}
              placeholder="e.g. Requires Python, REST APIs, SQL, and understanding of basic microservices architecture..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Section 4: Academic Background & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Academic Degree & Branch
              </label>
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {DEGREES.map((d) => (
                  <option key={d} value={d} className="bg-slate-900">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {ACADEMIC_YEARS.map((y) => (
                  <option key={y} value={y} className="bg-slate-900">
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 5: Current Level, Language & Daily Study Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Current Technical Level
              </label>
              <div className="flex gap-1.5">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${
                      selectedLevel === lvl
                        ? 'border-indigo-500 bg-indigo-500/20 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Primary Programming Language
              </label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as ProgrammingLanguage)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l} className="bg-slate-900">
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Daily Study Time ({dailyHours} {dailyHours === 1 ? 'hour' : 'hours'}/day)
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDailyHours(h)}
                    className={`flex-1 rounded-lg border py-2 text-xs font-medium font-mono tabular-nums transition-colors ${
                      dailyHours === h
                        ? 'border-indigo-500 bg-indigo-500/20 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {h}h
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 px-6 py-4 rounded-b-2xl">
          <div className="text-xs text-slate-400">
            Switching target preserves already demonstrated competencies while adapting priorities.
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsCustomizingProfile(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-purple-600 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-purple-500 transition-colors cursor-pointer"
              >
                Apply & Launch Roadmap
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
