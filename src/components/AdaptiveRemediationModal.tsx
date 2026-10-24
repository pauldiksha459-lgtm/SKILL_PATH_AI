import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, ArrowRight, BookOpen, Code2, Sparkles, AlertCircle } from 'lucide-react';

export const AdaptiveRemediationModal: React.FC = () => {
  const {
    activeRemediationTopic,
    setActiveRemediationTopic,
    activeCompany,
    userProfile,
    updateCompetencyScore,
    competencies,
    setActiveTab,
  } = useApp();

  if (!activeRemediationTopic) return null;

  const compObj = competencies.find((c) =>
    c.name.toLowerCase().includes(activeRemediationTopic.toLowerCase())
  );

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const remediationPlan = [
    {
      step: 1,
      title: 'Prerequisite Refresh',
      description: `Review fundamental concepts and memory representations essential before diving into ${activeRemediationTopic}.`,
      estimatedTime: '20 mins',
      type: 'Core Concept',
    },
    {
      step: 2,
      title: 'Algorithmic Invariants & Conceptual Visuals',
      description: `Understand the step-by-step invariant properties and visual state transitions that govern ${activeRemediationTopic}.`,
      estimatedTime: '25 mins',
      type: 'Theory & Mechanics',
    },
    {
      step: 3,
      title: 'Detailed Placement Notes & Edge Case Traps',
      description: `Review detailed cheat sheets identifying common pitfalls, null inputs, and off-by-one boundary traps frequently tested by ${activeCompany.name}.`,
      estimatedTime: '20 mins',
      type: 'Reading & Analysis',
    },
    {
      step: 4,
      title: 'Guided Code Walkthroughs in ' + userProfile.preferredLanguage,
      description: `Study clean, line-by-line syntax implementations of 2 canonical patterns in ${userProfile.preferredLanguage}.`,
      estimatedTime: '30 mins',
      type: 'Code Study',
    },
    {
      step: 5,
      title: 'Solve Foundational Problems',
      description: `Work through 3 foundational coding/aptitude problems with relaxed time pressure to cement mental models.`,
      estimatedTime: '45 mins',
      type: 'Hands-on Practice',
    },
    {
      step: 6,
      title: 'Attempt Timed Standard Challenges',
      description: `Solve 2 interview-standard problems representative of ${activeCompany.name} online assessment rounds within 45 minutes.`,
      estimatedTime: '45 mins',
      type: 'Timed Assessment',
    },
    {
      step: 7,
      title: 'Timed Diagnostic Assessment Checkpoint',
      description: `Complete a 15-minute diagnostic test to verify retention and measure problem-solving velocity.`,
      estimatedTime: '15 mins',
      type: 'Verification Quiz',
    },
    {
      step: 8,
      title: 'Reassess Mastery & Unlock Advanced Modules',
      description: `Update demonstrated competency score in your LaunchPath profile and unlock higher-tier interview simulations.`,
      estimatedTime: '10 mins',
      type: 'Profile Calibration',
    },
  ];

  const handleCompleteStep = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    if (stepNumber < 8) {
      setActiveStep(stepNumber + 1);
    } else {
      // Reassess and elevate score
      if (compObj) {
        updateCompetencyScore(compObj.id, 85, 'Assessment Quiz');
      }
      setActiveRemediationTopic(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative my-8 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Adaptive Remediation Engine</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              8-Stage Mastery Pathway: {activeRemediationTopic}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted recovery sequence prioritized for {activeCompany.name} requirements.
            </p>
          </div>
          <button
            onClick={() => setActiveRemediationTopic(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Rationale Banner */}
        <div className="mx-6 mt-5 rounded-lg border border-indigo-950/80 bg-indigo-950/20 p-3.5 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">System Rationale: </span>
          Your diagnostic score identified gaps in {activeRemediationTopic}. Because {activeCompany.name} places high assessment emphasis on this domain, this tailored 8-stage sequence cures foundational misunderstandings before advancing to timed practice.
        </div>

        {/* Steps List */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-3">
          {remediationPlan.map((s) => {
            const isCompleted = completedSteps.includes(s.step);
            const isCurrent = activeStep === s.step;

            return (
              <div
                key={s.step}
                className={`rounded-xl border p-4 transition-all ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                    : isCompleted
                    ? 'border-emerald-950/70 bg-emerald-950/15'
                    : 'border-slate-800/80 bg-slate-950/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isCurrent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isCompleted ? '✓' : s.step}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-slate-400 line-through' : 'text-white'
                          }`}
                        >
                          Step {s.step}: {s.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({s.type} · {s.estimatedTime})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isCompleted ? (
                      <span className="text-[11px] text-emerald-400 font-medium">Completed</span>
                    ) : isCurrent ? (
                      <button
                        onClick={() => handleCompleteStep(s.step)}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
                      >
                        {s.step === 8 ? 'Verify & Update' : 'Mark Step Complete'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveStep(s.step)}
                        className="text-[11px] text-slate-500 hover:text-slate-300"
                      >
                        Jump to Step
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 px-6 py-4 rounded-b-2xl">
          <div className="text-xs text-slate-400 font-mono">
            Progress: {completedSteps.length} of 8 stages complete
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveRemediationTopic(null);
                setActiveTab('practice');
              }}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Go to Code Practice
            </button>
            <button
              onClick={() => setActiveRemediationTopic(null)}
              className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
