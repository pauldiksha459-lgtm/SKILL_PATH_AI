import { AptitudeQuestion } from '../types';

export const APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    id: 'apt-1',
    category: 'Quantitative',
    question:
      'A and B together can complete a software sprint in 12 days. B alone can finish the same sprint in 30 days. In how many days can A alone complete the sprint?',
    options: ['18 days', '20 days', '22 days', '24 days'],
    correctOptionIndex: 1,
    explanation:
      'Total work = LCM(12, 30) = 60 units. Rate(A + B) = 60 / 12 = 5 units/day. Rate(B) = 60 / 30 = 2 units/day. Therefore Rate(A) = 5 - 2 = 3 units/day. Days for A = 60 / 3 = 20 days.',
    companyTags: ['tcs', 'infosys', 'wipro', 'accenture'],
  },
  {
    id: 'apt-2',
    category: 'Quantitative',
    question:
      'A train running at 72 km/h crosses a platform of length 250 meters in 26 seconds. What is the length of the train?',
    options: ['230 meters', '270 meters', '250 meters', '280 meters'],
    correctOptionIndex: 1,
    explanation:
      'Speed in m/s = 72 * (5/18) = 20 m/s. Total distance covered in 26 seconds = 20 * 26 = 520 meters. Total distance = Length of train + Length of platform. Length of train = 520 - 250 = 270 meters.',
    companyTags: ['tcs', 'wipro', 'infosys'],
  },
  {
    id: 'apt-3',
    category: 'Quantitative',
    question:
      'In an engineering batch of 120 students, the ratio of boys to girls is 5:3. How many more girls must join to make the ratio 1:1?',
    options: ['20', '25', '30', '35'],
    correctOptionIndex: 2,
    explanation:
      'Sum of ratio terms = 5 + 3 = 8. Number of boys = (5/8) * 120 = 75. Number of girls = (3/8) * 120 = 45. To make the ratio 1:1, girls must equal boys (75). Additional girls required = 75 - 45 = 30.',
    companyTags: ['tcs', 'accenture', 'wipro'],
  },
  {
    id: 'apt-4',
    category: 'Logical Reasoning',
    question:
      'Statements:\n1. All algorithms are programs.\n2. Some programs are scripts.\nConclusions:\nI. Some algorithms are scripts.\nII. Some programs are algorithms.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both I and II follow', 'Neither follows'],
    correctOptionIndex: 1,
    explanation:
      'From statement 1: Since "All algorithms are programs", the converse "Some programs are algorithms" is definitely valid (Conclusion II). However, the intersection between algorithms and scripts is not guaranteed (Conclusion I may or may not be true). Thus only II follows.',
    companyTags: ['tcs', 'infosys', 'accenture'],
  },
  {
    id: 'apt-5',
    category: 'Logical Reasoning',
    question:
      'Pointing to a photograph of an engineer, Rahul says, "He is the son of the only son of my grandfather." How is Rahul related to the person in the photograph?',
    options: ['Father', 'Brother', 'Cousin', 'Uncle'],
    correctOptionIndex: 1,
    explanation:
      '"Only son of my grandfather" = Rahul’s father. "Son of Rahul’s father" = Rahul himself or Rahul’s brother. Since the options do not include "himself", the person is Rahul’s brother.',
    companyTags: ['wipro', 'tcs', 'accenture'],
  },
  {
    id: 'apt-6',
    category: 'Technical MCQ',
    question:
      'Consider the following C code snippet:\nint a = 5, b = 2;\nprintf("%d", a >> b << b);\nWhat is printed on standard output?',
    options: ['5', '4', '2', '0'],
    correctOptionIndex: 1,
    explanation:
      'Binary of 5 is 0101. Right shift by 2: 5 >> 2 = 1 (binary 0001). Left shift by 2: 1 << 2 = 4 (binary 0100). Thus output is 4.',
    companyTags: ['infosys', 'accenture', 'tcs'],
  },
  {
    id: 'apt-7',
    category: 'Verbal Ability',
    question:
      'Identify the option with the correct grammatical construction:\nThe engineering team, along with the product managers, _______ present at the deployment review.',
    options: ['was', 'were', 'are', 'have been'],
    correctOptionIndex: 0,
    explanation:
      'When the subject is modified by phrases like "along with", "together with", or "as well as", the verb agrees with the true subject ("The engineering team" - singular collective noun). Therefore, "was" is grammatically correct.',
    companyTags: ['tcs', 'wipro', 'accenture'],
  },
  {
    id: 'apt-8',
    category: 'Technical MCQ',
    question:
      'Which SQL clause is executed first in the logical query processing order?',
    options: ['SELECT', 'WHERE', 'FROM', 'GROUP BY'],
    correctOptionIndex: 2,
    explanation:
      'In standard SQL processing order: 1. FROM (and JOINs) 2. WHERE 3. GROUP BY 4. HAVING 5. SELECT 6. DISTINCT 7. ORDER BY 8. LIMIT.',
    companyTags: ['tcs', 'infosys', 'microsoft'],
  },
];
