import { TopicLearningDetail } from '../../types/resources';

export const FULL_STACK_TOPICS: TopicLearningDetail[] = [
  // 1. React Component Architecture & Hooks
  {
    id: 'fs-react-hooks',
    skillId: 'fs-frontend-react',
    skillName: 'React & Modern Frontend Architecture',
    topicTitle: 'React Component Architecture, State & Hooks',
    skillCategory: 'Frontend Engineering',
    careerPaths: ['Full-Stack Developer', 'Software Engineer'],
    overview: 'Modern React uses functional components with unidirectional data flow and built-in hooks (useState, useEffect, useMemo, useCallback, useRef, useContext). Master declarative rendering, dependency array gotchas, and custom hooks for state reuse.',
    learningObjectives: [
      'Master the component rendering lifecycle and virtual DOM reconciliation.',
      'Manage immutable state using useState and useReducer.',
      'Synchronize with external systems using useEffect and cleanup functions.',
      'Optimize re-renders with useMemo, useCallback, and React.memo.',
      'Build reusable custom hooks for API data fetching and browser listeners.',
    ],
    prerequisites: ['JavaScript ES6+ (Destructuring, Promises, Arrow Functions, Modules).'],
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'React is a component-driven JavaScript library for building user interfaces through declarative JSX templates, maintaining high efficiency via virtual DOM diffing.',
      whyItMatters: 'React is the dominant frontend framework requested across startups, mid-sized product tech firms, and large enterprise companies worldwide.',
      coreConcepts: [
        {
          heading: 'State Immutability & Functional Updates',
          explanation: 'State in React must never be mutated directly. Always supply a new object or array reference to trigger re-renders.',
          codeExample: {
            language: 'typescript',
            code: `import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const TaskTracker: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const toggleTask = (id: string) => {
    // Immutable update using map to return new array reference
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return <div>Active Tasks: {tasks.filter(t => !t.completed).length}</div>;
};`,
            output: 'Active Tasks: 0',
            explanation: 'The functional update `prev => prev.map(...)` guarantees access to the latest state value without stale closure bugs.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Decompose UI mockups into a hierarchical tree of single-responsibility components.',
        '2. Identify minimal but complete representation of UI state.',
        '3. Determine which parent component owns the state (lift state up where needed).',
        '4. Add inverse data flow via callback props.',
      ],
      commonMistakes: [
        {
          mistake: 'Mutating array state directly: `tasks.push(new_task); setTasks(tasks);`',
          correction: 'React detects state changes using shallow object reference equality `===`. Mutating in-place fails to trigger a re-render. Always create a new copy: `setTasks([...tasks, new_task])`.',
        },
        {
          mistake: 'Missing cleanup functions in `useEffect` when setting up interval timers or event listeners.',
          correction: 'Return a cleanup function `return () => clearInterval(id)` to prevent memory leaks.',
        },
      ],
      practicalApplications: [
        'Single-page application reactive dashboards.',
        'Real-time data streaming widgets with WebSocket integration.',
      ],
      summary: 'Keep components pure, state immutable, and effects synchronized with clean dependency arrays.',
      revisionChecklist: [
        'Why does React require state to be updated immutably?',
        'What is the difference between useMemo (caches computed value) and useCallback (caches function instance)?',
      ],
    },
    resources: [
      {
        id: 'res-react-1',
        skillId: 'fs-frontend-react',
        topicId: 'fs-react-hooks',
        title: 'Official React Documentation: Describing the UI & Adding Interactivity',
        type: 'Documentation',
        description: 'The official modern React.dev guide covering state, props, rendering, and custom hooks.',
        url: 'https://react.dev/learn',
        difficulty: 'Beginner',
        language: 'TypeScript / React',
        estimatedDuration: '45 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'React.dev',
      },
      {
        id: 'res-react-2',
        skillId: 'fs-frontend-react',
        topicId: 'fs-react-hooks',
        title: 'freeCodeCamp: Learn React 18 with TypeScript',
        type: 'Course',
        description: 'Complete hands-on curriculum building full interactive applications with modern React.',
        url: 'https://www.freecodecamp.org/news/learn-react-with-typescript/',
        difficulty: 'Intermediate',
        language: 'TypeScript',
        estimatedDuration: '1.5 hours',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
    ],
    quiz: [
      {
        id: 'q-react-1',
        question: 'Why does React not trigger a re-render when you push an item into state using `array.push()`?',
        options: [
          'Because React checks strict object reference equality (Object.is) and the memory address remained identical',
          'Because arrays are prohibited in state',
          'Because push() returns the new length instead of the array',
          'Because re-renders only occur on user mouse clicks',
        ],
        correctAnswerIndex: 0,
        explanation: 'React compares previous state to next state via Object.is. Since mutating in-place leaves the array pointer unchanged, React concludes nothing changed and skips re-rendering.',
      },
    ],
    projects: [
      {
        id: 'proj-react-1',
        title: 'Kanban Task Board with Custom Drag Hooks',
        difficulty: 'Intermediate',
        description: 'Build a reactive Kanban board with Columns (Todo, In Progress, Done), persistent localStorage sync, and custom useLocalStorage hook.',
        starterSteps: [
          'Create `useLocalStorage<T>(key, initialValue)` custom hook.',
          'Render draggable task cards with optimistic UI updates.',
          'Add filtering by category and search keyword.',
        ],
        deliverable: 'A clean interactive React application with zero external state libraries.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-react-1',
        question: 'What is the Virtual DOM and how does React reconciliation work?',
        companyTags: ['Meta', 'Uber', 'Atlassian'],
        difficulty: 'Medium',
        answerSummary: 'The Virtual DOM is a lightweight in-memory JavaScript representation of the actual browser DOM elements.',
        deepDive: 'When component state changes, React constructs a new Virtual DOM tree and runs a diffing algorithm (Fiber reconciler) against the previous tree. By assuming components of different types generate different trees and using stable unique `key` props on lists, React computes the minimum number of real DOM mutations necessary, minimizing expensive browser layout recalibrations.',
      },
    ],
    nextTopicId: 'fs-rest-apis',
    prevTopicId: 't-1-1',
  },

  // 2. REST API Design & Node.js Backend
  {
    id: 'fs-rest-apis',
    skillId: 'fs-backend-node',
    skillName: 'REST API & Backend Engineering',
    topicTitle: 'RESTful API Architecture, Express & HTTP Verbs',
    skillCategory: 'Backend Engineering',
    careerPaths: ['Full-Stack Developer', 'Software Engineer'],
    overview: 'REST (Representational State Transfer) is the architectural standard for stateless web service communication. Master resource naming, HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes, middleware, input validation, and JWT authentication.',
    learningObjectives: [
      'Design RESTful URL endpoints following resource-oriented naming standards.',
      'Differentiate idempotent (PUT, DELETE) vs non-idempotent (POST) methods.',
      'Structure Express middleware chains for logging, CORS, and auth verification.',
      'Return semantic HTTP status codes (200, 201, 400, 401, 403, 404, 500).',
    ],
    prerequisites: ['JavaScript Async/Await and JSON data structures.'],
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'A REST API is an application programming interface adhering to REST constraints: stateless client-server interactions, cacheable responses, uniform interfaces, and resource-based URL endpoints.',
      whyItMatters: 'Every modern full-stack web and mobile application connects client frontends to cloud databases through REST or GraphQL APIs.',
      coreConcepts: [
        {
          heading: 'HTTP Verbs & Status Code Semantics',
          explanation: '• GET: Retrieve resource (safe, idempotent, returns 200 OK)\n• POST: Create new resource (not idempotent, returns 201 Created)\n• PUT: Replace entire resource (idempotent, returns 200 OK)\n• PATCH: Partial update (returns 200 OK)\n• DELETE: Remove resource (idempotent, returns 204 No Content or 200 OK)',
        },
      ],
      stepByStepGuide: [
        '1. Use plural nouns for resources (`/api/v1/students` instead of `/api/v1/getStudents`).',
        '2. Use sub-resources for relations (`/api/v1/students/:id/courses`).',
        '3. Validate request payload headers and schemas before hitting database controllers.',
        '4. Implement global centralized error handling middleware.',
      ],
      commonMistakes: [
        {
          mistake: 'Using verbs in URLs like `POST /delete-user/123`.',
          correction: 'Use HTTP verbs with clean resource nouns: `DELETE /users/123`.',
        },
        {
          mistake: 'Returning `200 OK` with `{ error: "Not Found" }` in the response body.',
          correction: 'Return standard semantic status code `404 Not Found` so HTTP clients and monitoring tools recognize the error.',
        },
      ],
      practicalApplications: [
        'Backend service microservices communicating with PostgreSQL databases.',
        'Public third-party developer platforms (Stripe, GitHub API).',
      ],
      summary: 'Design clean, predictable, stateless resource APIs with standard HTTP verbs and status codes.',
      revisionChecklist: [
        'What does idempotency mean and which HTTP methods are idempotent?',
        'What is the difference between 401 Unauthorized and 403 Forbidden?',
      ],
    },
    resources: [
      {
        id: 'res-rest-1',
        skillId: 'fs-backend-node',
        topicId: 'fs-rest-apis',
        title: 'MDN Web Docs: HTTP Overview & Status Codes',
        type: 'Documentation',
        description: 'Complete official MDN documentation on HTTP protocol, request methods, and response codes.',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
        difficulty: 'Beginner',
        language: 'HTTP',
        estimatedDuration: '30 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'MDN Web Docs',
      },
    ],
    quiz: [
      {
        id: 'q-rest-1',
        question: 'Which HTTP status code should be returned after successfully creating a new user resource via POST?',
        options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
        correctAnswerIndex: 1,
        explanation: '201 Created indicates the request succeeded and resulted in a new resource being created on the server.',
      },
    ],
    projects: [
      {
        id: 'proj-rest-1',
        title: 'Stateless JWT Placement Portal API',
        difficulty: 'Intermediate',
        description: 'Build an Express.js REST API with input validation (Zod), JWT Bearer authentication, and CRUD endpoints for placement applications.',
        starterSteps: [
          'Configure Express with CORS and JSON body parser.',
          'Add JWT auth middleware verifying Authorization: Bearer <token>.',
          'Implement CRUD routes with semantic status codes and error handling.',
        ],
        deliverable: 'A running Node.js REST API server with Postman/Swagger documentation.',
        techStack: ['Node.js', 'Express', 'JWT', 'TypeScript'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-rest-1',
        question: 'What is the difference between PUT and PATCH in RESTful API design?',
        companyTags: ['Amazon', 'Microsoft', 'Oracle'],
        difficulty: 'Medium',
        answerSummary: 'PUT replaces the entire resource representation, while PATCH applies partial modifications.',
        deepDive: 'When executing a PUT request, any omitted field in the request payload should be removed or set to null/default according to strict REST specification. A PATCH request modifies only the specific fields provided in the body, leaving untouched attributes intact. PUT is strictly idempotent (executing it 10 times yields identical state), while PATCH can be non-idempotent if using append-style patch directives.',
      },
    ],
    nextTopicId: 'fs-react-hooks',
    prevTopicId: 't-4-1',
  },
];
