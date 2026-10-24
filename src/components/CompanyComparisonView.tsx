import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { CompanyProfile } from '../types';
import { CompanyLogo } from './CompanyLogo';
import {
  Columns3,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
} from 'lucide-react';

export const CompanyComparisonView: React.FC = () => {
  const { userProfile, activeCompany, setTargetCompany, competencies } = useApp();

  // Pick up to 3 companies to compare (defaults to activeCompany + first 2 in additionalCompanyIds)
  const [comparedCompanyIds, setComparedCompanyIds] = useState<string[]>([
    activeCompany.id,
    userProfile.additionalCompanyIds[0] || (activeCompany.id === 'google' ? 'amazon' : 'google'),
    userProfile.additionalCompanyIds[1] || (activeCompany.id === 'tcs' ? 'microsoft' : 'tcs'),
  ]);

  const comparedCompanies = comparedCompanyIds
    .map((id) => COMPANIES_DATA.find((c) => c.id === id))
    .filter(Boolean) as CompanyProfile[];

  const handleSelectSlot = (slotIdx: number, newCompanyId: string) => {
    const updated = [...comparedCompanyIds];
    updated[slotIdx] = newCompanyId;
    setComparedCompanyIds(updated);
  };

  // Find shared competencies required by all selected companies
  const sharedCompetencies = competencies.filter((comp) => {
    return comparedCompanies.every(
      (c) => comp.companiesRequiring.length === 0 || comp.companiesRequiring.includes(c.id)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Target Role: {userProfile.careerGoal}</span>
            <span>/</span>
            <span>Multi-Company Requirement Comparison</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Compare Target Companies & Recruitment Pipelines
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Evaluate skill gap overlap, common preparation modules, and distinct hiring stages across target companies. Mastered competencies carry over across all targets.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Comparing <span className="font-semibold text-white">{comparedCompanies.length}</span> companies
        </div>
      </div>

      {/* Selector Row for 3 Comparison Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((slotIdx) => {
          const currentComp = comparedCompanies[slotIdx];
          return (
            <div key={slotIdx} className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Company Slot {slotIdx + 1}
              </label>
              <select
                value={currentComp?.id || ''}
                onChange={(e) => handleSelectSlot(slotIdx, e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs font-semibold text-white focus:outline-none"
              >
                {COMPANIES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                {comparedCompanies.map((comp) => (
                  <th key={comp.id} className="py-3 px-4 w-1/4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CompanyLogo
                          companyId={comp.id}
                          name={comp.name}
                          size="xs"
                          forceLightBg={comp.logoBg === 'light'}
                        />
                        <span className="font-bold text-white text-sm">{comp.name}</span>
                      </div>
                      {comp.id === activeCompany.id && (
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                          Active
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {/* Row 1: Recruitment Program */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Campus Hiring Track
                </td>
                {comparedCompanies.map((comp) => (
                  <td key={comp.id} className="py-3.5 px-4 text-slate-200">
                    <div className="font-semibold text-white">
                      {comp.hiringPrograms[0]?.name || 'Early Career Engineering'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                      {comp.hiringPrograms[0]?.overview}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 2: Estimated Student Readiness */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Your Estimated Readiness
                </td>
                {comparedCompanies.map((comp) => {
                  const reqs = competencies.filter(
                    (c) => c.companiesRequiring.length === 0 || c.companiesRequiring.includes(comp.id)
                  );
                  const tot = reqs.length * 100;
                  const scored = reqs.reduce((s, c) => s + c.assessedProficiency, 0);
                  const pct = tot > 0 ? Math.round((scored / tot) * 100) : 60;

                  return (
                    <td key={comp.id} className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-base text-white tabular-nums">
                          {pct}%
                        </span>
                        <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 font-mono">
                        {reqs.filter((c) => c.status === 'DEMONSTRATED').length} of {reqs.length} skills verified
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* Row 3: Assessment Emphasis Weights */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Assessment Weight Emphasis
                </td>
                {comparedCompanies.map((comp) => (
                  <td key={comp.id} className="py-3.5 px-4 text-slate-300 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">DSA & Algorithms:</span>
                      <span className="text-white font-semibold">{comp.competencyWeights.dsa}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cognitive Aptitude:</span>
                      <span className="text-amber-400 font-semibold">{comp.competencyWeights.aptitude}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Core CS / Systems:</span>
                      <span className="text-emerald-400 font-semibold">{comp.competencyWeights.coreCS}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 4: Hiring Stages Count & Verification */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Interview Rounds
                </td>
                {comparedCompanies.map((comp) => (
                  <td key={comp.id} className="py-3.5 px-4 text-slate-300">
                    <div className="font-semibold text-white font-mono">
                      {comp.hiringStages.length} Configured Stages
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
                      {comp.hiringStages.map((s) => (
                        <div key={s.id} className="truncate">
                          · {s.name}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 5: Package / CTC in India */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Indian Campus Package
                </td>
                {comparedCompanies.map((comp) => (
                  <td key={comp.id} className="py-3.5 px-4">
                    <div className="font-semibold text-emerald-400 font-mono">
                      {comp.packageInsights.fullTimeCTCLPA}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                      Stipend: {comp.packageInsights.internshipStipendPerMonth}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row 6: Official Verification Source */}
              <tr className="hover:bg-slate-850/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Verification Reference
                </td>
                {comparedCompanies.map((comp) => (
                  <td key={comp.id} className="py-3.5 px-4">
                    <a
                      href={comp.earlyCareerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                    >
                      <span>Careers Portal ({comp.lastVerifiedDate})</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                ))}
              </tr>

              {/* Row 7: Set as Active Target Action */}
              <tr className="bg-slate-950/40">
                <td className="py-3.5 px-4 font-semibold text-slate-300">
                  Action
                </td>
                {comparedCompanies.map((comp) => {
                  const isActive = comp.id === activeCompany.id;
                  return (
                    <td key={comp.id} className="py-3.5 px-4">
                      {isActive ? (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Currently Active Target
                        </span>
                      ) : (
                        <button
                          onClick={() => setTargetCompany(comp.id)}
                          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                        >
                          Switch Target to {comp.name}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shared Competencies Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <span>High-Leverage Shared Competencies across All Compared Targets ({sharedCompetencies.length})</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Mastering these foundational competencies provides dual/triple dividend across every company you are targeting:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {sharedCompetencies.map((comp) => (
            <div
              key={comp.id}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 font-medium"
            >
              <span className="text-emerald-400 mr-1.5">✓</span>
              <span>{comp.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
