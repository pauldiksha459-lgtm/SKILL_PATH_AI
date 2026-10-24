import { TopicLearningDetail } from '../../types/resources';

export const CYBERSECURITY_TOPICS: TopicLearningDetail[] = [
  // 1. Web Application Security & OWASP Top 10
  {
    id: 'cyber-owasp-top10',
    skillId: 'cyber-web-sec',
    skillName: 'Web Security & Penetration Testing',
    topicTitle: 'Web Application Security & OWASP Top 10 Vulnerabilities',
    skillCategory: 'Application Security',
    careerPaths: ['Cybersecurity Analyst or Engineer', 'Software Engineer', 'Full-Stack Developer'],
    overview: 'The Open Web Application Security Project (OWASP) Top 10 represents the consensus standard for the most critical web application vulnerabilities. Master Broken Access Control, Injection (SQLi/Command), Cryptographic Failures, Insecure Design, Security Misconfiguration, and Cross-Site Scripting (XSS).',
    learningObjectives: [
      'Understand the root causes and exploit vectors of SQL Injection and XSS.',
      'Implement defense-in-depth sanitization, parameterized queries, and Content Security Policy (CSP).',
      'Prevent Broken Object-Level Authorization (BOLA/IDOR) in REST APIs.',
      'Configure secure HTTP headers (HSTS, X-Content-Type-Options, SameSite cookies).',
    ],
    prerequisites: ['HTTP protocol fundamentals, HTML/JavaScript, and basic SQL.'],
    estimatedMinutes: 65,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'OWASP Top 10 is an authoritative industry awareness document outlining the most critical security risks facing web applications, updated by international cybersecurity experts.',
      whyItMatters: 'Web security is non-negotiable in financial, healthcare, and enterprise software. Product tech companies test OWASP awareness rigorously for backend, full-stack, and security engineering roles.',
      coreConcepts: [
        {
          heading: 'SQL Injection (SQLi) & Defense via Parameterized Queries',
          explanation: 'SQLi happens when untrusted user input is directly concatenated into a dynamic SQL query string, allowing attackers to manipulate query logic.',
          codeExample: {
            language: 'python',
            code: `# VULNERABLE CODE: NEVER DO THIS
# user_input = "' OR '1'='1"
# cursor.execute(f"SELECT * FROM users WHERE email = '{user_input}'")

# SECURE CODE: Use parameterized queries (Prepared Statements)
import psycopg2

def authenticate_user(cursor, email: str):
    query = "SELECT id, password_hash FROM users WHERE email = %s;"
    cursor.execute(query, (email,)) # Database driver separates code from data
    return cursor.fetchone()`,
            output: 'Secure execution: Parameter treated strictly as literal data, preventing command injection.',
            explanation: 'The database compiles the SQL statement structure beforehand. The parameter %s is injected strictly as literal data without execution rights.',
          },
        },
        {
          heading: 'Cross-Site Scripting (XSS) & Content Security Policy',
          explanation: 'XSS occurs when malicious JavaScript is reflected or stored in a web application and executed within the victim browser session. Mitigated through contextual HTML escaping and strict Content-Security-Policy headers.',
        },
      ],
      stepByStepGuide: [
        '1. Never trust user input: validate type, length, and format on the server.',
        '2. Use prepared statements or ORMs for all database queries.',
        '3. Encode dynamic output before rendering it into HTML, JavaScript, or CSS contexts.',
        '4. Store sensitive session tokens in HttpOnly, Secure, SameSite=Strict cookies.',
        '5. Implement Principle of Least Privilege for database users and API access tokens.',
      ],
      commonMistakes: [
        {
          mistake: 'Relying exclusively on client-side frontend validation for security checks.',
          correction: 'Attackers bypass browser JavaScript using tools like Postman or cURL. Every security validation must be enforced on the backend server.',
        },
        {
          mistake: 'Storing plaintext or MD5/SHA1 hashed passwords.',
          correction: 'Always hash passwords using salted, computationally expensive key derivation algorithms like bcrypt or Argon2id.',
        },
      ],
      practicalApplications: [
        'Securing enterprise student portals and payment checkout flows.',
        'Hardening API gateways and preventing automated credential stuffing attacks.',
      ],
      summary: 'Treat all input as untrusted. Enforce parameterization, contextual encoding, and least privilege access.',
      revisionChecklist: [
        'Can you demonstrate how prepared statements prevent SQL Injection?',
        'What is the difference between Stored XSS and Reflected XSS?',
        'Why does HttpOnly flag on cookies prevent XSS session hijacking?',
      ],
    },
    resources: [
      {
        id: 'res-cyber-1',
        skillId: 'cyber-web-sec',
        topicId: 'cyber-owasp-top10',
        title: 'OWASP Official: Top 10 Web Application Security Risks',
        type: 'Documentation',
        description: 'The definitive standard reference for web application vulnerability descriptions, prevention strategies, and attack examples.',
        url: 'https://owasp.org/www-project-top-ten/',
        difficulty: 'Intermediate',
        language: 'Security',
        estimatedDuration: '45 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'OWASP.org',
      },
      {
        id: 'res-cyber-2',
        skillId: 'cyber-web-sec',
        topicId: 'cyber-owasp-top10',
        title: 'PortSwigger Web Security Academy: SQL Injection & XSS Labs',
        type: 'Practice',
        description: 'Free interactive security labs by the creators of Burp Suite for ethical vulnerability testing.',
        url: 'https://portswigger.net/web-security',
        difficulty: 'Intermediate',
        language: 'Security',
        estimatedDuration: '1 hour',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'PortSwigger',
      },
    ],
    quiz: [
      {
        id: 'q-cyber-1',
        question: 'Why are parameterized queries (prepared statements) the primary defense against SQL Injection?',
        options: [
          'They encrypt the entire database table',
          'They precompile the SQL statement so user input is treated strictly as literal data, never executable syntax',
          'They delete special characters from input strings',
          'They compress SQL queries for speed',
        ],
        correctAnswerIndex: 1,
        explanation: 'Prepared statements separate the query structure from the user data. The database engine never interprets parameterized data as executable SQL commands.',
      },
      {
        id: 'q-cyber-2',
        question: 'What cookie flag prevents malicious JavaScript executed via XSS from reading session cookies?',
        options: ['Secure', 'SameSite=Lax', 'HttpOnly', 'Domain'],
        correctAnswerIndex: 2,
        explanation: 'The HttpOnly flag forbids client-side scripts from accessing `document.cookie`, mitigating cookie theft via Cross-Site Scripting.',
      },
    ],
    projects: [
      {
        id: 'proj-cyber-1',
        title: 'Vulnerability Audit & Defense Implementation',
        difficulty: 'Intermediate',
        description: 'Audit a sample vulnerable web service, identify SQL Injection and XSS flaws, and refactor the code to use parameterized queries and CSP headers.',
        starterSteps: [
          'Inspect intentionally flawed route handlers.',
          'Demonstrate SQLi bypass on login form.',
          'Refactor to parameterized queries with bcrypt password verification.',
          'Verify vulnerability is eliminated.',
        ],
        deliverable: 'A security audit report and hardened backend source code.',
        techStack: ['Python', 'SQLAlchemy / Parameterized SQL', 'Bcrypt'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-cyber-1',
        question: 'What is Insecure Direct Object Reference (IDOR / BOLA) and how do you prevent it?',
        companyTags: ['Amazon', 'Microsoft', 'Cisco'],
        difficulty: 'Medium',
        answerSummary: 'IDOR occurs when an application exposes a reference to an internal object (e.g. `GET /documents/452`) without verifying the requesting user possesses authorization to access that object.',
        deepDive: 'Attackers simply alter the integer ID in the URL to view records belonging to other users. Prevention requires verifying object-level authorization on the server: `SELECT * FROM documents WHERE id = :doc_id AND user_id = :authenticated_user_id`. Alternatively, use randomized UUIDv4 identifiers combined with robust Role-Based Access Control (RBAC).',
      },
    ],
    nextTopicId: 'cloud-docker-containers',
    prevTopicId: 'fs-rest-apis',
  },
];
