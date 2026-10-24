import { TopicLearningDetail } from '../../types/resources';

export const AI_ML_TOPICS: TopicLearningDetail[] = [
  // 1. Python Functions (Requested specifically in prompt as primary example!)
  {
    id: 'ai-python-functions',
    skillId: 'ai-python-core',
    skillName: 'Python Core Programming',
    topicTitle: 'Python Functions, Lambdas & Scope',
    skillCategory: 'Programming Fundamentals',
    careerPaths: ['AI/ML Engineer', 'Data Scientist', 'Software Engineer', 'Full-Stack Developer'],
    overview: 'Functions are the fundamental building blocks of reusable code in Python. Master parameter passing, variable-length arguments (*args, **kwargs), return values, first-class functions, anonymous lambda expressions, and variable scoping rules (LEGB).',
    learningObjectives: [
      'Define functions with positional, default, and keyword-only parameters.',
      'Handle dynamic inputs with *args (tuples) and **kwargs (dictionaries).',
      'Understand Python pass-by-object-reference semantics and avoid mutable default argument pitfalls.',
      'Apply anonymous lambda functions within map(), filter(), and sorted().',
      'Understand the LEGB (Local, Enclosing, Global, Built-in) scope resolution hierarchy.',
    ],
    prerequisites: ['Python syntax, variables, and control flow structures.'],
    estimatedMinutes: 50,
    difficulty: 'Beginner',
    studyNotes: {
      definition: 'A function in Python is an organized, reusable block of code created using the `def` keyword that takes inputs (arguments), performs computation, and produces an output using the `return` statement.',
      whyItMatters: 'In AI and Machine Learning, virtually every model pipeline, loss calculation, data transformation, and training step is modularized into pure or vectorized functions. Writing clean, modular functions is essential for building scalable data preprocessing pipelines in NumPy and PyTorch.',
      coreConcepts: [
        {
          heading: 'Function Definition, Arguments & Return Values',
          explanation: 'Python functions support standard positional arguments, optional keyword arguments with defaults, and arbitrary argument lists.',
          codeExample: {
            language: 'python',
            code: `def calculate_learning_rate(base_lr: float, epoch: int, decay_rate: float = 0.05) -> float:
    """Computes exponential learning rate decay."""
    return base_lr * (1.0 / (1.0 + decay_rate * epoch))

# Positional and keyword invocation
lr_epoch_0 = calculate_learning_rate(0.01, 0)
lr_epoch_10 = calculate_learning_rate(0.01, 10, decay_rate=0.1)

print(f"Epoch 0 LR: {lr_epoch_0:.4f}")
print(f"Epoch 10 LR: {lr_epoch_10:.4f}")`,
            output: 'Epoch 0 LR: 0.0100\nEpoch 10 LR: 0.0050',
            explanation: 'The function provides a default parameter for decay_rate while allowing dynamic override during model training iterations.',
          },
        },
        {
          heading: 'Arbitrary Arguments: *args and **kwargs',
          explanation: '*args collects extra positional arguments into a tuple, while **kwargs collects extra named keyword arguments into a dictionary. This is heavily used in PyTorch layers and scikit-learn model constructors.',
          codeExample: {
            language: 'python',
            code: `def build_layer_config(layer_name: str, *units: int, **hyperparams):
    print(f"Configuring {layer_name}")
    print(f"Dimensions: {units}")
    print(f"Hyperparameters: {hyperparams}")

build_layer_config("DenseBlock", 128, 64, 32, activation="relu", dropout=0.2)`,
            output: "Configuring DenseBlock\nDimensions: (128, 64, 32)\nHyperparameters: {'activation': 'relu', 'dropout': 0.2}",
            explanation: 'The function flexibly ingests variable layer dimensionalities and an arbitrary dictionary of hyperparameters.',
          },
        },
        {
          heading: 'Lambda Functions & Higher-Order Functions',
          explanation: 'Lambdas are concise single-expression anonymous functions created with the syntax `lambda arguments: expression`. They are ideal for quick key extractors and mathematical transforms.',
          codeExample: {
            language: 'python',
            code: `loss_records = [
    {"epoch": 1, "val_loss": 0.45},
    {"epoch": 2, "val_loss": 0.32},
    {"epoch": 3, "val_loss": 0.38}
]

# Sort records by validation loss using lambda key
best_epochs = sorted(loss_records, key=lambda x: x["val_loss"])
print(f"Best epoch: {best_epochs[0]['epoch']} with loss {best_epochs[0]['val_loss']}")`,
            output: 'Best epoch: 2 with loss 0.32',
            explanation: 'The lambda function extracts the val_loss key inline without requiring a dedicated named helper function.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Define the function header with clear type annotations (`def func(param: type) -> return_type:`)',
        '2. Add a descriptive triple-quoted docstring specifying behavior, parameters, and returns.',
        '3. Validate parameter invariants at the top of the function.',
        '4. Implement the core transformation logic without side effects if possible (pure functions).',
        '5. Explicitly return the output object (or None if purely procedural).',
      ],
      commonMistakes: [
        {
          mistake: 'Using mutable objects (e.g., list or dict) as default parameter values: `def append_to(item, target=[])`.',
          correction: 'Default parameter values are evaluated once at function definition time, not at invocation. Use `None` as the default and initialize inside: `if target is None: target = []`.',
        },
        {
          mistake: 'Assuming variables modified inside a function affect the outer global scope without the `global` keyword.',
          correction: 'Python treats variables assigned inside a function as local unless explicitly declared `global` or `nonlocal`. Return modified values instead of mutating globals.',
        },
      ],
      practicalApplications: [
        'Custom loss functions and metric callbacks in PyTorch / TensorFlow.',
        'Feature mapping pipelines in Pandas using `.apply(lambda x: ...)`',
        'Decorator wrappers for execution timing, authentication verification, and caching.',
      ],
      summary: 'Functions encapsulate reusable behavior. Emphasize type hinting, immutable default arguments, modular decomposition, and clean scope separation.',
      revisionChecklist: [
        'Can you explain the difference between *args (tuple) and **kwargs (dict)?',
        'Why should you never use `def func(data=[])` in production Python code?',
        'How does Python resolve variable names using the LEGB scope order?',
        'When should you use a lambda versus a standard `def` statement?',
      ],
      complexityAnalysis: {
        timeComplexity: 'O(1) function call invocation overhead in CPython.',
        spaceComplexity: 'O(1) stack frame allocation per non-recursive call.',
        notes: 'Excessive recursive calls without tail-call optimization exceed sys.getrecursionlimit() (default 1000).',
      },
    },
    resources: [
      {
        id: 'res-py-func-1',
        skillId: 'ai-python-core',
        topicId: 'ai-python-functions',
        title: 'Official Python Documentation: Defining Functions',
        type: 'Documentation',
        description: 'Complete official CPython reference on defining functions, default argument values, and keyword arguments.',
        url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
        difficulty: 'Beginner',
        language: 'Python',
        estimatedDuration: '25 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'Python.org',
      },
      {
        id: 'res-py-func-2',
        skillId: 'ai-python-core',
        topicId: 'ai-python-functions',
        title: 'freeCodeCamp: Python for Beginners - Full Course (Functions Section)',
        type: 'Course',
        description: 'Comprehensive guided walkthrough of functions, parameter passing, and scope in modern Python 3.',
        url: 'https://www.freecodecamp.org/news/python-functions-define-and-call-them/',
        difficulty: 'Beginner',
        language: 'Python',
        estimatedDuration: '40 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
      {
        id: 'res-py-func-3',
        skillId: 'ai-python-core',
        topicId: 'ai-python-functions',
        title: 'LeetCode Practice: Filter and Map Data Transforms',
        type: 'Practice',
        description: 'Solve real algorithmic problems applying higher-order functions and functional decomposition.',
        url: 'https://leetcode.com/problemset/all/?topicSlugs=python',
        difficulty: 'Intermediate',
        language: 'Python',
        estimatedDuration: '30 mins',
        verificationStatus: 'HISTORICALLY_REPORTED',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'LeetCode',
      },
    ],
    quiz: [
      {
        id: 'q-py-func-1',
        question: 'What is the output of calling a function with a default mutable argument twice?\n\ndef add_item(val, items=[]):\n    items.append(val)\n    return items\n\nprint(add_item(1))\nprint(add_item(2))',
        options: [
          '[1] then [2]',
          '[1] then [1, 2]',
          'TypeError: items is immutable',
          'SyntaxError: default argument not allowed',
        ],
        correctAnswerIndex: 1,
        explanation: 'Default arguments in Python are evaluated once at function definition time. Both calls share the exact same list instance in memory, resulting in [1, 2] on the second call.',
      },
      {
        id: 'q-py-func-2',
        question: 'What does *args receive when passed to a Python function?',
        options: [
          'A dictionary of keyword arguments',
          'A list of positional arguments',
          'A tuple of positional arguments',
          'A generator object',
        ],
        correctAnswerIndex: 2,
        explanation: '*args packs variable positional arguments into an immutable tuple.',
      },
      {
        id: 'q-py-func-3',
        question: 'Which order does Python follow when resolving variable names?',
        options: [
          'Global -> Local -> Enclosing -> Built-in',
          'Local -> Enclosing -> Global -> Built-in (LEGB)',
          'Local -> Global -> Enclosing -> Built-in',
          'Built-in -> Global -> Enclosing -> Local',
        ],
        correctAnswerIndex: 1,
        explanation: 'Python checks Local scope first, followed by Enclosing (parent function) scope, then Global scope, and finally Built-in namespace.',
      },
    ],
    projects: [
      {
        id: 'proj-py-func-1',
        title: 'Custom Metric Evaluator & Pipeline Dispatcher',
        difficulty: 'Beginner',
        description: 'Build a modular evaluation utility that accepts prediction arrays and dynamic metric functions (*kwargs) to calculate Accuracy, Precision, Recall, and F1-score.',
        starterSteps: [
          'Create high-level dispatcher function `evaluate_predictions(y_true, y_pred, **metric_flags)`',
          'Implement individual pure functions for precision, recall, and accuracy.',
          'Use lambda functions for custom threshold penalties.',
          'Format and return an analytical metrics summary dictionary.',
        ],
        deliverable: 'A reusable single-file Python module with full type hints and docstrings ready for ML pipeline integration.',
        techStack: ['Python 3.11', 'Type Annotations', 'Math Module'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-py-func-1',
        question: 'How does parameter passing work in Python? Is it pass-by-value or pass-by-reference?',
        companyTags: ['Google', 'Microsoft', 'Amazon'],
        difficulty: 'Medium',
        answerSummary: 'Python uses "Pass-by-assignment" (or pass-by-object-reference).',
        deepDive: 'When passing an argument to a function, the function receives a copy of the reference to the object. If the object is mutable (like a list or dictionary) and modified in-place, the caller sees the changes. If the object is immutable (like an int or string), rebinding the variable name inside the function creates a new local reference and leaves the caller object untouched.',
      },
      {
        id: 'iq-py-func-2',
        question: 'What is a closure in Python and how do functions maintain state without global variables?',
        companyTags: ['Amazon', 'Adobe', 'Atlassian'],
        difficulty: 'Hard',
        answerSummary: 'A closure is an inner function that remembers and retains access to variables in its enclosing scope even after the outer function has finished executing.',
        deepDive: 'Closures are created when a nested function references a variable in an outer enclosing function, and the outer function returns the nested function. Python stores these bound variables in the `__closure__` attribute of the function object as cell objects. This pattern powers function decorators in Python frameworks.',
      },
    ],
    nextTopicId: 't-8-1',
    prevTopicId: 't-1-1',
  },

  // 2. NumPy Vectorization & Array Computations (Maps to Roadmap t-8-1)
  {
    id: 't-8-1',
    skillId: 'aiml-python-data',
    skillName: 'Python, NumPy & Pandas Data Manipulation',
    topicTitle: 'NumPy Vectorization & Pandas Data Pipelines',
    skillCategory: 'Data Engineering & Linear Computing',
    careerPaths: ['AI/ML Engineer', 'Data Scientist', 'Data Analyst'],
    overview: 'NumPy provides high-performance N-dimensional array objects and vectorized operations implemented in compiled C. Master multidimensional slicing, broadcasting rules, matrix dot products, and high-throughput Pandas DataFrame transformations.',
    learningObjectives: [
      'Eliminate slow Python for-loops by writing vectorized NumPy operations.',
      'Understand NumPy memory layout (strides, contiguous C vs Fortran order).',
      'Apply broadcasting rules across tensors of differing shapes.',
      'Handle missing values, grouped aggregations, and join operations in Pandas.',
    ],
    prerequisites: ['Python Functions & Collections (Lists, Dicts).'],
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    studyNotes: {
      definition: 'NumPy vectorization expresses batch operations on entire arrays without explicit iterative Python loops, delegating computation to compiled SIMD (Single Instruction Multiple Data) hardware instructions.',
      whyItMatters: 'Standard Python list iteration is 50x-100x slower due to dynamic type dispatching and boxing/unboxing overhead. NumPy vectorization enables instant mathematical operations on millions of sample records in milliseconds.',
      coreConcepts: [
        {
          heading: 'Vectorized Operations vs Pure Python Loops',
          explanation: 'NumPy applies arithmetic operations element-wise across contiguous C-memory buffers.',
          codeExample: {
            language: 'python',
            code: `import numpy as np
import time

# Create 1,000,000 random floating point numbers
data = np.random.randn(1_000_000)

# Vectorized computation: 100x faster than list comprehension
start = time.perf_counter()
squared_vectorized = data ** 2 + 2 * data + 1
elapsed_np = time.perf_counter() - start

print(f"NumPy vectorized 1M elements: {elapsed_np * 1000:.2f} ms")
print(f"First 3 results: {squared_vectorized[:3]}")`,
            output: 'NumPy vectorized 1M elements: 2.15 ms\nFirst 3 results: [1.892 0.451 3.120]',
            explanation: 'The vectorized expression computes polynomial features across 1 million items in approximately 2 milliseconds.',
          },
        },
        {
          heading: 'NumPy Broadcasting Rules',
          explanation: 'Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations. Two dimensions are compatible when: 1. They are equal, or 2. One of them is 1.',
          codeExample: {
            language: 'python',
            code: `import numpy as np

# Feature matrix: shape (4 samples, 3 features)
X = np.array([
    [10.0, 20.0, 30.0],
    [15.0, 25.0, 35.0],
    [12.0, 22.0, 32.0],
    [18.0, 28.0, 38.0]
])

# Mean feature vector: shape (3,) -> broadcasted across rows
means = np.mean(X, axis=0)
X_centered = X - means

print("Feature Means:", means)
print("Centered X shape:", X_centered.shape)`,
            output: 'Feature Means: [13.75 23.75 33.75]\nCentered X shape: (4, 3)',
            explanation: 'The 1D mean vector of shape (3,) is automatically broadcast across all 4 rows without memory duplication.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Inspect array shape and data types using `.shape` and `.dtype`.',
        '2. Use boolean masking for filtering rather than if-else branches.',
        '3. Leverage `np.where()` for conditional vector assignments.',
        '4. Ensure memory views are cloned with `.copy()` when mutating subsets.',
      ],
      commonMistakes: [
        {
          mistake: 'Using Python for-loops to iterate over NumPy array elements.',
          correction: 'Apply universal functions (`np.exp`, `np.log`, `np.dot`) directly on arrays.',
        },
        {
          mistake: 'Modifying an array slice and unintentionally altering the original parent array.',
          correction: 'NumPy slices create views, not copies. Use `slice_copy = arr[:5].copy()` if independent mutation is needed.',
        },
      ],
      practicalApplications: [
        'Feature scaling and z-score normalization in preprocessing pipelines.',
        'Image matrix manipulation (RGB pixel channel extraction and filtering).',
        'Calculating distance metrics (Euclidean, Cosine similarity) in recommendation engines.',
      ],
      summary: 'NumPy forms the mathematical backbone of scientific Python. Master array manipulation and broadcasting for lightning-fast computing.',
      revisionChecklist: [
        'Can you state the two conditions required for NumPy broadcasting compatibility?',
        'What is the difference between a NumPy view and a NumPy copy?',
        'How do you compute a matrix multiplication using `@` or `np.matmul()`?',
      ],
      complexityAnalysis: {
        timeComplexity: 'O(N) for element-wise operations with SIMD acceleration.',
        spaceComplexity: 'O(1) auxiliary memory for views; O(N) when allocating output tensors.',
        notes: 'Broadcasting avoids allocating duplicate memory buffers for aligned dimensions.',
      },
    },
    resources: [
      {
        id: 'res-np-1',
        skillId: 'aiml-python-data',
        topicId: 't-8-1',
        title: 'Official NumPy User Guide & Broadcasting Mechanics',
        type: 'Documentation',
        description: 'Comprehensive documentation on dimensional broadcasting rules, ndarray internals, and linear algebra.',
        url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html',
        difficulty: 'Intermediate',
        language: 'Python',
        estimatedDuration: '30 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'NumPy.org',
      },
      {
        id: 'res-np-2',
        skillId: 'aiml-python-data',
        topicId: 't-8-1',
        title: 'Official Pandas User Guide: 10 Minutes to Pandas',
        type: 'Documentation',
        description: 'Essential quickstart tutorial covering DataFrames, Series, selection, groupings, and missing data.',
        url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
        difficulty: 'Beginner',
        language: 'Python',
        estimatedDuration: '30 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'Pandas.pydata.org',
      },
      {
        id: 'res-np-3',
        skillId: 'aiml-python-data',
        topicId: 't-8-1',
        title: 'freeCodeCamp: Data Analysis with Python Certification',
        type: 'Course',
        description: 'Hands-on free course covering NumPy, Pandas, Matplotlib, and real-world analytical projects.',
        url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
        difficulty: 'Intermediate',
        language: 'Python',
        estimatedDuration: '2 hours',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'freeCodeCamp',
      },
    ],
    quiz: [
      {
        id: 'q-np-1',
        question: 'Which of the following array shapes can be broadcast together according to NumPy rules?',
        options: [
          'Shape (5, 3) and Shape (5, 2)',
          'Shape (4, 1, 8) and Shape (1, 6, 8)',
          'Shape (3, 4) and Shape (4, 3)',
          'Shape (2, 3) and Shape (2, 4)',
        ],
        correctAnswerIndex: 1,
        explanation: 'Comparing trailing dimensions from right to left: 8 matches 8, 1 broadcasts with 6, and 4 broadcasts with 1. Resulting shape is (4, 6, 8).',
      },
      {
        id: 'q-np-2',
        question: 'What is the key difference between modifying an array slice in NumPy versus a standard Python list slice?',
        options: [
          'NumPy slices create views that modify the original array; list slices create new independent copies.',
          'List slices create views; NumPy slices create copies.',
          'Neither alters the original array.',
          'NumPy slices always raise an exception if assigned.',
        ],
        correctAnswerIndex: 0,
        explanation: 'NumPy slices create memory views over existing buffers to optimize speed and RAM. Modifying a slice directly mutates the parent array.',
      },
    ],
    projects: [
      {
        id: 'proj-np-1',
        title: 'Vectorized Image Augmentor & Filter Engine',
        difficulty: 'Intermediate',
        description: 'Build a NumPy image processing pipeline that normalizes pixel channels, applies Gaussian noise, and rotates 3D RGB tensors using vectorized matrix transformations.',
        starterSteps: [
          'Load a sample 3D image array of shape (Height, Width, Channels).',
          'Vectorize min-max normalization to scale pixels to [0, 1].',
          'Implement a 3x3 convolution kernel using slicing and broadcasting.',
          'Measure execution benchmark comparing vectorized vs nested Python loop performance.',
        ],
        deliverable: 'A clean script demonstrating zero Python for-loops for matrix transformations.',
        techStack: ['NumPy', 'Matplotlib'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-np-1',
        question: 'Why is NumPy so much faster than vanilla Python for array operations?',
        companyTags: ['NVIDIA', 'Google', 'Meta'],
        difficulty: 'Medium',
        answerSummary: 'NumPy stores data in contiguous blocks of memory with a single uniform data type and executes vectorized C loops.',
        deepDive: 'Standard Python lists are arrays of pointers pointing to scattered Python object wrappers in memory, requiring pointer dereferencing and type checking on every iteration. NumPy stores primitive C types in contiguous memory, enabling CPU cache locality and SIMD vector registers to process multiple numbers in a single clock cycle.',
      },
    ],
    nextTopicId: 't-8-2',
    prevTopicId: 'ai-python-functions',
  },

  // 3. Deep Learning & Neural Networks in PyTorch (Maps to Roadmap t-8-4)
  {
    id: 't-8-4',
    skillId: 'aiml-deep-learning',
    skillName: 'Deep Learning & PyTorch',
    topicTitle: 'Deep Learning & Neural Network Backpropagation in PyTorch',
    skillCategory: 'Deep Learning & Neural Architectures',
    careerPaths: ['AI/ML Engineer', 'Data Scientist'],
    overview: 'Neural networks learn complex non-linear representations through forward propagation, loss calculation, automatic differentiation (autograd), and optimizer parameter updates via gradient descent. Master PyTorch nn.Module, Dataset/DataLoader, and training loops.',
    learningObjectives: [
      'Build custom PyTorch models subclassing nn.Module.',
      'Understand reverse-mode automatic differentiation (autograd) and computational graphs.',
      'Implement a standard PyTorch training loop with zero_grad(), backward(), and step().',
      'Select appropriate activation functions (ReLU, GELU) and loss functions (CrossEntropyLoss, MSELoss).',
    ],
    prerequisites: ['NumPy Vectorization, Matrix Algebra & Calculus (Partial Derivatives).'],
    estimatedMinutes: 75,
    difficulty: 'Advanced',
    studyNotes: {
      definition: 'Deep learning uses multi-layer neural networks to learn representations from raw data. Backpropagation computes the gradient of the loss function with respect to model weights using the mathematical chain rule.',
      whyItMatters: 'PyTorch is the undisputed standard in modern AI research, powering computer vision, natural language processing, and modern Large Language Models.',
      coreConcepts: [
        {
          heading: 'PyTorch Tensors, Autograd & Computational Graph',
          explanation: 'Tensors track operations to build a dynamic Directed Acyclic Graph (DAG) for automatic gradient computation.',
          codeExample: {
            language: 'python',
            code: `import torch

# Create a tensor with gradient tracking enabled
x = torch.tensor([2.0, 3.0], requires_grad=True)

# Forward pass: y = x^2 + 3x + 1
y = x**2 + 3*x + 1
loss = y.sum()

# Backward pass (computes dy/dx = 2x + 3)
loss.backward()

print("Inputs:", x.data)
print("Computed Gradients (2x + 3):", x.grad)`,
            output: 'Inputs: tensor([2., 3.])\nComputed Gradients (2x + 3): tensor([7., 9.])',
            explanation: 'For x=2, dy/dx = 2(2)+3 = 7. For x=3, dy/dx = 2(3)+3 = 9. Autograd evaluates exact analytical gradients automatically.',
          },
        },
        {
          heading: 'Building a Neural Network with torch.nn.Module',
          explanation: 'Models inherit from nn.Module and override the __init__ constructor and forward() pass method.',
          codeExample: {
            language: 'python',
            code: `import torch
import torch.nn as nn

class BinaryClassifier(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, 1),
            nn.Sigmoid()
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

model = BinaryClassifier(input_dim=10, hidden_dim=32)
sample_input = torch.randn(4, 10) # 4 samples, 10 features
predictions = model(sample_input)
print("Output shape:", predictions.shape)`,
            output: 'Output shape: torch.Size([4, 1])',
            explanation: 'The Sequential container bundles linear projections, non-linear activation, and dropout regularization into a clean forward pipeline.',
          },
        },
      ],
      stepByStepGuide: [
        '1. Instantiate model, loss criterion (`nn.BCEWithLogitsLoss`), and optimizer (`torch.optim.AdamW`).',
        '2. Zero gradients with `optimizer.zero_grad()` to prevent gradient accumulation across batches.',
        '3. Compute predictions: `outputs = model(inputs)`.',
        '4. Compute loss: `loss = criterion(outputs, targets)`.',
        '5. Backpropagate gradients: `loss.backward()`.',
        '6. Update parameters: `optimizer.step()`.',
      ],
      commonMistakes: [
        {
          mistake: 'Forgetting `optimizer.zero_grad()` in the training loop.',
          correction: 'PyTorch accumulates gradients by default. Without zeroing, gradients from previous batches sum together and destabilize training.',
        },
        {
          mistake: 'Leaving model in `.train()` mode during evaluation or testing.',
          correction: 'Always wrap validation in `model.eval()` and `with torch.no_grad():` to disable dropout and gradient tracking.',
        },
      ],
      practicalApplications: [
        'Fine-tuning pre-trained transformer architectures for text classification.',
        'Convolutional neural networks for automated defect detection in manufacturing.',
        'Autoencoder latent representation learning for anomaly detection.',
      ],
      summary: 'PyTorch combines dynamic eager execution with GPU acceleration. Master autograd, nn.Module, and clean training loops.',
      revisionChecklist: [
        'Why must you call optimizer.zero_grad() before loss.backward()?',
        'What is the purpose of `with torch.no_grad():` during model evaluation?',
        'How does ReLU prevent vanishing gradients compared to sigmoid in deep networks?',
      ],
      complexityAnalysis: {
        timeComplexity: 'O(W) per layer where W is the weight matrix dimensions; accelerated on CUDA cores.',
        spaceComplexity: 'O(Activation memory) stored for backpropagation backward graph.',
        notes: 'Enabling mixed precision (torch.cuda.amp.autocast) reduces memory footprint by 50%.',
      },
    },
    resources: [
      {
        id: 'res-pt-1',
        skillId: 'aiml-deep-learning',
        topicId: 't-8-4',
        title: 'Official PyTorch Documentation: Deep Learning with PyTorch 60 Minute Blitz',
        type: 'Documentation',
        description: 'The definitive official beginner tutorial covering Tensors, Autograd, Neural Networks, and training classifiers.',
        url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html',
        difficulty: 'Intermediate',
        language: 'Python',
        estimatedDuration: '60 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: 'PyTorch.org',
      },
      {
        id: 'res-pt-2',
        skillId: 'aiml-deep-learning',
        topicId: 't-8-4',
        title: '3Blue1Brown: What is Backpropagation Really Doing?',
        type: 'Video',
        description: 'World-renowned visual calculus intuition for gradient descent and backpropagation in multi-layer neural networks.',
        url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U',
        difficulty: 'Beginner',
        language: 'English',
        estimatedDuration: '14 mins',
        verificationStatus: 'VERIFIED_OFFICIAL',
        lastVerifiedDate: '2026-10-24',
        isExternal: true,
        platformName: '3Blue1Brown',
      },
    ],
    quiz: [
      {
        id: 'q-pt-1',
        question: 'What happens if you do not call optimizer.zero_grad() before loss.backward() in a PyTorch training loop?',
        options: [
          'PyTorch throws a RuntimeError: gradient buffer overflow',
          'The gradients will accumulate (sum together) across successive batches',
          'The weights will not be updated at all',
          'The loss automatically doubles',
        ],
        correctAnswerIndex: 1,
        explanation: 'PyTorch accumulates gradients by design (useful for gradient accumulation over small batches). Failing to call zero_grad() causes previous batch gradients to contaminate the current update.',
      },
      {
        id: 'q-pt-2',
        question: 'Why should model.eval() and torch.no_grad() be used during validation?',
        options: [
          'To disable dropout/batchnorm updates and reduce memory by disabling gradient graph tracking',
          'To increase the learning rate',
          'To save model checkpoints to disk',
          'To force FP16 precision',
        ],
        correctAnswerIndex: 0,
        explanation: 'model.eval() disables dropout and fixes batchnorm running stats. torch.no_grad() prevents the computational graph from being stored in memory, speeding up inference and saving VRAM.',
      },
    ],
    projects: [
      {
        id: 'proj-pt-1',
        title: 'End-to-End PyTorch MNIST / CIFAR Classifier',
        difficulty: 'Advanced',
        description: 'Implement a multi-layer neural network with Dropout, AdamW optimizer, and validation early stopping with test set evaluation.',
        starterSteps: [
          'Load dataset with torchvision and create DataLoader with batch_size=64.',
          'Define PyTorch nn.Module with 2 hidden linear layers and ReLU activation.',
          'Execute 10-epoch training loop logging loss and validation accuracy.',
          'Plot training vs validation loss curves.',
        ],
        deliverable: 'A trained PyTorch model achieving 95%+ accuracy on test samples.',
        techStack: ['PyTorch', 'Torchvision', 'Matplotlib'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-pt-1',
        question: 'Explain the Vanishing Gradient problem and how modern architectures overcome it.',
        companyTags: ['Google', 'Meta', 'NVIDIA'],
        difficulty: 'Hard',
        answerSummary: 'In deep networks using sigmoid/tanh activations, gradients diminish exponentially as they backpropagate through layers, preventing early layers from updating.',
        deepDive: 'Because the derivative of sigmoid saturates at a maximum of 0.25, multiplying multiple small gradients through the chain rule pushes gradients toward zero. Solutions include using ReLU activations (derivative is 1 for positive inputs), Residual Connections (ResNets allow gradients to flow directly via identity skip connections), and Layer/Batch Normalization.',
      },
    ],
    nextTopicId: 't-8-5',
    prevTopicId: 't-8-1',
  },
];
