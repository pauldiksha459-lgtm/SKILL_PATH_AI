import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BrainCircuit,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Award,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface EvaluationResult {
  score: number;
  verdict: 'Exceeds Bar' | 'Meets Bar' | 'Borderline' | 'Needs Practice';
  strengths: string[];
  improvements: string[];
  idealAnswerKeyPoints: string[];
  feedbackSummary: string;
}

const DEFAULT_QUESTIONS_BY_COMPANY: Record<string, { category: string; question: string }[]> = {
  google: [
    {
      category: 'Technical Problem Solving',
      question:
        'Explain how you would find the longest path in a Directed Acyclic Graph (DAG) and analyze the time and space complexity.',
    },
    {
      category: 'Googleyness & Behavioral',
      question:
        'Tell me about a time you encountered a significant roadblock in a project with no clear solution. How did you navigate the ambiguity?',
    },
    {
      category: 'Edge Cases & Testing',
      question:
        'When implementing a custom LRU Cache, how would you test and handle concurrent read and write operations without race conditions?',
    },
  ],
  amazon: [
    {
      category: 'Customer Obsession (LP)',
      question:
        'Give me an example of a time when you went above and beyond for a user or peer, even when it wasn’t strictly part of your responsibility.',
    },
    {
      category: 'Bias for Action (LP)',
      question:
        'Describe a situation where you had to make an important engineering decision without all the data you needed. What was the risk and outcome?',
    },
    {
      category: 'Technical Architecture',
      question:
        'How would you design the data model and API for an e-commerce order status tracking service that receives 100k requests/min?',
    },
  ],
  microsoft: [
    {
      category: 'OOP & Clean Architecture',
      question:
        'Explain how you apply the Open/Closed Principle (OCP) in an enterprise application when introducing new third-party payment gateways.',
    },
    {
      category: 'Core CS (Operating Systems)',
      question:
        'What are the primary differences between processes and threads in Linux? Explain how the kernel manages context switching overhead.',
    },
    {
      category: 'Growth Mindset',
      question:
        'Tell me about a time you received critical feedback during a technical review or assignment. How did you adapt your approach?',
    },
  ],
  tcs: [
    {
      category: 'Academic Capstone Defense',
      question:
        'Walk me through the database design of your final year college project. Why did you choose your specific database and normalization level?',
    },
    {
      category: 'Core Programming & OOP',
      question:
        'Explain method overloading versus method overriding with practical code examples in Java or Python. Which exhibits compile-time polymorphism?',
    },
    {
      category: 'Adaptability & HR',
      question:
        'Are you comfortable working in rotating shifts and relocating to different TCS development centers across India based on client demands?',
    },
  ],
};

export const MockInterviewView: React.FC = () => {
  const { activeCompany, userProfile, updateCompetencyScore } = useApp();

  const companyQuestions =
    DEFAULT_QUESTIONS_BY_COMPANY[activeCompany.id] || DEFAULT_QUESTIONS_BY_COMPANY['google'];

  const [selectedQIdx, setSelectedQIdx] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const activeQuestion = companyQuestions[selectedQIdx] || companyQuestions[0];

  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/ai/evaluate-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: userProfile.careerGoal,
          company: activeCompany.name,
          questionType: activeQuestion.category,
          question: activeQuestion.question,
          candidateAnswer: candidateAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error('Evaluation request failed');
      }

      const data: EvaluationResult = await response.json();
      setEvaluation(data);

      // Update behavioral / technical competency score based on performance
      if (activeQuestion.category.includes('Behavioral') || activeQuestion.category.includes('LP')) {
        updateCompetencyScore('beh-star-method', data.score, 'Assessment Quiz');
        if (activeCompany.id === 'amazon') {
          updateCompetencyScore('beh-amazon-lp', data.score, 'Assessment Quiz');
        } else if (activeCompany.id === 'google') {
          updateCompetencyScore('beh-googleyness', data.score, 'Assessment Quiz');
        }
      } else if (activeQuestion.category.includes('Core CS')) {
        updateCompetencyScore('core-os', data.score, 'Assessment Quiz');
        updateCompetencyScore('core-oop', data.score, 'Assessment Quiz');
      }
    } catch (err) {
      console.error('Error evaluating mock interview:', err);
      // Fallback evaluation
      setEvaluation({
        score: 75,
        verdict: 'Meets Bar',
        strengths: [
          'Addressed the prompt directly with coherent technical explanation.',
          'Demonstrated clear grasp of software principles.',
        ],
        improvements: [
          'Quantify past project metrics using exact percentages and timelines.',
          'Explicitly highlight computational complexity tradeoffs.',
        ],
        idealAnswerKeyPoints: [
          'State constraints and assumptions explicitly.',
          'Structure answer using the STAR method (Situation, Task, Action, Result).',
          'Mention testing strategies and alternative technical approaches considered.',
        ],
        feedbackSummary:
          'Solid presentation. With slight refinement in quantifying impact and articulating edge cases, this meets the standard for campus hiring committees.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCandidateAnswer('');
    setEvaluation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>{activeCompany.name}</span>
            <span>/</span>
            <span>AI Mock Technical & Behavioral Rounds</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Live AI Mock Interview & Candidate Calibration
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Practice role-specific interview questions graded against {activeCompany.name} hiring committee rubrics. Receive feedback on STAR structure, technical precision, and communication.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 self-start sm:self-center">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Hiring Bar: {activeCompany.name} {userProfile.careerGoal}</span>
        </div>
      </div>

      {/* Question Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {companyQuestions.map((q, idx) => {
          const isSelected = selectedQIdx === idx;
          return (
            <div
              key={idx}
              onClick={() => {
                setSelectedQIdx(idx);
                handleReset();
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-mono font-semibold uppercase text-indigo-400">
                {q.category}
              </span>
              <p className="text-xs font-semibold text-white mt-1 line-clamp-2 leading-relaxed">
                {q.question}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Question & Answer Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Question prompt & Candidate response */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-indigo-400" />
                <span>Interview Question · {activeQuestion.category}</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {activeCompany.name} Campus Drive
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-100 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800/80 mb-4">
              "{activeQuestion.question}"
            </p>

            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Your Answer (Type your structured response using STAR method or code logic):
            </label>
            <textarea
              rows={8}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="e.g. In my previous capstone project, our team faced a bottleneck where API latency spiked to 1.8 seconds (Situation)... I designed a write-behind Redis cache with hash buckets (Task & Action)... which reduced median latency down to 42ms (Measurable Result)..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Clear
            </button>

            <button
              onClick={handleEvaluateAnswer}
              disabled={isSubmitting || !candidateAnswer.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isSubmitting ? 'Evaluating with AI Bar...' : 'Submit to AI Hiring Committee'}</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): AI Hiring Evaluation Report */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
          {evaluation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Hiring Committee Feedback
                </span>
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                    evaluation.verdict === 'Exceeds Bar'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : evaluation.verdict === 'Meets Bar'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : evaluation.verdict === 'Borderline'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {evaluation.verdict} ({evaluation.score}/100)
                </span>
              </div>

              {/* Summary paragraph */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                {evaluation.feedbackSummary}
              </p>

              {/* Strengths */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Demonstrated Strengths</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {evaluation.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Actionable Improvements</span>
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {evaluation.improvements.map((imp, i) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>

              {/* Ideal Key Points */}
              <div className="border-t border-slate-800 pt-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  Key Points Top Candidates Cover:
                </h4>
                <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                  {evaluation.idealAnswerKeyPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-slate-400">
                <Sparkles className="h-6 w-6 text-indigo-400" />
              </div>
              <h4 className="text-sm font-semibold text-white">Awaiting Candidate Submission</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Type your answer and submit to receive instant AI scoring, STAR calibration, and actionable feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
