import { TopicLearningDetail } from '../../types/resources';

export const CLOUD_DEVOPS_TOPICS: TopicLearningDetail[] = [
  // 1. Docker & Containerization Fundamentals
  {
    id: 'cloud-docker-containers',
    skillId: 'cloud-containers-docker',
    skillName: 'Containers & Docker Architecture',
    topicTitle: 'Containerization Fundamentals, Dockerfile & Multi-Stage Builds',
    skillCategory: 'Cloud & DevOps Infrastructure',
    careerPaths: ['Cloud Engineer', 'DevOps Engineer', 'Software Engineer', 'Full-Stack Developer'],
    overview: 'Containers package application code with its exact runtime dependencies, system binaries, and configuration files into an immutable image. Master Linux namespaces, cgroups, Dockerfile instructions, multi-stage builds, volumes, port mapping, and container networking.',
    learningObjectives: [
      'Understand the architecture difference between virtual machines (hypervisor) and containers (shared OS kernel).',
      'Write optimized Dockerfiles leveraging multi-stage builds to minimize image size.',
      'Manage container lifecycles (build, run, stop, rm, logs, exec).',
      'Persist state using Docker volumes and map container network ports.',
    ],
    prerequisites: ['Basic Linux terminal commands and application dependencies.'],
    estimatedMinutes: 55,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'Docker is an open-source platform that uses OS-level virtualization to deliver software in standardized packages called containers, guaranteeing identical execution across development, staging, and production environments.',
      whyItMatters: 'Eliminates the classic "it works on my machine" dilemma. Containerization is the prerequisite foundation for modern cloud deployments, microservices, and Kubernetes orchestration.',
      coreConcepts: [
        {
          heading: 'Multi-Stage Dockerfile Optimization',
          explanation: 'Multi-stage builds separate the heavy build environment (compilers, devDependencies) from the lean runtime container.',
          codeExample: {
            language: 'dockerfile',
            code: `# Stage 1: Build & Compile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runner (Reduces image from ~1GB to ~60MB!)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]`,
            output: 'Successfully built runner image [Size: 64.2MB]',
            explanation: 'Only the compiled output and production node_modules are included in the final image, drastically reducing security attack surface and startup time.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Choose a minimal official base image (e.g. `python:3.11-slim` or `node:20-alpine`).',
        '2. Copy dependency lockfiles and install dependencies before copying source code to leverage Docker layer caching.',
        '3. Expose the appropriate application port (`EXPOSE 3000`).',
        '4. Define container entrypoint using `CMD ["command", "arg"]`.',
        '5. Run container with port forwarding: `docker run -d -p 8080:3000 my-image:v1`.',
      ],
      commonMistakes: [
        {
          mistake: 'Running containers as the root user in production.',
          correction: 'Add `USER node` or create an unprivileged user in the Dockerfile to prevent container breakout exploits.',
        },
        {
          mistake: 'Copying `node_modules` or `.git` folders into the Docker build context.',
          correction: 'Always include a `.dockerignore` file containing `node_modules`, `.git`, and `.env` files.',
        },
      ],
      practicalApplications: [
        'Deploying reproducible microservice web apps to AWS ECS, Google Cloud Run, or Kubernetes.',
        'Standardizing local developer onboarding environments across macOS, Linux, and Windows.',
      ],
      summary: 'Containers guarantee runtime parity. Leverage multi-stage builds and minimal base images.',
      revisionChecklist: [
        'How do containers differ from traditional Virtual Machines?',
        'Why should you copy package.json and run npm install before copying the rest of your application code?',
      ],
    },
    resources: [
      {
        id: 'res-dock-1',
        skillId: 'cloud-containers-docker',
        topicId: 'cloud-docker-containers',
        title: 'Docker Official Documentation: Get Started & Dockerfile Best Practices',
        type: 'Documentation',
        description: 'The official Docker reference on container architecture, build cache, and production deployment.',
        url: 'https://docs.docker.com/get-started/',
        difficulty: 'Beginner',
        language: 'DevOps',
        estimatedDuration: '40 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'Docker.com',
      },
      {
        id: 'res-dock-2',
        skillId: 'cloud-containers-docker',
        topicId: 'cloud-docker-containers',
        title: 'freeCodeCamp: Docker Tutorial for Beginners',
        type: 'Video',
        description: 'Hands-on practical video walkthrough building, tagging, and running Docker containers.',
        url: 'https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '45 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
    ],
    quiz: [
      {
        id: 'q-dock-1',
        question: 'Why does order of commands matter in a Dockerfile when caching layers?',
        options: [
          'It changes the execution language of the OS',
          'If a layer changes, all subsequent downstream layers must be invalidated and rebuilt from scratch',
          'Docker rejects Dockerfiles with more than 5 commands',
          'Only the last command is cached',
        ],
        correctAnswerIndex: 1,
        explanation: 'Docker caches each instruction as an intermediate image layer. If a layer changes, all subsequent layers must be re-executed, which is why dependencies should be installed before copying source code.',
      },
    ],
    projects: [
      {
        id: 'proj-dock-1',
        title: 'Multi-Container Application with Docker Compose',
        difficulty: 'Intermediate',
        description: 'Create a multi-container Docker Compose setup connecting a React frontend, Node.js backend, and persistent PostgreSQL database container with health checks.',
        starterSteps: [
          'Write multi-stage Dockerfiles for frontend and backend.',
          'Define `docker-compose.yml` orchestrating services, networks, and named volumes.',
          'Verify persistent database data survives `docker compose down` and `up`.',
        ],
        deliverable: 'A ready-to-run docker-compose.yml setup reproducible on any workstation.',
        techStack: ['Docker', 'Docker Compose', 'Node.js', 'PostgreSQL'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-dock-1',
        question: 'Explain how Linux namespaces and cgroups enable container isolation in Docker.',
        companyTags: ['Google', 'AWS', 'Microsoft'],
        difficulty: 'Hard',
        answerSummary: 'Namespaces provide isolation of system resources, while cgroups (control groups) meter and restrict hardware consumption.',
        deepDive: 'Namespaces isolate what a container can see: PID namespace isolates process IDs, NET namespace provides independent network stacks, MNT isolates filesystem mounts, and IPC isolates inter-process communication. Cgroups dictate how much the container can use: restricting CPU shares, memory caps, and I/O bandwidth. Together, they create isolated userland environments without needing a separate OS kernel.',
      },
    ],
    nextTopicId: 'ds-eda-cleaning',
    prevTopicId: 'cyber-owasp-top10',
  },
];
