import { TopicLearningDetail } from '../../types/resources';
import { CareerGoal } from '../../types';
import { ROADMAP_MODULES } from '../roadmaps';
import { AI_ML_TOPICS } from './aiMachineLearning';
import { SOFTWARE_ENGINEERING_TOPICS } from './softwareEngineering';
import { FULL_STACK_TOPICS } from './fullStackDev';
import { CYBERSECURITY_TOPICS } from './cybersecurity';
import { CLOUD_DEVOPS_TOPICS } from './cloudDevops';
import { DATA_SCIENCE_TOPICS } from './dataScience';

// Core combined catalog of curated deep-dive topics
const CORE_CATALOG: TopicLearningDetail[] = [
  ...AI_ML_TOPICS,
  ...SOFTWARE_ENGINEERING_TOPICS,
  ...FULL_STACK_TOPICS,
  ...CYBERSECURITY_TOPICS,
  ...CLOUD_DEVOPS_TOPICS,
  ...DATA_SCIENCE_TOPICS,
];

// Helper to synthesize a detailed topic if it originates from ROADMAP_MODULES and isn't in CORE_CATALOG yet
function synthesizeRoadmapTopic(topicId: string): TopicLearningDetail | null {
  for (const module of ROADMAP_MODULES) {
    const found = module.topics.find((t) => t.id === topicId);
    if (found) {
      return {
        id: found.id,
        skillId: module.id,
        skillName: module.title,
        topicTitle: found.title,
        skillCategory: module.category,
        careerPaths: module.applicableRoles.length > 0 ? module.applicableRoles : ['Software Engineer'],
        overview: found.description,
        learningObjectives: [
          `Master core theoretical invariants of ${found.title}.`,
          `Implement optimal time and space complexity algorithms for ${found.title}.`,
          `Analyze practical placement interview problem patterns.`,
          `Avoid common edge case pitfalls and boundary mistakes.`,
        ],
        prerequisites: ['Basic programming syntax and algorithmic foundations.'],
        estimatedMinutes: found.estimatedMinutes,
        difficulty: found.estimatedMinutes > 75 ? 'Advanced' : found.estimatedMinutes > 50 ? 'Intermediate' : 'Beginner',
        studyNotes: {
          definition: `${found.title} is a core requirement within ${module.title}. It provides essential techniques for campus technical screening rounds and engineering interviews.`,
          whyItMatters: `Tested extensively across placement drives including Google, Microsoft, Amazon, TCS Digital, and Infosys. Mastering ${found.title} builds reusable problem-solving competence.`,
          coreConcepts: [
            {
              heading: 'Core Problem Invariants',
              explanation: found.description,
            },
            {
              heading: 'Step-by-Step Problem Solving Approach',
              explanation: '1. Clarify constraints and edge cases (empty input, negatives, large numbers).\n2. Write out a brute-force approach and establish baseline time/space complexity.\n3. Identify redundant subproblems, sorting opportunities, or appropriate data structures (Hash Map, Priority Queue, Two Pointers).\n4. Trace sample execution step-by-step before finalizing implementation.',
            },
          ],
          commonMistakes: [
            {
              mistake: 'Failing to test edge cases such as empty inputs, single-element collections, or duplicate values.',
              correction: 'Always walk through extreme boundary values before concluding code implementation.',
            },
          ],
          practicalApplications: [
            'High-throughput backend data pipelines.',
            'Technical campus recruitment screening coding challenges.',
          ],
          summary: `Consistent practice on ${found.title} reinforces fundamental computer science competence.`,
          revisionChecklist: [
            `Can you explain the optimal time and space complexity of ${found.title}?`,
            'What are the primary edge cases to look out for?',
          ],
        },
        resources: [
          {
            id: `res-${found.id}-1`,
            skillId: module.id,
            topicId: found.id,
            title: `LeetCode & Practice Sets for ${found.title}`,
            type: 'Practice',
            description: `Curated practice challenge sets covering ${found.title}.`,
            url: 'https://leetcode.com/problemset/all/',
            difficulty: 'Intermediate',
            language: 'Language Agnostic',
            estimatedDuration: `${found.estimatedMinutes} mins`,
            verificationStatus: 'HISTORICALLY_REPORTED',
            lastVerifiedDate: '2026-10-24',
            isExternal: true,
            platformName: 'LeetCode',
          },
          {
            id: `res-${found.id}-2`,
            skillId: module.id,
            topicId: found.id,
            title: `GeeksforGeeks Placement Reference: ${found.title}`,
            type: 'Study Notes',
            description: `Comprehensive tutorials, code walkthroughs, and practice problems on ${found.title}.`,
            url: 'https://www.geeksforgeeks.org/',
            difficulty: 'Intermediate',
            language: 'Python / Java / C++',
            estimatedDuration: '40 mins',
            verificationStatus: 'VERIFIED_OFFICIAL',
            lastVerifiedDate: '2026-10-24',
            isExternal: true,
            platformName: 'GeeksforGeeks',
          },
        ],
        quiz: [
          {
            id: `q-${found.id}-1`,
            question: `What is the primary objective when optimizing solutions for ${found.title}?`,
            options: [
              'Minimizing time complexity while bounding auxiliary space within limits',
              'Writing as many lines of code as possible',
              'Using global variables exclusively',
              'Ignoring edge cases',
            ],
            correctAnswerIndex: 0,
            explanation: 'Algorithmic efficiency is measured by optimal time complexity while maintaining responsible auxiliary memory usage.',
          },
        ],
        projects: [
          {
            id: `proj-${found.id}-1`,
            title: `${found.title} Real-World Implementation`,
            difficulty: 'Intermediate',
            description: `Construct an end-to-end verified utility demonstrating ${found.title} in action with test coverage.`,
            starterSteps: [
              'Define clean function signatures with type hints.',
              'Implement core algorithmic logic.',
              'Write unit test cases verifying boundary inputs.',
            ],
            deliverable: 'A clean script with test assertions.',
            techStack: ['Python / Java / C++'],
          },
        ],
        interviewQuestions: [
          {
            id: `iq-${found.id}-1`,
            question: `How would you approach solving a problem related to ${found.title} in a 45-minute live technical interview?`,
            companyTags: ['Google', 'Microsoft', 'Amazon'],
            difficulty: 'Medium',
            answerSummary: 'Ask clarifying questions, state brute force complexity, optimize using appropriate data structures, and trace with sample test inputs.',
            deepDive: 'Never jump straight into writing code. Discuss trade-offs with the interviewer, write out the algorithm in plain English or pseudo-code, identify invariants, and dry run through sample edge cases to demonstrate communication clarity.',
          },
        ],
      };
    }
  }
  return null;
}

// Get full topic detail by ID
export function getTopicDetail(topicId: string): TopicLearningDetail | null {
  const existing = CORE_CATALOG.find((t) => t.id === topicId);
  if (existing) return existing;
  return synthesizeRoadmapTopic(topicId);
}

// Get all topics across the platform
export function getAllTopics(): TopicLearningDetail[] {
  // Collect all topic IDs from roadmaps
  const roadmapTopicDetails: TopicLearningDetail[] = [];
  for (const module of ROADMAP_MODULES) {
    for (const t of module.topics) {
      if (!CORE_CATALOG.some((c) => c.id === t.id)) {
        const synth = synthesizeRoadmapTopic(t.id);
        if (synth) roadmapTopicDetails.push(synth);
      }
    }
  }
  return [...CORE_CATALOG, ...roadmapTopicDetails];
}

// Filter topics by career path
export function getTopicsForCareer(career: CareerGoal): TopicLearningDetail[] {
  const all = getAllTopics();
  return all.filter((t) => t.careerPaths.includes(career));
}

// Search across all topics and resources
export function searchTopics(
  query: string,
  categoryFilter?: string,
  difficultyFilter?: string
): TopicLearningDetail[] {
  const all = getAllTopics();
  const q = query.toLowerCase().trim();

  return all.filter((topic) => {
    if (categoryFilter && categoryFilter !== 'All' && topic.skillCategory !== categoryFilter) {
      return false;
    }
    if (difficultyFilter && difficultyFilter !== 'All' && topic.difficulty !== difficultyFilter) {
      return false;
    }
    if (!q) return true;

    const matchesTitle = topic.topicTitle.toLowerCase().includes(q);
    const matchesSkill = topic.skillName.toLowerCase().includes(q);
    const matchesOverview = topic.overview.toLowerCase().includes(q);
    const matchesResources = topic.resources.some((r) => r.title.toLowerCase().includes(q));

    return matchesTitle || matchesSkill || matchesOverview || matchesResources;
  });
}
