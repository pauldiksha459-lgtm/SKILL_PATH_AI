import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANIES_DATA } from '../data/companies';
import { InterviewSchedule } from '../types';
import { CompanyLogo } from './CompanyLogo';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Building2,
  FileText,
  Briefcase,
  AlertCircle,
} from 'lucide-react';

export const InterviewTrackerView: React.FC = () => {
  const {
    interviews,
    addInterview,
    updateInterviewStatus,
    deleteInterview,
    toggleInterviewTask,
    activeCompany,
    setActiveTab,
  } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [newCompanyId, setNewCompanyId] = useState(activeCompany.id);
  const [newRole, setNewRole] = useState('Software Engineer');
  const [newRound, setNewRound] = useState('Online Assessment');
  const [newDate, setNewDate] = useState('2026-11-15');
  const [newTime, setNewTime] = useState('11:00');
  const [newNotes, setNewNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const company = COMPANIES_DATA.find((c) => c.id === newCompanyId) || activeCompany;
    addInterview({
      companyId: newCompanyId,
      companyName: company.name,
      role: newRole,
      roundName: newRound,
      date: newDate,
      time: newTime,
      status: 'Upcoming',
      notes: newNotes,
      applicationPortalUrl: company.earlyCareerUrl,
      preparationChecklist: [
        { task: `Review ${company.name} interview guidelines`, done: false },
        { task: 'Practice 2 mock coding problems', done: false },
        { task: 'Test browser environment and webcam', done: false },
      ],
    });
    setIsAdding(false);
    setNewNotes('');
  };

  const upcomingCount = interviews.filter((i) => i.status === 'Upcoming').length;
  const completedCount = interviews.filter((i) => i.status === 'Completed').length;
  const shortlistedCount = interviews.filter((i) => i.status === 'Shortlisted').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Campus Placement</span>
            <span>/</span>
            <span>Interview Schedule & Application Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Interview Schedules & Company Resource Hub
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Track upcoming online assessments, technical whiteboard rounds, and HR interviews. Keep pre-interview checklists and access company-specific resources.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule New Interview</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-[10px] uppercase font-mono text-slate-400">Upcoming Rounds</div>
          <div className="text-2xl font-bold text-indigo-400 font-mono tabular-nums mt-0.5">
            {upcomingCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Scheduled for this placement cycle</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-[10px] uppercase font-mono text-slate-400">Completed Assessments</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
            {completedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Rounds finished & submitted</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="text-[10px] uppercase font-mono text-slate-400">Shortlisted / Offers</div>
          <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums mt-0.5">
            {shortlistedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Advanced to next hiring stage</div>
        </div>
      </div>

      {/* Add Interview Form Drawer */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-indigo-500/40 bg-slate-900 p-5 space-y-4"
        >
          <h3 className="text-sm font-bold text-white">Log Upcoming Campus Placement Round</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Company</label>
              <select
                value={newCompanyId}
                onChange={(e) => setNewCompanyId(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none"
              >
                {COMPANIES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Role</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none"
                placeholder="e.g. Software Engineer / SDE I"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Stage / Round Name</label>
              <input
                type="text"
                value={newRound}
                onChange={(e) => setNewRound(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none"
                placeholder="e.g. Technical Round 1 - DSA"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Notes / Instructions</label>
              <input
                type="text"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-200 focus:outline-none"
                placeholder="Platform (HackerRank, Teams), duration, syllabus"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-sm"
            >
              Save Schedule
            </button>
          </div>
        </form>
      )}

      {/* Schedules List */}
      <div className="space-y-4">
        {interviews.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
            No interview schedules logged yet. Click "Schedule New Interview" to begin tracking.
          </div>
        ) : (
          interviews.map((item) => {
            const companyObj =
              COMPANIES_DATA.find((c) => c.id === item.companyId) || activeCompany;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CompanyLogo
                      companyId={companyObj.id}
                      name={companyObj.name}
                      size="sm"
                      forceLightBg={companyObj.logoBg === 'light'}
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{item.companyName}</h3>
                        <span className="text-slate-500">·</span>
                        <span className="text-xs text-slate-300 font-medium">{item.role}</span>
                      </div>
                      <p className="text-xs text-indigo-400 font-medium mt-0.5">{item.roundName}</p>
                    </div>
                  </div>

                  {/* Date, Time & Status dropdown */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.date}</span>
                      <span className="text-slate-600">·</span>
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{item.time}</span>
                    </div>

                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateInterviewStatus(item.id, e.target.value as InterviewSchedule['status'])
                      }
                      className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white focus:outline-none"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Offer Received">Offer Received</option>
                    </select>

                    <button
                      onClick={() => deleteInterview(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                      title="Delete interview"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {item.notes && (
                  <p className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-semibold text-slate-300">Notes: </span>
                    {item.notes}
                  </p>
                )}

                {/* Pre-Interview Preparation Checklist */}
                {item.preparationChecklist.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Pre-Round Checklist:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {item.preparationChecklist.map((task, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:bg-slate-950 cursor-pointer text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleInterviewTask(item.id, idx)}
                            className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-800 text-indigo-600"
                          />
                          <span
                            className={task.done ? 'line-through text-slate-500' : 'text-slate-300'}
                          >
                            {task.task}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Section: Curated Company-Specific Resources & Syllabus Hub */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            <span>Curated Placement Resources for {activeCompany.name}</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">Verified Oct 2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-indigo-400" />
              <span>Official Recruitment Syllabus & Guidelines</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official university recruitment portal instructions directly published by {activeCompany.name} talent acquisition teams.
            </p>
            <a
              href={activeCompany.earlyCareerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:underline pt-1"
            >
              <span>Visit Official {activeCompany.name} Early Career Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
              <span>Indian Campus Package & Placement Cadre Insights</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Internship: <span className="text-slate-200 font-mono font-medium">{activeCompany.packageInsights.internshipStipendPerMonth}</span> · Full Time: <span className="text-emerald-400 font-mono font-medium">{activeCompany.packageInsights.fullTimeCTCLPA}</span>.
            </p>
            <div className="text-[11px] text-slate-500">
              Key locations: {activeCompany.packageInsights.locationInIndia.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
