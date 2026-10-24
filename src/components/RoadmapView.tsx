import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Target,
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    roadmaps,
    toggleTopicCompletion,
    activeCompany,
    userProfile,
    setActiveTab,
    setActiveRemediationTopic,
    openTopicDetail,
  } = useApp();

  const [filterCompanyOnly, setFilterCompanyOnly] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-dsa-foundations': true,
    'mod-trees-heaps': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter roadmaps relevant to this role and company
  const relevantModules = roadmaps.filter((m) => {
    // Role filter
    const roleMatch = m.applicableRoles.length === 0 || m.applicableRoles.includes(userProfile.careerGoal);
    if (!roleMatch) return false;

    // Company filter
    if (filterCompanyOnly) {
      return m.applicableCompanies.includes(activeCompany.id);
    }
    return m.applicableCompanies.length === 0 || m.applicableCompanies.includes(activeCompany.id);
  });

  // Calculate total hours and completion
  const totalEstimatedHours = relevantModules.reduce((sum, m) => sum + m.estimatedHours, 0);
  const totalTopics = relevantModules.reduce((sum, m) => sum + m.topics.length, 0);
  const completedTopics = relevantModules.reduce(
    (sum, m) => sum + m.topics.filter((t) => t.completed).length,
    0
  );
  const progressPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Estimated weeks at user's daily study hours
  const dailyHours = userProfile.dailyStudyTimeHours || 1;
  const estimatedDaysRemaining = Math.max(
    1,
    Math.round(((100 - progressPct) / 100) * totalEstimatedHours / dailyHours)
  );
  const estimatedWeeksRemaining = (estimatedDaysRemaining / 7).toFixed(1);

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
            <span>Adaptive Roadmap</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Personalized Placement Preparation Roadmap
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Optimized for {userProfile.academicYear} students studying {dailyHours} hour{dailyHours > 1 ? 's' : ''}/day in {userProfile.preferredLanguage}. Reusable competencies are preserved when you switch companies.
          </p>
        </div>

        {/* Pacing KPI summary */}
        <div className="flex items-center gap-6 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shrink-0">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Curriculum Pacing</div>
            <div className="text-xs font-semibold text-white font-mono tabular-nums">
              ~{estimatedDaysRemaining} days ({estimatedWeeksRemaining} wks)
            </div>
            <div className="text-[10px] text-slate-500 font-mono">at {dailyHours}h/day</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">Progress</div>
            <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
              {progressPct}%
            </div>
            <div className="text-[10px] text-slate-400 font-mono tabular-nums">
              {completedTopics} / {totalTopics} topics
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterCompanyOnly(false)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              !filterCompanyOnly
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Recommended Modules ({relevantModules.length})
          </button>
          <button
            onClick={() => setFilterCompanyOnly(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterCompanyOnly
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {activeCompany.name} Specific Modules
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          Click any topic checkbox to track completion
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {relevantModules.map((module, idx) => {
          const isExpanded = !!expandedModules[module.id];
          const completedCount = module.topics.filter((t) => t.completed).length;
          const isCompanyCustom = module.applicableCompanies.includes(activeCompany.id);

          return (
            <div
              key={module.id}
              className={`rounded-xl border transition-all ${
                module.isCompleted
                  ? 'border-emerald-900/60 bg-emerald-950/10'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              {/* Module Header */}
              <div
                onClick={() => toggleExpand(module.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 truncate">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold font-mono shrink-0 ${
                      module.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    0{idx + 1}
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        {module.title}
                      </h3>
                      {isCompanyCustom && (
                        <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                          {activeCompany.name} Focus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{module.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:block text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Effort</div>
                    <div className="text-xs font-semibold text-slate-300 font-mono tabular-nums">
                      {module.estimatedHours}h ({completedCount}/{module.topics.length})
                    </div>
                  </div>

                  <div className="text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>
                </div>
              </div>

              {/* Module Topics */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-slate-950/50 p-4 sm:p-6 space-y-3 rounded-b-xl">
                  {module.topics.map((topic) => (
                    <div
                      key={topic.id}
                      onClick={() => toggleTopicCompletion(module.id, topic.id)}
                      className={`flex items-start justify-between gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        topic.completed
                          ? 'border-emerald-950/80 bg-emerald-950/15'
                          : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTopicCompletion(module.id, topic.id);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-white transition-colors"
                        >
                          {topic.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-600 shrink-0" />
                          )}
                        </button>

                        <div>
                          <h4
                            className={`text-xs font-semibold ${
                              topic.completed ? 'line-through text-slate-500' : 'text-slate-200'
                            }`}
                          >
                            {topic.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-slate-500 tabular-nums">
                          {topic.estimatedMinutes}m
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openTopicDetail(topic.id);
                          }}
                          className="rounded-full border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 px-2.5 py-1 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Open detailed learning resources, code samples, documentation, quiz & projects"
                        >
                          <BookOpen className="h-3 w-3 text-purple-300" />
                          <span>Resources</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveRemediationTopic(topic.title);
                          }}
                          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 ml-1 cursor-pointer"
                        >
                          Study Guide →
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-slate-500">
                      Module Category: <span className="text-slate-300">{module.category}</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('practice')}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Solve Related Coding Challenges →
                    </button>
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
