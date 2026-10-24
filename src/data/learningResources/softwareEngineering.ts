import { TopicLearningDetail } from '../../types/resources';

export const SOFTWARE_ENGINEERING_TOPICS: TopicLearningDetail[] = [
  // 1. Asymptotic Analysis & Big-O Notation (Maps to Roadmap t-1-1)
  {
    id: 't-1-1',
    skillId: 'dsa-foundations',
    skillName: 'Data Structures & Algorithms Core',
    topicTitle: 'Asymptotic Analysis & Big-O Notation',
    skillCategory: 'Algorithmic Complexity & Foundations',
    careerPaths: ['Software Engineer', 'Full-Stack Developer', 'AI/ML Engineer'],
    overview: 'Asymptotic analysis evaluates how algorithm runtime and memory scale as input size N grows toward infinity. Master Big-O (upper bound), Big-Omega (lower bound), Big-Theta (tight bound), logarithmic division, nested iterations, and recursion tree Master Theorem.',
    learningObjectives: [
      'Characterize computational complexity using formal Big-O definitions.',
      'Differentiate worst-case O(N), amortized O(1), and average-case performance.',
      'Identify time complexity classes: O(1), O(log N), O(N), O(N log N), O(N^2), O(2^N).',
      'Calculate auxiliary space complexity distinguishing stack frames from heap allocations.',
    ],
    prerequisites: ['Basic algebraic equations and loops.'],
    estimatedMinutes: 60,
    difficulty: 'Beginner',
    studyNotes: {
      definition: 'Big-O notation is a mathematical representation describing the upper bound limiting behavior of an algorithm execution time or memory space as the input size N approaches infinity.',
      whyItMatters: 'Top product companies (Google, Microsoft, Amazon) reject solutions that solve problems with inefficient complexity (e.g. O(N^2) instead of O(N)). Knowing complexity allows you to predict whether code will crash when processing millions of users.',
      coreConcepts: [
        {
          heading: 'Complexity Growth Rates Ranked',
          explanation: 'Algorithms are categorized into distinct performance tiers:\n• O(1) Constant: Array index lookup, hash map get (amortized)\n• O(log N) Logarithmic: Binary search, balanced BST search\n• O(N) Linear: Single array pass, counting elements\n• O(N log N) Linearithmic: Merge Sort, Heap Sort, Quick Sort (average)\n• O(N^2) Quadratic: Nested loops, Bubble/Insertion sort\n• O(2^N) Exponential: Naive recursion Fibonacci\n• O(N!) Factorial: Generating all permutations',
          codeExample: {
            language: 'python',
            code: `def binary_search(arr: list[int], target: int) -> int:
    """O(log N) time, O(1) auxiliary space."""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2 # Avoid integer overflow
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Array of 1,000,000 sorted elements takes at most ~20 iterations!
nums = list(range(1_000_000))
idx = binary_search(nums, 789_123)
print(f"Found element at index: {idx}")`,
            output: 'Found element at index: 789123',
            explanation: 'Halving the search space on each iteration yields log2(1,000,000) ≈ 20 operations instead of 1,000,000 linear steps.',
          },
        },
        {
          heading: 'Amortized Analysis (e.g., Dynamic Array Resizing)',
          explanation: 'Amortized analysis averages the cost of occasional expensive operations over many cheap operations. When a Python list or C++ std::vector exceeds capacity, it allocates 2x space and copies all elements (O(N)), but this happens so infrequently that the amortized cost per append is O(1).',
        },
      ],
      stepByStepGuide: [
        '1. Discard constant multipliers: O(2N + 5) becomes O(N).',
        '2. Discard non-dominant terms: O(N^2 + N) becomes O(N^2).',
        '3. For loops in sequence: add complexities O(A + B).',
        '4. For nested loops: multiply loop iterations O(A * B).',
        '5. For recursive functions: use Master Theorem T(n) = aT(n/b) + f(n) or draw the recursion tree.',
      ],
      commonMistakes: [
        {
          mistake: 'Assuming `in` list membership check is O(1).',
          correction: '`target in my_list` scans elements linearly in O(N). Use a `set` or `dict` for genuine O(1) average lookup.',
        },
        {
          mistake: 'Ignoring call-stack memory in recursive functions.',
          correction: 'A recursive depth of N consumes O(N) auxiliary space on the call stack even without allocating new data arrays.',
        },
      ],
      practicalApplications: [
        'Deciding between in-memory caching vs database roundtrips.',
        'Selecting indexing strategies for high-frequency database tables.',
        'Optimizing cloud server costs by avoiding exponential algorithms.',
      ],
      summary: 'Big-O measures scalability as N grows. Focus on dominant terms and auxiliary memory limits.',
      revisionChecklist: [
        'Can you differentiate O(1), O(log N), O(N), and O(N log N)?',
        'What is amortized O(1) and why does array appending qualify?',
        'How does recursion depth contribute to auxiliary space complexity?',
      ],
      complexityAnalysis: {
        timeComplexity: 'Theoretical framework applies across all algorithm classes.',
        spaceComplexity: 'Measures auxiliary working memory excluding the input buffer.',
        notes: 'Always clarify if space complexity includes the return structure or strictly auxiliary memory.',
      },
    },
    resources: [
      {
        id: 'res-se-bigo-1',
        skillId: 'dsa-foundations',
        topicId: 't-1-1',
        title: 'MIT OpenCourseWare: Introduction to Algorithms - Asymptotic Analysis',
        type: 'Course',
        description: 'Lecture 1 of MIT 6.006 covering algorithmic thinking, peak finding, and asymptotic bounds.',
        url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '50 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'MIT OCW',
      },
      {
        id: 'res-se-bigo-2',
        skillId: 'dsa-foundations',
        topicId: 't-1-1',
        title: 'freeCodeCamp: Big O Notation Full Tutorial for Beginners',
        type: 'Video',
        description: 'Visual breakdown of Big O runtime charts, code analogies, and interview complexity analysis.',
        url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '30 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
      {
        id: 'res-se-bigo-3',
        skillId: 'dsa-foundations',
        topicId: 't-1-1',
        title: 'Big-O Algorithm Complexity Cheat Sheet',
        type: 'Cheat Sheet',
        description: 'Visual comparison table of all primary data structures and search/sorting algorithm complexities.',
        url: 'https://www.bigocheatsheet.com/',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '15 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'BigOCheatSheet.com',
      },
    ],
    quiz: [
      {
        id: 'q-bigo-1',
        question: 'What is the time complexity of searching for a value in an unsorted array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctAnswerIndex: 2,
        explanation: 'In an unsorted array, the target element could be at any index, requiring a linear scan of up to N elements: O(N).',
      },
      {
        id: 'q-bigo-2',
        question: 'What is the time complexity of inserting an element into a hash map on average?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctAnswerIndex: 0,
        explanation: 'With a well-distributed hash function, bucket lookup and insertion execute in O(1) average time.',
      },
    ],
    projects: [
      {
        id: 'proj-bigo-1',
        title: 'Algorithm Performance Benchmarking Tool',
        difficulty: 'Beginner',
        description: 'Write a script that times linear search vs binary search across input arrays from N=100 to N=1,000,000 and plots growth curves.',
        starterSteps: [
          'Generate sorted integer arrays of exponential sizes [10^2, 10^3, 10^4, 10^5, 10^6].',
          'Use time.perf_counter() to benchmark 100 random lookups.',
          'Verify execution time plateaus at ~O(log N) for binary search.',
        ],
        deliverable: 'A benchmark report with comparative timing metrics.',
        techStack: ['Python', 'Time Module', 'Matplotlib'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-bigo-1',
        question: 'What is the difference between Amortized O(1) and Strict O(1) time complexity?',
        companyTags: ['Amazon', 'Google', 'Microsoft'],
        difficulty: 'Medium',
        answerSummary: 'Strict O(1) guarantees every single operation takes constant time. Amortized O(1) means a sequence of M operations takes O(M) time, even if occasional individual operations take O(N).',
        deepDive: 'A classic example is dynamic array resizing (std::vector or Python list). Appending is usually O(1) (write to next empty memory slot). When the internal array fills up, it allocates double capacity and copies N elements in O(N). However, this doubling occurs only at powers of 2. Summing 1 + 2 + 4 + ... + N across all resizes equals 2N operations across N inserts, averaging 2 operations per append: O(1) amortized.',
      },
    ],
    nextTopicId: 't-1-2',
    prevTopicId: 'ai-python-functions',
  },

  // 2. Two Pointers & Sliding Window (Maps to Roadmap t-1-2)
  {
    id: 't-1-2',
    skillId: 'dsa-arrays-strings',
    skillName: 'Arrays, Strings & Two Pointers',
    topicTitle: 'Two Pointers & Sliding Window Techniques',
    skillCategory: 'Linear Data Structures & Pointers',
    careerPaths: ['Software Engineer', 'Full-Stack Developer', 'AI/ML Engineer'],
    overview: 'The two-pointer technique uses two directional indices to traverse arrays or strings in linear O(N) time, converting brute-force O(N^2) nested loops into elegant linear scans. Master opposite-end pointers, fast/slow runners, and dynamic window expansion/contraction.',
    learningObjectives: [
      'Solve pair-sum problems in sorted arrays in O(N) time and O(1) space.',
      'Maintain continuous subarray state using sliding window technique.',
      'Handle variable-length sliding window boundaries using while loops.',
      'Identify when sorting the array enables two-pointer optimization.',
    ],
    prerequisites: ['Arrays, Strings, and Time Complexity basics.'],
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'The two-pointer approach maintains two index markers that traverse an iterable in tandem—either moving inward from opposite ends or moving in the same direction at varying rates (sliding window).',
      whyItMatters: 'It is one of the most frequently asked algorithmic patterns in technical screening rounds at Google, Amazon, and Microsoft for array and substring problems.',
      coreConcepts: [
        {
          heading: 'Opposite-End Two Pointers (e.g., Container With Most Water)',
          explanation: 'When searching for optimal boundaries, start pointers at left=0 and right=n-1 and move the limiting pointer inward.',
          codeExample: {
            language: 'python',
            code: `def max_area(height: list[int]) -> int:
    """Find two vertical lines that hold the most water. O(N) time, O(1) space."""
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)

        # Move the shorter wall inward
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water

print("Max Water Capacity:", max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))`,
            output: 'Max Water Capacity: 49',
            explanation: 'The two pointers scan the array from both ends, achieving O(N) runtime without testing all O(N^2) pairs.',
          },
        },
        {
          heading: 'Dynamic Sliding Window (e.g., Longest Substring Without Repeating Characters)',
          explanation: 'Expand the right pointer to include characters, and advance the left pointer when a duplicate violation occurs.',
          codeExample: {
            language: 'python',
            code: `def length_of_longest_substring(s: str) -> int:
    """O(N) time, O(min(N, alphabet)) space."""
    char_index_map = {}
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        if char in char_index_map and char_index_map[char] >= left:
            left = char_index_map[char] + 1
        char_index_map[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len

print("Longest unique substring length:", length_of_longest_substring("abcabcbb"))`,
            output: 'Longest unique substring length: 3',
            explanation: 'The window stretches and jumps the left pointer forward in a single O(N) pass.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Determine whether problem involves continuous subarrays (sliding window) or pair combinations (two pointers).',
        '2. Check if sorting is allowed and if it reveals greedy monotonicity.',
        '3. Initialize pointer indices (`left = 0`, `right = len(arr) - 1` or `right = 0`).',
        '4. Advance pointers based on invariant conditions and update running result.',
      ],
      commonMistakes: [
        {
          mistake: 'Incrementing both left and right pointers in the same iteration without checking boundary overlap.',
          correction: 'Always ensure `left < right` for opposite-end pointers.',
        },
        {
          mistake: 'Using nested loops inside a sliding window that reset the left pointer to 0.',
          correction: 'The left pointer must only move forward, guaranteeing O(2N) = O(N) aggregate pointer movements.',
        },
      ],
      practicalApplications: [
        'Network bandwidth streaming rate-limiting (sliding window counters).',
        'Audio signal packet buffer analysis.',
        'Text tokenization and keyword search windowing.',
      ],
      summary: 'Two pointers and sliding windows convert quadratic O(N^2) searches into linear O(N) streaming operations.',
      revisionChecklist: [
        'Can you write Two Sum II (sorted array) in under 5 minutes?',
        'Why does moving the shorter boundary in Container With Most Water guarantee optimal choices?',
      ],
      complexityAnalysis: {
        timeComplexity: 'O(N) since each pointer advances at most N times.',
        spaceComplexity: 'O(1) auxiliary memory for index pointers.',
        notes: 'Sorting beforehand adds O(N log N) time if the array is unsorted.',
      },
    },
    resources: [
      {
        id: 'res-se-2ptr-1',
        skillId: 'dsa-arrays-strings',
        topicId: 't-1-2',
        title: 'LeetCode Problem 11: Container With Most Water',
        type: 'Practice',
        description: 'Classic medium two-pointer problem with official test suite and discussion solutions.',
        url: 'https://leetcode.com/problems/container-with-most-water/',
        difficulty: 'Intermediate',
        language: 'Any',
        estimatedDuration: '30 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'LeetCode',
      },
      {
        id: 'res-se-2ptr-2',
        skillId: 'dsa-arrays-strings',
        topicId: 't-1-2',
        title: 'NeetCode: Sliding Window Technique Visualized',
        type: 'Video',
        description: 'Comprehensive animated explanation of sliding window patterns and edge-case handling.',
        url: 'https://www.youtube.com/watch?v=wiGpQwVHdE0',
        difficulty: 'Intermediate',
        language: 'English',
        estimatedDuration: '20 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'NeetCode',
      },
    ],
    quiz: [
      {
        id: 'q-2ptr-1',
        question: 'Why does Two Sum II execute in O(N) time on a sorted array using two pointers?',
        options: [
          'Because binary search is executed on every element',
          'Because each iteration eliminates at least one element from consideration based on monotonicity',
          'Because it uses dynamic programming table memoization',
          'Because it hashes all values into a set',
        ],
        correctAnswerIndex: 1,
        explanation: 'If `arr[left] + arr[right] > target`, any pair with `arr[right]` will be too large, so `right` can be decremented safely, eliminating an entire row of candidates in O(1).',
      },
    ],
    projects: [
      {
        id: 'proj-2ptr-1',
        title: 'Network Packet Sliding Window Rate Limiter',
        difficulty: 'Intermediate',
        description: 'Implement a sliding window counter that allows a maximum of 100 requests per 60-second window using timestamp deques.',
        starterSteps: [
          'Store incoming timestamps in a sliding window deque.',
          'Evict timestamps older than current_time - 60 seconds.',
          'Reject requests if current window size >= 100.',
        ],
        deliverable: 'A rate limiter class with thread-safe O(1) amortized check_request() method.',
        techStack: ['Python', 'Collections Deque'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-2ptr-1',
        question: 'Solve 3Sum in O(N^2) time and explain how you eliminate duplicate triplets.',
        companyTags: ['Meta', 'Amazon', 'Apple'],
        difficulty: 'Medium',
        answerSummary: 'Sort the array, iterate with an outer loop `i`, and run two pointers `left` and `right` for the remaining elements.',
        deepDive: 'Sorting takes O(N log N). For each element `nums[i]`, if `nums[i] == nums[i-1]`, skip to avoid duplicates. Then run two pointers with `target = -nums[i]`. When a valid triplet is found, advance both pointers while skipping identical adjacent values (`while nums[left] == nums[left+1]: left += 1`). Total time is O(N^2) with O(1) auxiliary space.',
      },
    ],
    nextTopicId: 't-1-3',
    prevTopicId: 't-1-1',
  },

  // 3. Relational Database Schema & Normalization (Maps to Roadmap t-4-1)
  {
    id: 't-4-1',
    skillId: 'core-dbms-sql',
    skillName: 'DBMS & Advanced SQL',
    topicTitle: 'Relational Database Schema & Normalization (1NF to BCNF)',
    skillCategory: 'Database Systems & Data Modeling',
    careerPaths: ['Software Engineer', 'Full-Stack Developer', 'Data Scientist'],
    overview: 'Database normalization structures relational tables to reduce data redundancy and eliminate update, insertion, and deletion anomalies. Master Functional Dependencies, First Normal Form (1NF), Second Normal Form (2NF), Third Normal Form (3NF), and Boyce-Codd Normal Form (BCNF).',
    learningObjectives: [
      'Identify insertion, update, and deletion anomalies in denormalized schemas.',
      'Derive candidate keys using functional dependencies and attribute closure.',
      'Normalize relational schemas step-by-step from 1NF up to 3NF/BCNF.',
      'Understand trade-offs between normalized OLTP schemas and denormalized OLAP data warehouses.',
    ],
    prerequisites: ['Basic SQL SELECT queries and relational table concepts.'],
    estimatedMinutes: 75,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'Database normalization is a systematic approach of decomposing tables to eliminate data redundancy and undesirable anomalies through the evaluation of functional dependencies.',
      whyItMatters: 'Tested extensively in technical interviews at TCS Digital, Infosys, Microsoft, and Oracle. Poor database design leads to data corruption, inconsistent billing, and costly disk space waste.',
      coreConcepts: [
        {
          heading: 'Normal Forms Summary & Rules',
          explanation: '• 1NF (Atomic Attributes): Each column must contain atomic (indivisible) values. No multi-valued attributes or repeating groups.\n• 2NF (No Partial Dependencies): Table must be in 1NF, and every non-prime attribute must be fully functionally dependent on the whole candidate key (no dependency on a subset of a composite key).\n• 3NF (No Transitive Dependencies): Table must be in 2NF, and for every X -> Y, either X is a superkey or Y is a prime attribute (no A -> B -> C where non-key determines non-key).\n• BCNF (Strict 3NF): For every functional dependency X -> Y, X must be a superkey.',
          codeExample: {
            language: 'sql',
            code: `-- 3NF Normalized Schema for Campus Placement System
CREATE TABLE Companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    tier VARCHAR(20) DEFAULT 'Standard'
);

CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    college_email VARCHAR(120) UNIQUE NOT NULL,
    cgpa NUMERIC(3, 2) CHECK (cgpa >= 0.0 AND cgpa <= 10.0)
);

CREATE TABLE PlacementApplications (
    application_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Students(student_id) ON DELETE CASCADE,
    company_id INT REFERENCES Companies(company_id) ON DELETE CASCADE,
    application_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(30) DEFAULT 'Applied',
    UNIQUE (student_id, company_id) -- Prevents duplicate submissions
);`,
            output: 'CREATE TABLE (Schema 3NF compliant with referential integrity)',
            explanation: 'The schema splits entity concerns into separate relations joined by foreign keys, eliminating repetitive company names in student records.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Check 1NF: Split comma-separated values into separate rows or related tables.',
        '2. Check 2NF: If primary key is composite, ensure non-key columns depend on both columns, not just one.',
        '3. Check 3NF: If non-key column A determines non-key column B, move (A, B) into a new table.',
        '4. Add foreign key constraints to preserve referential integrity.',
      ],
      commonMistakes: [
        {
          mistake: 'Storing multiple comma-separated skills in a single `skills` text column.',
          correction: 'Violates 1NF. Create a separate `Skills` table and an association `StudentSkills` junction table.',
        },
        {
          mistake: 'Assuming 3NF is always superior to denormalization in read-heavy analytics.',
          correction: 'In OLAP reporting and search engines, controlled denormalization avoids costly multi-table joins.',
        },
      ],
      practicalApplications: [
        'Fintech transactions and banking ledgers requiring zero anomalies.',
        'E-commerce order fulfillment relational databases.',
        'Campus placement candidate tracking systems.',
      ],
      summary: 'Normalization guarantees data integrity by eliminating redundant copies of facts.',
      revisionChecklist: [
        'What is a partial dependency and which normal form eliminates it?',
        'What is a transitive dependency and which normal form eliminates it?',
        'When is BCNF strictly necessary over 3NF?',
      ],
      complexityAnalysis: {
        timeComplexity: 'Increases query join complexity O(K joins) while reducing write update locks to O(1).',
        spaceComplexity: 'Drastically reduces disk storage by eliminating duplicate string entries.',
        notes: 'Index foreign keys to maintain fast JOIN performance.',
      },
    },
    resources: [
      {
        id: 'res-se-norm-1',
        skillId: 'core-dbms-sql',
        topicId: 't-4-1',
        title: 'PostgreSQL Official Documentation: Database Normalization Principles',
        type: 'Documentation',
        description: 'Comprehensive guide on relational data modeling, constraints, and normalization.',
        url: 'https://www.postgresql.org/docs/current/ddl.html',
        difficulty: 'Intermediate',
        language: 'SQL',
        estimatedDuration: '45 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'PostgreSQL.org',
      },
      {
        id: 'res-se-norm-2',
        skillId: 'core-dbms-sql',
        topicId: 't-4-1',
        title: 'freeCodeCamp: Database Design and Normalization Tutorial',
        type: 'Course',
        description: 'Step-by-step breakdown of 1NF, 2NF, 3NF, and BCNF with real business table examples.',
        url: 'https://www.freecodecamp.org/news/database-normalization-1nf-2nf-3nf-table-examples/',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '35 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
    ],
    quiz: [
      {
        id: 'q-norm-1',
        question: 'Which Normal Form specifically requires eliminating Partial Dependencies on composite primary keys?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswerIndex: 1,
        explanation: '2NF requires the relation to be in 1NF and all non-key attributes to be fully functionally dependent on the entire candidate key (no partial dependencies).',
      },
      {
        id: 'q-norm-2',
        question: 'In a relation where A -> B and B -> C, the dependency A -> C is an example of what?',
        options: ['Partial Dependency', 'Transitive Dependency', 'Multi-valued Dependency', 'Trivial Dependency'],
        correctAnswerIndex: 1,
        explanation: 'Transitive dependency occurs when an indirect relationship causes functional dependency: A -> B and B -> C implies A -> C.',
      },
    ],
    projects: [
      {
        id: 'proj-norm-1',
        title: 'E-Commerce Schema Decomposition & Migration',
        difficulty: 'Intermediate',
        description: 'Take a denormalized single-table spreadsheet with Orders, Customers, Products, and Shipping and decompose it into 3NF relational PostgreSQL tables with primary/foreign keys.',
        starterSteps: [
          'Identify functional dependencies and composite candidate keys.',
          'Decompose into Customers, Products, Orders, and OrderItems.',
          'Write PostgreSQL DDL script with foreign key constraints.',
        ],
        deliverable: 'A clean PostgreSQL schema file with sample INSERT statements verifying referential integrity.',
        techStack: ['PostgreSQL', 'SQL DDL'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-norm-1',
        question: 'What are the three main types of anomalies in an unnormalized database table?',
        companyTags: ['Microsoft', 'TCS', 'Infosys'],
        difficulty: 'Easy',
        answerSummary: 'Insertion anomaly, Update anomaly, and Deletion anomaly.',
        deepDive: '1. Insertion Anomaly: Unable to record an entity fact without fabricating another unrelated entity (e.g. cannot add a new course without assigning an enrolled student). 2. Update Anomaly: If customer address is duplicated across 50 order rows, changing it in one place leaves other rows inconsistent. 3. Deletion Anomaly: Deleting a student order unintentionally wipes out the only record of the course existing in the database.',
      },
    ],
    nextTopicId: 't-4-2',
    prevTopicId: 't-1-4',
  },
];
