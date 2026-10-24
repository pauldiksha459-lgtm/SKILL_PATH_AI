import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getTopicDetail, getAllTopics } from '../data/learningResources';
import { TopicLearningDetail, ResourceType, ResourceDifficulty } from '../types/resources';
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  Play,
  FileText,
  Code2,
  BrainCircuit,
  Award,
  ChevronRight,
  ChevronLeft,
  Search,
  Check,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Copy,
} from 'lucide-react';

export const SkillResourceDetailView: React.FC = () => {
  const {
    selectedTopicId,
    openTopicDetail,
    setActiveTab,
    roadmaps,
    completeTopicAndAdvance,
    bookmarkedResourceIds,
    toggleBookmarkResource,
    reviewedResourceIds,
    markResourceAsReviewed,
    topicQuizScores,
    saveTopicQuizScore,
    currentUser,
  } = useApp();

  const [activeTabName, setActiveTabName] = useState<
    'notes' | 'overview' | 'docs' | 'courses' | 'practice' | 'quiz' | 'projects' | 'interview'
  >('notes');

  const [resourceSearch, setResourceSearch] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Interactive Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [expandedInterviewId, setExpandedInterviewId] = useState<string | null>(null);

  // Retrieve current topic details
  const topic: TopicLearningDetail | null = useMemo(() => {
    if (!selectedTopicId) return null;
    return getTopicDetail(selectedTopicId);
  }, [selectedTopicId]);

  // Check if topic is completed in roadmaps
  const isTopicCompletedInRoadmaps = useMemo(() => {
    if (!topic) return false;
    return roadmaps.some((m) => m.topics.some((t) => t.id === topic.id && t.completed));
  }, [roadmaps, topic]);

  if (!topic) {
    return (
      <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-12 text-center max-w-xl mx-auto my-12 text-white">
        <HelpCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold font-display">Topic Resource Not Found</h2>
        <p className="text-xs text-[#A5A5B8] mt-2 mb-6">
          The requested skill topic could not be resolved. Please select an available curriculum module from the roadmaps or skills catalog.
        </p>
        <button
          onClick={() => setActiveTab('resources')}
          className="rounded-full bg-purple-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-purple-500 transition-colors cursor-pointer"
        >
          Browse All Learning Resources
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarkedResourceIds.includes(topic.id);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleQuizOptionSelect = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (topic.quiz.length === 0) return;
    let correct = 0;
    topic.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const scorePct = Math.round((correct / topic.quiz.length) * 100);
    saveTopicQuizScore(topic.id, scorePct);
    setQuizSubmitted(true);

    // If student scored 80%+, mark topic as completed in roadmap
    if (scorePct >= 80 && !isTopicCompletedInRoadmaps) {
      completeTopicAndAdvance(topic.id);
    }
  };

  const currentQuizScore = topicQuizScores[topic.id];

  // Filtered resources
  const filteredResources = topic.resources.filter((r) => {
    if (!resourceSearch.trim()) return true;
    const q = resourceSearch.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });

  const docsResources = filteredResources.filter((r) => r.type === 'Documentation' || r.type === 'Cheat Sheet');
  const courseResources = filteredResources.filter((r) => r.type === 'Course' || r.type === 'Video');
  const practiceResources = filteredResources.filter((r) => r.type === 'Practice' || r.type === 'Lab');

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* ─────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & BREADCRUMBS
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab('resources')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Resource Library</span>
        </button>

        <div className="flex items-center gap-2">
          {topic.prevTopicId && (
            <button
              onClick={() => openTopicDetail(topic.prevTopicId!)}
              className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#0E0E18] px-3.5 py-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous Topic</span>
            </button>
          )}

          {topic.nextTopicId && (
            <button
              onClick={() => openTopicDetail(topic.nextTopicId!)}
              className="flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <span>Next Topic</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOPIC HERO BANNER WITH INSTANT ACTIONS
         ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-600/20 blur-[80px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-purple-400 bg-purple-950/50 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                {topic.skillCategory}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300">{topic.skillName}</span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{topic.estimatedMinutes} mins</span>
              </span>
              <span className="text-slate-400">·</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  topic.difficulty === 'Beginner'
                    ? 'text-emerald-400 bg-emerald-950/40'
                    : topic.difficulty === 'Intermediate'
                    ? 'text-indigo-300 bg-indigo-950/40'
                    : 'text-rose-400 bg-rose-950/40'
                }`}
              >
                {topic.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              {topic.topicTitle}
            </h1>

            <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed">
              {topic.overview}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Target Careers:</span>
              {topic.careerPaths.map((cp) => (
                <span key={cp} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-slate-300 border border-white/5">
                  {cp}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons: Mark Complete & Bookmark */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 self-start lg:self-center">
            <button
              onClick={() => completeTopicAndAdvance(topic.id)}
              className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-semibold transition-all cursor-pointer shadow-lg ${
                isTopicCompletedInRoadmaps
                  ? 'border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30'
              }`}
            >
              {isTopicCompletedInRoadmaps ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Topic Completed (100%)</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleBookmarkResource(topic.id)}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                isBookmarked
                  ? 'border-amber-500/50 bg-amber-950/30 text-amber-300'
                  : 'border-white/[0.12] bg-[#0E0E18] text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isBookmarked ? 'Saved to Bookmarks' : 'Save for Later'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. RESOURCE TABS NAVIGATION
         ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'notes', label: 'Detailed Notes & Code', icon: <FileText className="h-3.5 w-3.5" /> },
          { id: 'overview', label: 'Objectives & Prerequisites', icon: <HelpCircle className="h-3.5 w-3.5" /> },
          { id: 'docs', label: `Official Docs (${docsResources.length})`, icon: <BookOpen className="h-3.5 w-3.5" /> },
          { id: 'courses', label: `Courses & Videos (${courseResources.length})`, icon: <Play className="h-3.5 w-3.5" /> },
          { id: 'practice', label: `Practice & Labs (${practiceResources.length})`, icon: <Code2 className="h-3.5 w-3.5" /> },
          { id: 'quiz', label: `Interactive Quiz (${topic.quiz.length})`, icon: <BrainCircuit className="h-3.5 w-3.5" /> },
          { id: 'projects', label: `Mini-Projects (${topic.projects.length})`, icon: <Layers className="h-3.5 w-3.5" /> },
          { id: 'interview', label: `Interview Q&A (${topic.interviewQuestions.length})`, icon: <Briefcase className="h-3.5 w-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabName(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              activeTabName === tab.id
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'text-[#A5A5B8] hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: DETAILED STUDY NOTES & WORKED CODE EXAMPLES
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'notes' && (
        <div className="space-y-6">
          {/* Definition & Importance Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7 space-y-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Core Definition
              </h3>
              <p className="text-sm sm:text-base text-white mt-1 leading-relaxed">
                {topic.studyNotes.definition}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                Why This Skill Matters for Campus Placements
              </h3>
              <p className="text-xs sm:text-sm text-[#A5A5B8] mt-1 leading-relaxed">
                {topic.studyNotes.whyItMatters}
              </p>
            </div>
          </div>

          {/* Core Concept Breakdown & Executable Code Samples */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Step-by-Step Concept Breakdown & Code Examples</span>
            </h3>

            {topic.studyNotes.coreConcepts.map((concept, idx) => (
              <div key={idx} className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                    {idx + 1}
                  </span>
                  <span>{concept.heading}</span>
                </h4>

                <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed whitespace-pre-line">
                  {concept.explanation}
                </p>

                {concept.codeExample && (
                  <div className="mt-3 rounded-2xl border border-white/[0.1] bg-[#050508] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-mono text-slate-400">
                      <span>{concept.codeExample.language.toUpperCase()}</span>
                      <button
                        onClick={() => handleCopyCode(concept.codeExample!.code, `code-${idx}`)}
                        className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedCodeId === `code-${idx}` ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed">
                      <code>{concept.codeExample.code}</code>
                    </pre>

                    {concept.codeExample.output && (
                      <div className="p-3 bg-[#0B0B14] border-t border-white/[0.06] text-xs font-mono">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5">
                          Standard Output
                        </span>
                        <div className="text-emerald-400 whitespace-pre-wrap">{concept.codeExample.output}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Complexity Analysis & Invariants (If present) */}
          {topic.studyNotes.complexityAnalysis && (
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-5 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                Asymptotic Runtime & Memory Invariants
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
                  <span className="text-[10px] text-slate-400 font-mono">Time Complexity</span>
                  <div className="text-sm font-mono font-bold text-indigo-200 mt-0.5">
                    {topic.studyNotes.complexityAnalysis.timeComplexity}
                  </div>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3">
                  <span className="text-[10px] text-slate-400 font-mono">Space Complexity</span>
                  <div className="text-sm font-mono font-bold text-emerald-200 mt-0.5">
                    {topic.studyNotes.complexityAnalysis.spaceComplexity}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#A5A5B8] italic pt-1">
                {topic.studyNotes.complexityAnalysis.notes}
              </p>
            </div>
          )}

          {/* Common Mistakes & Practical Industry Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4" />
                <span>Common Mistakes to Avoid</span>
              </h4>
              <div className="space-y-3">
                {topic.studyNotes.commonMistakes.map((m, idx) => (
                  <div key={idx} className="text-xs space-y-1">
                    <div className="font-semibold text-rose-200">❌ Mistake: {m.mistake}</div>
                    <div className="text-[#A5A5B8] pl-2 border-l border-rose-500/40">✓ Fix: {m.correction}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Revision Checklist</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#A5A5B8]">
                {topic.studyNotes.revisionChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: OBJECTIVES & PREREQUISITES
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Measurable Learning Objectives</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#A5A5B8]">
              {topic.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-[10px] font-mono text-purple-300 shrink-0">
                    {idx + 1}
                  </div>
                  <span className="pt-0.5">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-indigo-400" />
              <span>Recommended Prerequisites</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#A5A5B8]">
              {topic.prerequisites.map((prereq, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-indigo-400 font-bold shrink-0">✓</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: OFFICIAL DOCUMENTATION & CHEAT SHEETS
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'docs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-[#A5A5B8]">
              Verified primary platform documentation and developer references.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {docsResources.map((res) => {
              const isReviewed = reviewedResourceIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded">
                        {res.platformName || res.type}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{res.title}</h4>
                    <p className="text-xs text-[#A5A5B8] mt-1 leading-relaxed">{res.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      Estimated: {res.estimatedDuration}
                    </span>

                    <div className="flex items-center gap-2">
                      {res.url && (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => markResourceAsReviewed(res.id)}
                          className="flex items-center gap-1.5 rounded-full bg-purple-600/30 hover:bg-purple-600 px-3.5 py-1 text-xs font-semibold text-white transition-colors"
                        >
                          <span>Open Docs</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: COURSES & VIDEOS
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'courses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded">
                      {res.platformName || res.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{res.estimatedDuration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{res.title}</h4>
                  <p className="text-xs text-[#A5A5B8] mt-1 leading-relaxed">{res.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">{res.language}</span>
                  {res.url && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 px-3.5 py-1 text-xs font-semibold text-white transition-colors"
                    >
                      <Play className="h-3 w-3 fill-white" />
                      <span>Start Learning</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: PRACTICE & HANDS-ON CODING
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'practice' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 flex flex-col justify-between hover:border-purple-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                      {res.platformName || 'Coding Challenge'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{res.estimatedDuration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{res.title}</h4>
                  <p className="text-xs text-[#A5A5B8] mt-1 leading-relaxed">{res.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">{res.difficulty}</span>
                  {res.url && (
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-full bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-white transition-colors"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Solve Challenge</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: INTERACTIVE QUIZ & INSTANT ASSESSMENT
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'quiz' && (
        <div className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-purple-400" />
                <span>Topic Mastery Evaluation</span>
              </h3>
              <p className="text-xs text-[#A5A5B8] mt-0.5">
                Answer all multiple-choice questions. Score 80%+ to verify topic mastery in your profile.
              </p>
            </div>

            {currentQuizScore !== undefined && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <span className="text-xs text-slate-400 font-mono">Previous Score:</span>
                <span className="text-sm font-bold font-mono text-purple-300">{currentQuizScore}%</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {topic.quiz.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const isSubmitted = quizSubmitted;
              const isCorrect = selected === q.correctAnswerIndex;

              return (
                <div key={q.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-xs font-mono font-bold text-purple-300 shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-white whitespace-pre-line leading-relaxed">
                      {q.question}
                    </h4>
                  </div>

                  <div className="space-y-2 pt-1 pl-9">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selected === optIdx;
                      let optionClasses = 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-purple-500/40';

                      if (isSubmitted) {
                        if (optIdx === q.correctAnswerIndex) {
                          optionClasses = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          optionClasses = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                        }
                      } else if (isChosen) {
                        optionClasses = 'border-purple-500 bg-purple-950/50 text-white font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                          className={`w-full text-left rounded-xl border p-3 text-xs transition-colors cursor-pointer flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && optIdx === q.correctAnswerIndex && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="mt-3 pl-9 pt-2 border-t border-white/[0.04] text-xs text-[#A5A5B8] leading-relaxed">
                      <strong className="text-purple-300">Explanation: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {Object.keys(selectedAnswers).length} of {topic.quiz.length} answered
            </span>

            {quizSubmitted ? (
              <button
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedAnswers({});
                }}
                className="rounded-full border border-white/20 bg-white/[0.04] px-5 py-2 text-xs font-semibold text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                Retake Quiz
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="rounded-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-6 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: MINI-PROJECTS & DELIVERABLES
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'projects' && (
        <div className="space-y-4">
          {topic.projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-7 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  <span>{proj.title}</span>
                </h3>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded self-start sm:self-auto">
                  {proj.difficulty} Deliverable
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed">
                {proj.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                  Implementation Steps
                </h4>
                <ol className="space-y-2 text-xs text-[#A5A5B8]">
                  {proj.starterSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-mono text-purple-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Deliverable: </span>
                  <span className="text-emerald-300 font-semibold">{proj.deliverable}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <span>Tech Stack:</span>
                  {proj.techStack.map((tech) => (
                    <span key={tech} className="bg-white/[0.04] px-2 py-0.5 rounded text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 8: INTERVIEW QUESTIONS & COLLAPSIBLE ANSWERS
         ───────────────────────────────────────────────────────────── */}
      {activeTabName === 'interview' && (
        <div className="space-y-4">
          <div className="pb-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-purple-400" />
              <span>Real Interview Questions Asked at Top Tech Companies</span>
            </h3>
            <p className="text-xs text-[#A5A5B8] mt-0.5">
              Review genuine technical screen questions with senior developer answers and architectural trade-offs.
            </p>
          </div>

          <div className="space-y-3">
            {topic.interviewQuestions.map((iq) => {
              const isExpanded = expandedInterviewId === iq.id;
              return (
                <div
                  key={iq.id}
                  className="rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 space-y-3"
                >
                  <div
                    onClick={() => setExpandedInterviewId(isExpanded ? null : iq.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        {iq.companyTags.map((co) => (
                          <span
                            key={co}
                            className="text-[10px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/20 px-2 py-0.2 rounded"
                          >
                            {co}
                          </span>
                        ))}
                        <span className="text-[10px] font-mono text-slate-400">· {iq.difficulty}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{iq.question}</h4>
                    </div>

                    <button className="text-xs text-purple-400 font-semibold shrink-0">
                      {isExpanded ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs animate-fade-in">
                      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200">
                        <strong>Quick Executive Summary: </strong>
                        {iq.answerSummary}
                      </div>

                      <div className="text-[#A5A5B8] leading-relaxed whitespace-pre-line pt-1">
                        {iq.deepDive}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
