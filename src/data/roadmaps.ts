import { RoadmapModule } from '../types';

export const ROADMAP_MODULES: RoadmapModule[] = [
  // Module 1: Foundational DSA
  {
    id: 'mod-dsa-foundations',
    title: 'Data Structures & Algorithmic Foundations',
    description: 'Master linear data structures, pointer mechanics, and asymptotic Big-O runtime/space complexity.',
    category: 'DSA Core',
    estimatedHours: 18,
    order: 1,
    competencyIds: ['dsa-arrays-strings', 'dsa-hash-maps', 'dsa-linked-lists'],
    applicableCompanies: [], // Universal
    applicableRoles: [
      'Software Engineer',
      'Full-Stack Developer',
      'AI/ML Engineer',
      'Cloud Engineer',
      'DevOps Engineer',
      'Mobile Application Developer',
    ],
    isCompleted: false,
    topics: [
      { id: 't-1-1', title: 'Asymptotic Analysis & Big-O Notation', completed: false, description: 'Analyze worst, best, and amortized time complexity across loops and recursion.', estimatedMinutes: 60 },
      { id: 't-1-2', title: 'Two Pointers & Sliding Window Techniques', completed: false, description: 'Solve string and array problems with O(N) linear time and O(1) auxiliary space.', estimatedMinutes: 90 },
      { id: 't-1-3', title: 'Hash Table Collision Strategies & Sets', completed: false, description: 'Understand bucket arrays, open addressing, and O(1) amortized lookup.', estimatedMinutes: 75 },
      { id: 't-1-4', title: 'Fast & Slow Pointer Cycle Detection in Linked Lists', completed: false, description: 'Floyd cycle detection algorithm without allocating additional memory nodes.', estimatedMinutes: 60 },
    ],
  },

  // Module 2: Non-Linear DSA (Trees & Heaps)
  {
    id: 'mod-trees-heaps',
    title: 'Hierarchical Structures: Trees, BSTs & Heaps',
    description: 'Traverse recursive tree structures, binary search tree invariants, and priority queues.',
    category: 'DSA Advanced',
    estimatedHours: 20,
    order: 2,
    competencyIds: ['dsa-trees-bst', 'dsa-heaps'],
    applicableCompanies: ['google', 'microsoft', 'amazon', 'apple', 'nvidia', 'tcs', 'infosys'],
    applicableRoles: ['Software Engineer', 'AI/ML Engineer', 'Full-Stack Developer'],
    isCompleted: false,
    topics: [
      { id: 't-2-1', title: 'Binary Tree BFS Level Order Traversal', completed: false, description: 'Implement queue-based breadth-first level traversals with zigzag variations.', estimatedMinutes: 60 },
      { id: 't-2-2', title: 'Recursive DFS: Inorder, Preorder, Postorder', completed: false, description: 'Trace call stack memory and serialize/deserialize binary trees.', estimatedMinutes: 75 },
      { id: 't-2-3', title: 'Validating BST & Lowest Common Ancestor (LCA)', completed: false, description: 'Enforce subtree invariant boundaries and locate ancestors efficiently.', estimatedMinutes: 90 },
      { id: 't-2-4', title: 'Min/Max Heaps & Top K Frequent Patterns', completed: false, description: 'Build heaps in O(N) time and maintain bounded priority queues for streaming data.', estimatedMinutes: 90 },
    ],
  },

  // Module 3: Graph Traversal & Dynamic Programming (Google & High-Tier Focus)
  {
    id: 'mod-graphs-dp',
    title: 'Graph Traversal & Dynamic Programming Masterclass',
    description: 'Graph representations, topological sort, Dijkstra shortest paths, and multi-dimensional memoization.',
    category: 'DSA Advanced',
    estimatedHours: 26,
    order: 3,
    competencyIds: ['dsa-graphs', 'dsa-dynamic-programming'],
    applicableCompanies: ['google', 'microsoft', 'amazon', 'apple', 'nvidia'],
    applicableRoles: ['Software Engineer', 'AI/ML Engineer'],
    isCompleted: false,
    topics: [
      { id: 't-3-1', title: 'Adjacency Lists & Matrix Representation', completed: false, description: 'Model directed and undirected networks with cycle detection algorithms.', estimatedMinutes: 60 },
      { id: 't-3-2', title: 'Topological Sort (Kahn Algorithm & DFS Postorder)', completed: false, description: 'Resolve prerequisite build systems and task scheduling orders.', estimatedMinutes: 80 },
      { id: 't-3-3', title: 'Dijkstra & Shortest Path with Priority Queues', completed: false, description: 'Find minimum edge-weighted paths with non-negative costs.', estimatedMinutes: 90 },
      { id: 't-3-4', title: '1D Dynamic Programming: Fibonacci to Coin Change', completed: false, description: 'Identify optimal substructure and overlapping subproblems.', estimatedMinutes: 90 },
      { id: 't-3-5', title: '2D DP: Longest Common Subsequence & Edit Distance', completed: false, description: 'Construct 2D state transition tables and reconstruct optimal paths.', estimatedMinutes: 120 },
    ],
  },

  // Module 4: Core Computer Science Foundations (Microsoft & TCS Focus)
  {
    id: 'mod-core-cs',
    title: 'Core Computer Science Essentials (DBMS, OS, Networks, OOP)',
    category: 'Core CS',
    description: 'Master the foundational CS concepts tested heavily in Microsoft, TCS Digital, and Infosys technical rounds.',
    estimatedHours: 22,
    order: 4,
    competencyIds: ['core-dbms-sql', 'core-oop', 'core-os', 'core-networks'],
    applicableCompanies: [], // Universal
    applicableRoles: ['Software Engineer', 'Full-Stack Developer', 'Cloud Engineer', 'DevOps Engineer'],
    isCompleted: false,
    topics: [
      { id: 't-4-1', title: 'Relational Database Schema & Normalization (1NF to BCNF)', completed: false, description: 'Prevent insertion, update, and deletion anomalies while structuring tables.', estimatedMinutes: 75 },
      { id: 't-4-2', title: 'ACID Properties, Transactions & Isolation Levels', completed: false, description: 'Understand dirty reads, non-repeatable reads, and serializable locks.', estimatedMinutes: 60 },
      { id: 't-4-3', title: 'Processes vs Threads & Concurrency Synchronization', completed: false, description: 'Context switching, mutexes, semaphores, and avoiding deadlock conditions.', estimatedMinutes: 90 },
      { id: 't-4-4', title: 'Computer Networks: TCP 3-Way Handshake, DNS & HTTP/S', completed: false, description: 'Trace packet life cycle from browser URL request to server response.', estimatedMinutes: 75 },
      { id: 't-4-5', title: 'SOLID Principles in Clean Object-Oriented Code', completed: false, description: 'Apply Single Responsibility, Open/Closed, and Dependency Inversion in code.', estimatedMinutes: 60 },
    ],
  },

  // Module 5: Campus Placement Aptitude & Cognitive Reasoning (TCS, Infosys, Wipro, Accenture)
  {
    id: 'mod-aptitude-bootcamp',
    title: 'Campus Placement Cognitive Aptitude Bootcamp',
    description: 'Crack quantitative maths, analytical reasoning, and verbal communicative tests for Indian campus drives.',
    category: 'Aptitude & Reasoning',
    estimatedHours: 16,
    order: 5,
    competencyIds: ['apt-quantitative', 'apt-logical', 'apt-verbal', 'apt-pseudocode'],
    applicableCompanies: ['tcs', 'infosys', 'wipro', 'accenture', 'capgemini', 'cognizant'],
    applicableRoles: [
      'Software Engineer',
      'Full-Stack Developer',
      'Data Analyst',
      'Cybersecurity Analyst or Engineer',
      'Cloud Engineer',
    ],
    isCompleted: false,
    topics: [
      { id: 't-5-1', title: 'Quantitative Aptitude: Time, Speed, Distance & Work', completed: false, description: 'Rapid formulaic techniques for relative speed, train crossings, and pipes.', estimatedMinutes: 60 },
      { id: 't-5-2', title: 'Percentages, Profit & Loss, and Compound Interest', completed: false, description: 'Master fractional multiplier tricks to solve problems in under 60 seconds.', estimatedMinutes: 60 },
      { id: 't-5-3', title: 'Logical Deductions, Syllogisms & Blood Relations', completed: false, description: 'Euler circle diagrams and family tree mapping for zero-error deductions.', estimatedMinutes: 60 },
      { id: 't-5-4', title: 'Pseudo-Code Output Tracing & Bitwise Logic', completed: false, description: 'Trace nested iteration loops, bitwise shifts, and conditional recursions.', estimatedMinutes: 90 },
      { id: 't-5-5', title: 'Automated Essay Writing & Business Grammar', completed: false, description: 'Compose structured essays meeting AI grading rubrics for Wipro and Accenture.', estimatedMinutes: 60 },
    ],
  },

  // Module 6: System Design & Architecture (Product & Big Tech Focus)
  {
    id: 'mod-system-design',
    title: 'Low-Level Design (LLD) & High-Level Architecture Basics',
    description: 'Translate ambiguous product requirements into clean UML class designs and resilient distributed microservices.',
    category: 'Architecture',
    estimatedHours: 18,
    order: 6,
    competencyIds: ['sys-lld', 'sys-hld'],
    applicableCompanies: ['google', 'microsoft', 'amazon', 'apple', 'nvidia'],
    applicableRoles: ['Software Engineer', 'Full-Stack Developer', 'Cloud Engineer'],
    isCompleted: false,
    topics: [
      { id: 't-6-1', title: 'Object-Oriented Design: Parking Lot & Elevator System', completed: false, description: 'Design clean class diagrams, interfaces, and state patterns for classic problems.', estimatedMinutes: 90 },
      { id: 't-6-2', title: 'Design Patterns: Factory, Singleton, Strategy & Observer', completed: false, description: 'Implement battle-tested software engineering design patterns in code.', estimatedMinutes: 75 },
      { id: 't-6-3', title: 'Horizontal vs Vertical Scaling, Load Balancers & CDNs', completed: false, description: 'Distribute client traffic and cache static assets for low-latency worldwide delivery.', estimatedMinutes: 60 },
      { id: 't-6-4', title: 'Database Sharding, Replication & Consistency Models', completed: false, description: 'CAP theorem, eventual consistency, and read replicas versus write leaders.', estimatedMinutes: 75 },
    ],
  },

  // Module 7: Behavioral, Leadership Principles & Googleyness
  {
    id: 'mod-behavioral-mastery',
    title: 'Behavioral Interviews & Leadership Principles',
    description: 'Frame authentic college experiences and internship stories into high-impact STAR narratives.',
    category: 'Interview Strategy',
    estimatedHours: 10,
    order: 7,
    competencyIds: ['beh-star-method', 'beh-amazon-lp', 'beh-googleyness'],
    applicableCompanies: [], // Universal
    applicableRoles: [
      'Software Engineer',
      'AI/ML Engineer',
      'Data Scientist',
      'Data Analyst',
      'Cloud Engineer',
      'Full-Stack Developer',
    ],
    isCompleted: false,
    topics: [
      { id: 't-7-1', title: 'The STAR Framework: Situation, Task, Action & Result', completed: false, description: 'Eliminate vague statements by emphasizing personal actions and quantified outcomes.', estimatedMinutes: 60 },
      { id: 't-7-2', title: 'Amazon 16 Leadership Principles In-Depth', completed: false, description: 'Prepare concrete scenarios demonstrating Customer Obsession, Ownership, and Have Backbone.', estimatedMinutes: 90 },
      { id: 't-7-3', title: 'Googleyness: Navigating Ambiguity & Ethical Decisions', completed: false, description: 'Demonstrate intellectual curiosity, team collaboration, and proactive problem solving.', estimatedMinutes: 60 },
      { id: 't-7-4', title: 'Campus Capstone Project Pitch & Technical Defense', completed: false, description: 'Deliver a structured 3-minute executive summary of your major college project.', estimatedMinutes: 60 },
    ],
  },

  // Module 8: AI / ML Engineer Specialization
  {
    id: 'mod-aiml-specialization',
    title: 'AI/ML Engineering: Math, Modeling & PyTorch',
    description: 'Vectorized computing, statistical modeling, classical machine learning algorithms, and deep learning architectures.',
    category: 'AI/ML Track',
    estimatedHours: 28,
    order: 8,
    competencyIds: ['aiml-python-data', 'aiml-math-stats', 'aiml-algorithms', 'aiml-deep-learning'],
    applicableCompanies: ['google', 'microsoft', 'nvidia', 'amazon'],
    applicableRoles: ['AI/ML Engineer', 'Data Scientist'],
    isCompleted: false,
    topics: [
      { id: 't-8-1', title: 'NumPy Vectorization & Pandas Data Pipelines', completed: false, description: 'Manipulate high-dimensional arrays and clean messy real-world datasets with speed.', estimatedMinutes: 80 },
      { id: 't-8-2', title: 'Linear Algebra & Probability for Machine Learning', completed: false, description: 'Matrix decompositions, dot products, eigenvalues, and Gaussian distributions.', estimatedMinutes: 90 },
      { id: 't-8-3', title: 'Classical ML: Gradient Descent, Regularization & Decision Trees', completed: false, description: 'Derive cost functions, L1/L2 penalty terms, and ensemble random forests.', estimatedMinutes: 100 },
      { id: 't-8-4', title: 'Deep Learning & Neural Network Backpropagation in PyTorch', completed: false, description: 'Build feedforward and convolutional networks with custom PyTorch training loops.', estimatedMinutes: 120 },
      { id: 't-8-5', title: 'ML System Design: Recommendation & Ranking Pipelines', completed: false, description: 'Architect feature stores, model latency optimization, and offline/online evaluation metrics.', estimatedMinutes: 90 },
    ],
  },
];

// Returns clean uncompleted roadmaps (0% progress)
export const getCleanRoadmaps = (): RoadmapModule[] => {
  return ROADMAP_MODULES.map((m) => ({
    ...m,
    isCompleted: false,
    topics: m.topics.map((t) => ({ ...t, completed: false })),
  }));
};

// Returns student-isolated initial roadmaps (clean 0% state)
export const getStudentRoadmaps = (_studentId?: string): RoadmapModule[] => {
  return getCleanRoadmaps();
};
