import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Competency, CompetencyStatus } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const CompetencyMatrixView: React.FC = () => {
  const {
    competencies,
    updateCompetencyScore,
    activeCompany,
    userProfile,
    setActiveRemediationTopic,
    setActiveTab,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | CompetencyStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [selectedCompForQuiz, setSelectedCompForQuiz] = useState<Competency | null>(null);

  // Relevant competencies for this company & role
  const relevantComps = competencies.filter(
    (c) => c.companiesRequiring.length === 0 || c.companiesRequiring.includes(activeCompany.id)
  );

  const filtered = relevantComps.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    return true;
  });

  const categories = Array.from(new Set(relevantComps.map((c) => c.category)));

  const handleSimulateQuiz = (comp: Competency, score: number) => {
    updateCompetencyScore(comp.id, score, 'Assessment Quiz');
    setSelectedCompForQuiz(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{activeCompany.name}</span>
            <span>/</span>
            <span>{userProfile.careerGoal}</span>
            <span>/</span>
            <span>Skill Gap Analysis</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Role Competency Matrix & Gap Diagnosis
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Transparent comparison of required hiring benchmarks versus your verified evidence. Skills verified via quizzes or coding tasks are distinguished from self-reported data.
          </p>
        </div>

        {/* Status Count Summary */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs shrink-0">
          <div className="text-center">
            <div className="font-bold text-emerald-400 font-mono tabular-nums">
              {relevantComps.filter((c) => c.status === 'DEMONSTRATED').length}
            </div>
            <div className="text-[10px] text-slate-400">Demonstrated</div>
          </div>
          <span className="text-slate-700">·</span>
          <div className="text-center">
            <div className="font-bold text-amber-400 font-mono tabular-nums">
              {relevantComps.filter((c) => c.status === 'PARTIALLY_DEVELOPED').length}
            </div>
            <div className="text-[10px] text-slate-400">Partial</div>
          </div>
          <span className="text-slate-700">·</span>
          <div className="text-center">
            <div className="font-bold text-rose-400 font-mono tabular-nums">
              {relevantComps.filter((c) => c.status === 'MISSING').length}
            </div>
            <div className="text-[10px] text-slate-400">Missing Gaps</div>
          </div>
        </div>
      </div>

      {/* Filter Controls (Segmented Tabs complying with zero-pill rule) */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({relevantComps.length})
          </button>
          <button
            onClick={() => setStatusFilter('DEMONSTRATED')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'DEMONSTRATED'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Demonstrated
          </button>
          <button
            onClick={() => setStatusFilter('PARTIALLY_DEVELOPED')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'PARTIALLY_DEVELOPED'
                ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Partially Developed
          </button>
          <button
            onClick={() => setStatusFilter('MISSING')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'MISSING'
                ? 'bg-rose-500/20 text-rose-300 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing Gaps
          </button>
        </div>

        {/* Category selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Domain:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Competency Table Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Competency Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Role Priority</th>
                <th className="py-3 px-3">Assessed vs Target</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Evidence Source</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((comp) => {
                const isDemonstrated = comp.status === 'DEMONSTRATED';
                const isPartial = comp.status === 'PARTIALLY_DEVELOPED';
                const isMissing = comp.status === 'MISSING';

                return (
                  <tr key={comp.id} className="hover:bg-slate-850/50 transition-colors">
                    {/* Name & Prerequisites */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{comp.name}</div>
                      {comp.prerequisites.length > 0 && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Prereqs: {comp.prerequisites.join(', ')}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400 mt-1 max-w-sm">
                        {comp.recommendedNextAction}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 text-slate-300 font-medium whitespace-nowrap">
                      {comp.category}
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`font-mono text-[10px] font-semibold uppercase ${
                          comp.importanceForRole === 'Critical'
                            ? 'text-rose-400'
                            : comp.importanceForRole === 'High'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {comp.importanceForRole}
                      </span>
                    </td>

                    {/* Proficiency comparison */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              isDemonstrated
                                ? 'bg-emerald-400'
                                : isPartial
                                ? 'bg-amber-400'
                                : 'bg-rose-500'
                            }`}
                            style={{ width: `${comp.assessedProficiency}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums text-slate-300">
                          {comp.assessedProficiency}% / {comp.requiredProficiency}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {isDemonstrated && (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Demonstrated</span>
                        </span>
                      )}
                      {isPartial && (
                        <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Partial</span>
                        </span>
                      )}
                      {isMissing && (
                        <span className="inline-flex items-center gap-1.5 text-rose-400 font-medium">
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Missing</span>
                        </span>
                      )}
                      {comp.status === 'NOT_ASSESSED' && (
                        <span className="inline-flex items-center gap-1.5 text-slate-500 font-medium">
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>Not Assessed</span>
                        </span>
                      )}
                    </td>

                    {/* Evidence Source */}
                    <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                      <span>{comp.evidenceSource}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {isMissing || isPartial ? (
                          <button
                            onClick={() => setActiveRemediationTopic(comp.name)}
                            className="rounded border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                          >
                            Adaptive Plan
                          </button>
                        ) : null}

                        <button
                          onClick={() => setSelectedCompForQuiz(comp)}
                          className="rounded border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          Diagnostic Quiz
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Diagnostic Quiz Modal */}
      {selectedCompForQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">
              Diagnostic Assessment for {selectedCompForQuiz.name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Simulate completing an assessment checkpoint to calibrate your demonstrated score for {activeCompany.name}.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSimulateQuiz(selectedCompForQuiz, 90)}
                className="w-full text-left rounded-lg border border-slate-800 bg-slate-950 p-3 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all"
              >
                <div className="text-xs font-semibold text-emerald-400">Mastery Level (Score: 90%)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Solved challenge with optimal Big-O bounds and 100% test cases passed.
                </div>
              </button>

              <button
                onClick={() => handleSimulateQuiz(selectedCompForQuiz, 65)}
                className="w-full text-left rounded-lg border border-slate-800 bg-slate-950 p-3 hover:border-amber-500/50 hover:bg-amber-950/20 transition-all"
              >
                <div className="text-xs font-semibold text-amber-400">Intermediate Level (Score: 65%)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Core algorithm correct, but missed boundary edge cases or sub-optimal space complexity.
                </div>
              </button>

              <button
                onClick={() => handleSimulateQuiz(selectedCompForQuiz, 35)}
                className="w-full text-left rounded-lg border border-slate-800 bg-slate-950 p-3 hover:border-rose-500/50 hover:bg-rose-950/20 transition-all"
              >
                <div className="text-xs font-semibold text-rose-400">Foundational Gaps (Score: 35%)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Struggled with recursive transitions or runtime constraints.
                </div>
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedCompForQuiz(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
