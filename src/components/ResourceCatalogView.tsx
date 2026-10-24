import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getAllTopics, searchTopics } from '../data/learningResources';
import { CareerGoal } from '../types';
import {
  BookOpen,
  Search,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  BrainCircuit,
  Filter,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

const DOMAIN_FILTERS = [
  'All Domains',
  'Programming Fundamentals',
  'Data Engineering & Linear Computing',
  'Deep Learning & Neural Architectures',
  'Algorithmic Complexity & Foundations',
  'Linear Data Structures & Pointers',
  'Database Systems & Data Modeling',
  'Frontend Engineering',
  'Backend Engineering',
  'Application Security',
  'Cloud & DevOps Infrastructure',
  'Data Science & Analytics',
];

const DIFFICULTY_FILTERS = ['All Difficulties', 'Beginner', 'Intermediate', 'Advanced'];

export const ResourceCatalogView: React.FC = () => {
  const {
    openTopicDetail,
    bookmarkedResourceIds,
    roadmaps,
    lastVisitedTopicId,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [activeTab, setActiveCatalogTab] = useState<'all' | 'bookmarks' | 'completed'>('all');

  const allTopics = useMemo(() => getAllTopics(), []);

  // Filter topics
  const filteredTopics = useMemo(() => {
    let result = allTopics;

    if (activeTab === 'bookmarks') {
      result = result.filter((t) => bookmarkedResourceIds.includes(t.id));
    } else if (activeTab === 'completed') {
      result = result.filter((t) =>
        roadmaps.some((m) => m.topics.some((topic) => topic.id === t.id && topic.completed))
      );
    }

    if (selectedDomain !== 'All Domains') {
      result = result.filter((t) => t.skillCategory === selectedDomain);
    }

    if (selectedDifficulty !== 'All Difficulties') {
      result = result.filter((t) => t.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.topicTitle.toLowerCase().includes(q) ||
          t.skillName.toLowerCase().includes(q) ||
          t.overview.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allTopics, activeTab, selectedDomain, selectedDifficulty, searchQuery, bookmarkedResourceIds, roadmaps]);

  const lastVisitedTopic = useMemo(() => {
    if (!lastVisitedTopicId) return null;
    return allTopics.find((t) => t.id === lastVisitedTopicId) || null;
  }, [allTopics, lastVisitedTopicId]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & RESUME BANNER
         ───────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#09090F] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[80px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>SkillPath AI Comprehensive Learning Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              Curriculum & Skill Resource Library
            </h1>
            <p className="text-xs sm:text-sm text-[#A5A5B8] leading-relaxed">
              Explore in-depth study notes, step-by-step code tutorials, verified official documentation, video walkthroughs, and practice sets mapped to every engineering subtopic.
            </p>
          </div>

          {/* Resume Last Visited Card */}
          {lastVisitedTopic && (
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 max-w-sm shrink-0 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-purple-300 font-bold uppercase flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Resume Learning</span>
                </span>
                <span className="text-slate-400">{lastVisitedTopic.estimatedMinutes}m</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{lastVisitedTopic.topicTitle}</h4>
              <button
                onClick={() => openTopicDetail(lastVisitedTopic.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 px-4 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>Continue Lesson</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. SEARCH, TABS & FILTERS
         ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Main tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: `All Resources (${allTopics.length})` },
              { id: 'bookmarks', label: `My Saved Bookmarks (${bookmarkedResourceIds.length})` },
              {
                id: 'completed',
                label: `Completed Topics (${roadmaps.reduce(
                  (acc, m) => acc + m.topics.filter((t) => t.completed).length,
                  0
                )})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCatalogTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[#A5A5B8] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{filteredTopics.length}</strong> topics
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g. Functions, Docker, Binary Trees..."
              className="w-full rounded-2xl border border-white/[0.1] bg-[#0E0E18] pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Domain Category Filter */}
          <div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.1] bg-[#0E0E18] px-3 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              {DOMAIN_FILTERS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-2xl border border-white/[0.1] bg-[#0E0E18] px-3 py-2.5 text-xs text-white focus:border-purple-500 focus:outline-none"
            >
              {DIFFICULTY_FILTERS.map((df) => (
                <option key={df} value={df}>{df}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TOPICS GRID
         ───────────────────────────────────────────────────────────── */}
      {filteredTopics.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/[0.12] p-12 text-center text-slate-400 bg-white/[0.01]">
          <BookOpen className="h-8 w-8 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-white">No topics match your filters</h3>
          <p className="text-xs text-[#A5A5B8] mt-1">
            Try adjusting your search query or selecting "All Domains" to explore the full catalog.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => {
            const isCompleted = roadmaps.some((m) =>
              m.topics.some((t) => t.id === topic.id && t.completed)
            );
            const isBookmarked = bookmarkedResourceIds.includes(topic.id);

            return (
              <div
                key={topic.id}
                onClick={() => openTopicDetail(topic.id)}
                className="group rounded-2xl border border-white/[0.08] bg-[#09090F] p-5 flex flex-col justify-between hover:border-purple-500/50 hover:bg-[#0E0E18] transition-all cursor-pointer shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded">
                      {topic.skillCategory}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.2 rounded flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Done</span>
                        </span>
                      )}
                      {isBookmarked && (
                        <Bookmark className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                    {topic.topicTitle}
                  </h3>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5 mb-2">
                    {topic.skillName}
                  </div>

                  <p className="text-xs text-[#A5A5B8] line-clamp-2 leading-relaxed">
                    {topic.overview}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span>{topic.estimatedMinutes}m</span>
                    </span>
                    <span>·</span>
                    <span>{topic.resources.length} verified docs</span>
                  </div>

                  <span className="text-[11px] text-purple-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    <span>Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
