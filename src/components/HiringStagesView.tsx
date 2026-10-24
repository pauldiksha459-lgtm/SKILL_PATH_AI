import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyLogo } from './CompanyLogo';
import {
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';

export const HiringStagesView: React.FC = () => {
  const { activeCompany, userProfile, setActiveTab, setActiveRemediationTopic } = useApp();

  const [expandedStageId, setExpandedStageId] = useState<string>(
    activeCompany.hiringStages[0]?.id || ''
  );
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Verification Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-start gap-3.5">
          <CompanyLogo
            companyId={activeCompany.id}
            name={activeCompany.name}
            size="md"
            forceLightBg={activeCompany.logoBg === 'light'}
          />
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>{activeCompany.name}</span>
              <span>/</span>
              <span>{userProfile.careerGoal}</span>
              <span>/</span>
              <span>Hiring Pipeline</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Interview Stages & Round-by-Round Preparation
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Detailed breakdown of hiring stages for {activeCompany.name}. Complete the stage checklists, review example questions, and practice round-specific simulations.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-slate-900 border border-slate-800 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Verified Official</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Historically Reported</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            <span>AI Practice Model</span>
          </div>
        </div>
      </div>

      {/* Stage Cards Accordion / List */}
      <div className="space-y-4">
        {activeCompany.hiringStages.map((stage) => {
          const isExpanded = expandedStageId === stage.id;
          const isVerified = stage.verificationStatus === 'VERIFIED_OFFICIAL';

          return (
            <div
              key={stage.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'border-slate-700 bg-slate-900 shadow-lg'
                  : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              {/* Stage Header */}
              <div
                onClick={() => setExpandedStageId(isExpanded ? '' : stage.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 truncate">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold font-mono text-slate-200 shrink-0">
                    R{stage.stageNumber}
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        {stage.name}
                      </h3>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider shrink-0 px-2 py-0.5 rounded ${
                          isVerified
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {isVerified ? 'Official Verified' : 'Historically Reported'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{stage.purpose}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {stage.studentPerformanceScore !== undefined && (
                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Mock Score</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono tabular-nums">
                        {stage.studentPerformanceScore}%
                      </div>
                    </div>
                  )}

                  <div className="text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Stage Expanded Details */}
              {isExpanded && (
                <div className="border-t border-slate-800 px-4 sm:px-6 py-5 space-y-6 bg-slate-950/40 rounded-b-xl">
                  {/* Source metadata & disclaimer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/90 rounded-lg p-3 border border-slate-800">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="font-semibold text-slate-200">Source:</span>
                      <a
                        href={stage.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 hover:underline"
                      >
                        <span>{stage.sourceUrl.replace('https://', '').split('/')[0]}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                      <span>·</span>
                      <span className="text-slate-400">{stage.sourceDate}</span>
                    </div>

                    <span className="text-[11px] text-slate-400 italic">
                      Verify exact round structure with recruiter communications for your batch.
                    </span>
                  </div>

                  {/* Topics commonly evaluated */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Syllabus & Topics Tested in this Round
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stage.topicsCovered.map((topic, i) => (
                        <span
                          key={i}
                          className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example practice questions */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Representative Practice Questions
                    </h4>
                    <div className="space-y-2.5">
                      {stage.exampleQuestions.map((q, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                              {q.type} · {q.difficulty}
                            </span>
                            <p className="text-xs font-medium text-slate-200 leading-relaxed">
                              {q.question}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              if (q.type === 'Coding') setActiveTab('practice');
                              else setActiveTab('mock-interview');
                            }}
                            className="text-xs text-indigo-400 hover:text-white shrink-0 self-start sm:self-center font-semibold"
                          >
                            Practice Now →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Completion checklist */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Round Preparation Checklist
                    </h4>
                    <div className="space-y-2">
                      {stage.completionChecklist.map((item) => {
                        const isDone = completedTasks[item.id] !== undefined ? completedTasks[item.id] : item.completed;
                        return (
                          <label
                            key={item.id}
                            className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-900 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleTask(item.id)}
                              className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span
                              className={`text-xs ${
                                isDone ? 'line-through text-slate-500' : 'text-slate-300'
                              }`}
                            >
                              {item.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommended modules & Mock test button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Recommended Modules: </span>
                      {stage.recommendedModules.join(', ')}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        Study Modules
                      </button>

                      <button
                        onClick={() => {
                          if (stage.name.toLowerCase().includes('aptitude') || stage.name.toLowerCase().includes('cognitive')) {
                            setActiveTab('aptitude');
                          } else if (stage.name.toLowerCase().includes('coding') || stage.name.toLowerCase().includes('challenge')) {
                            setActiveTab('practice');
                          } else {
                            setActiveTab('mock-interview');
                          }
                        }}
                        className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                      >
                        Take Round Mock Test
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
