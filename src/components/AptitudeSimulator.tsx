import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { APTITUDE_QUESTIONS } from '../data/aptitude';
import { AptitudeQuestion } from '../types';
import {
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';

export const AptitudeSimulator: React.FC = () => {
  const { activeCompany, updateCompetencyScore, setActiveTab } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(true);

  // Filter questions relevant to this company or campus general
  const questions = APTITUDE_QUESTIONS;
  const currentQ = questions[currentIndex];

  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isSubmitted && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((t) => t - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && !isSubmitted) {
      handleSubmitTest();
    }
    return () => clearInterval(interval);
  }, [timerActive, isSubmitted, timeLeftSeconds]);

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIdx,
    }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    setTimerActive(false);

    // Compute score
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);

    // Update relevant competencies
    updateCompetencyScore('apt-quantitative', Math.min(100, scorePct + 5), 'Assessment Quiz');
    updateCompetencyScore('apt-logical', Math.min(100, scorePct), 'Assessment Quiz');
    updateCompetencyScore('apt-verbal', Math.min(100, scorePct), 'Assessment Quiz');
    updateCompetencyScore('apt-pseudocode', Math.min(100, scorePct - 5), 'Assessment Quiz');
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeftSeconds(600);
    setTimerActive(true);
  };

  // Score stats
  let correctCount = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctOptionIndex) correctCount++;
  });
  const scorePct = Math.round((correctCount / questions.length) * 100);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{activeCompany.name}</span>
            <span>/</span>
            <span>Cognitive & Aptitude Screening</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Campus Placement Aptitude Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulates actual online assessment patterns for TCS NQT, Infosys, Wipro Elite NTH, and Accenture ASE rounds.
          </p>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono tabular-nums text-xs font-semibold ${
              timeLeftSeconds < 120
                ? 'border-rose-500/50 bg-rose-950/30 text-rose-300'
                : 'border-slate-800 bg-slate-900 text-slate-200'
            }`}
          >
            <Timer className="h-4 w-4 text-indigo-400" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitTest}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleResetTest}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retake Test</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Banner when Submitted */}
      {isSubmitted && (
        <div className="rounded-xl border border-indigo-900/60 bg-indigo-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 font-bold text-lg font-mono">
              {scorePct}%
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Diagnostic Assessment Complete
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                You answered {correctCount} of {questions.length} questions correctly. Your aptitude competency scores have been updated in your profile.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('competencies')}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-sm"
          >
            Review Competency Matrix →
          </button>
        </div>
      )}

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Active Question */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                Question {currentIndex + 1} of {questions.length} · {currentQ.category}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Standard Campus Drive Weight
              </span>
            </div>

            {/* Question Text */}
            <p className="text-sm font-medium text-slate-100 leading-relaxed whitespace-pre-line mb-6">
              {currentQ.question}
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = isSubmitted && idx === currentQ.correctOptionIndex;
                const isWrong = isSubmitted && isSelected && idx !== currentQ.correctOptionIndex;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : isWrong
                        ? 'border-rose-500 bg-rose-950/30 text-white'
                        : isSelected
                        ? 'border-indigo-500 bg-indigo-500/15 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-xs font-medium">{option}</span>
                    </div>

                    {isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                    {isWrong && <XCircle className="h-4 w-4 text-rose-400 shrink-0" />}
                  </div>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {isSubmitted && (
              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-1.5">
                <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Step-by-Step Mathematical Explanation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-750 disabled:opacity-40 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {currentIndex + 1} / {questions.length}
            </span>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-750 disabled:opacity-40 transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (4 cols): Question Navigation Grid & Stats */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Question Palette
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = currentIndex === idx;
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctOptionIndex;
              const isWrong = isSubmitted && isAnswered && !isCorrect;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg font-mono text-xs font-bold transition-all ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isWrong
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : isCurrent
                      ? 'border-2 border-indigo-500 bg-indigo-500/20 text-white'
                      : isAnswered
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-slate-950 text-slate-500 border border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-400">
            <div className="flex items-center justify-between">
              <span>Attempted</span>
              <span className="font-mono tabular-nums font-semibold text-white">
                {Object.keys(selectedAnswers).length} / {questions.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Target Cutoff</span>
              <span className="font-mono tabular-nums font-semibold text-indigo-400">
                75% (TCS Digital / Wipro Turbo Bar)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
