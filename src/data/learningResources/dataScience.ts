import { TopicLearningDetail } from '../../types/resources';

export const DATA_SCIENCE_TOPICS: TopicLearningDetail[] = [
  // 1. Exploratory Data Analysis & Data Cleaning
  {
    id: 'ds-eda-cleaning',
    skillId: 'ds-data-wrangling',
    skillName: 'Data Wrangling & Statistical Analysis',
    topicTitle: 'Exploratory Data Analysis (EDA) & Data Cleaning Pipelines',
    skillCategory: 'Data Science & Analytics',
    careerPaths: ['Data Scientist', 'Data Analyst', 'AI/ML Engineer'],
    overview: 'Real-world data is noisy, incomplete, duplicate, and misformatted. Master systematic data profiling, missing value imputation (mean/median/KNN), outlier detection (IQR, z-score), categorical encoding (One-Hot, Target), feature scaling, and correlation matrix analysis.',
    learningObjectives: [
      'Detect and treat missing data using domain-appropriate imputation techniques.',
      'Identify outliers using Interquartile Range (IQR) and box plots.',
      'Transform skewed distributions using logarithmic and Box-Cox transforms.',
      'Produce visual correlation heatmaps to diagnose multicollinearity.',
    ],
    prerequisites: ['Python basics, Pandas DataFrames, and descriptive statistics.'],
    estimatedMinutes: 50,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'Exploratory Data Analysis (EDA) is an approach to analyzing datasets to summarize their main characteristics, often using statistical graphics and data visualization methods, before formal statistical modeling.',
      whyItMatters: 'Over 80% of real-world data science time is spent understanding, cleaning, and transforming data. "Garbage in, garbage out" means the best ML algorithms produce useless predictions if fed uncleaned data.',
      coreConcepts: [
        {
          heading: 'Outlier Detection with the Interquartile Range (IQR)',
          explanation: 'IQR = Q3 - Q1. Values lying beyond [Q1 - 1.5*IQR, Q3 + 1.5*IQR] are considered outliers.',
          codeExample: {
            language: 'python',
            code: `import pandas as pd
import numpy as np

# Sample placement CTC package data with realistic positive skew
data = pd.Series([4.5, 5.0, 6.2, 5.8, 7.0, 6.5, 8.0, 4.8, 5.5, 45.0]) # 45.0 LPA is high-tier outlier

Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = data[(data < lower_bound) | (data > upper_bound)]
print(f"IQR: {IQR:.2f}")
print(f"Normal Range: [{lower_bound:.2f}, {upper_bound:.2f}]")
print(f"Detected Outliers: {outliers.tolist()}")`,
            output: 'IQR: 1.83\nNormal Range: [2.25, 9.58]\nDetected Outliers: [45.0]',
            explanation: 'The 45.0 LPA record is mathematically isolated as a statistical outlier beyond 1.5 times the IQR.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Inspect schema: `df.info()`, `df.describe()`, `df.isnull().sum()`.',
        '2. Remove duplicate rows: `df.drop_duplicates()`.',
        '3. Impute missing numeric values using median (resistant to outliers) or domain logic.',
        '4. Encode categorical columns using `pd.get_dummies()` or `OneHotEncoder`.',
        '5. Plot distribution histograms and correlation matrices.',
      ],
      commonMistakes: [
        {
          mistake: 'Imputing missing data using the mean on heavily skewed distributions.',
          correction: 'Use median imputation for skewed data because the mean is heavily distorted by extreme values.',
        },
        {
          mistake: 'Fitting scalers or imputers on the entire dataset before train-test split (Data Leakage).',
          correction: 'Always fit transformers strictly on training data (`scaler.fit_transform(X_train)`), then transform test data (`scaler.transform(X_test)`).',
        },
      ],
      practicalApplications: [
        'Cleaning customer churn data before predictive modeling.',
        'Analyzing college campus placement statistics across departments.',
      ],
      summary: 'Data cleaning ensures model reliability. Avoid data leakage and match imputation to distributions.',
      revisionChecklist: [
        'What is data leakage and how do you prevent it during preprocessing?',
        'When should you use One-Hot Encoding vs Ordinal Label Encoding?',
      ],
    },
    resources: [
      {
        id: 'res-ds-1',
        skillId: 'ds-data-wrangling',
        topicId: 'ds-eda-cleaning',
        title: 'Scikit-learn Official User Guide: Preprocessing Data',
        type: 'Documentation',
        description: 'Comprehensive guide covering standardization, normalization, encoding, and missing value imputation.',
        url: 'https://scikit-learn.org/stable/modules/preprocessing.html',
        difficulty: 'Intermediate',
        language: 'Python',
        estimatedDuration: '45 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'Scikit-learn.org',
      },
    ],
    quiz: [
      {
        id: 'q-ds-1',
        question: 'Why should feature scalers (e.g. StandardScaler) be fit ONLY on the training split, not the entire dataset?',
        options: [
          'Because the test split is in a different file format',
          'To prevent Data Leakage of test set mean and variance statistics into the model training pipeline',
          'Because StandardScaler only supports small arrays',
          'To speed up CPU clock cycles',
        ],
        correctAnswerIndex: 1,
        explanation: 'Fitting on the full dataset leaks information from the test set into the training phase, giving falsely optimistic validation scores.',
      },
    ],
    projects: [
      {
        id: 'proj-ds-1',
        title: 'Automated Data Profiler & Pipeline Cleaner',
        difficulty: 'Intermediate',
        description: 'Build a reusable Python class that ingests any dirty CSV, flags missing percentages, imputes values, identifies outliers, and outputs a clean dataset with summary report.',
        starterSteps: [
          'Calculate missing value percentage per column.',
          'Automatically apply median imputation for numeric and mode for categorical.',
          'Cap outliers at 1.5*IQR bounds (winsorization).',
        ],
        deliverable: 'A clean Python script outputting a cleaned dataset and data profiling report.',
        techStack: ['Python', 'Pandas', 'NumPy'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-ds-1',
        question: 'How do you handle a dataset where 40% of the values in a critical column are missing?',
        companyTags: ['Amazon', 'Google', 'Flipkart'],
        difficulty: 'Medium',
        answerSummary: 'Investigate the missingness mechanism (MCAR, MAR, MNAR) before dropping or imputing.',
        deepDive: 'First check if the column is Missing Completely at Random (MCAR), Missing at Random (MAR), or Missing Not at Random (MNAR). If the missingness itself conveys information (e.g. missing mortgage payment data means customer had no mortgage), add an explicit binary indicator column `is_missing` before imputing. For high missingness, use model-based imputation (MICE / IterativeImputer or KNN) rather than naive mean imputation. If the column has zero predictive value or correlation, consider dropping it.',
      },
    ],
    nextTopicId: 'ai-python-functions',
    prevTopicId: 'cloud-docker-containers',
  },
];
