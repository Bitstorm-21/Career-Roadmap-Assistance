import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  Sparkles, 
  BookOpen, 
  Check, 
  HelpCircle,
  Filter,
  ShieldAlert,
  Cpu,
  Cloud,
  Terminal,
  Lock,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

// ============================================================================
// QUESTION BANK (15 Questions per Role with Difficulty & Topic Tags)
// ============================================================================
export const ROLE_ASSESSMENTS = {
  fresher: {
    id: 'fresher',
    title: 'Fresher Software Engineer',
    subtitle: 'Core CS Foundations: OOP, Data Structures & Algorithms, OS, CN, DBMS',
    icon: Terminal,
    description: 'Comprehensive 15-question assessment designed for fresh computer science graduates covering software engineering fundamentals.',
    topics: ['OOP', 'Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'DBMS'],
    questions: [
      // OOPs (3 questions: Easy, Med, Hard)
      {
        id: 1,
        topic: 'OOP',
        difficulty: 'EASY',
        question: 'Which Object-Oriented Programming principle focuses on hiding internal implementation details and exposing only the essential interface to the user?',
        options: [
          'Encapsulation / Abstraction',
          'Inheritance',
          'Method Overloading',
          'Dynamic Dispatch'
        ],
        correctAnswer: 0,
        explanation: 'Abstraction and Encapsulation work hand-in-hand to hide complex background details and protect data integrity while exposing a clean public API.'
      },
      {
        id: 2,
        topic: 'OOP',
        difficulty: 'MEDIUM',
        question: 'In Object-Oriented languages like Java and C++, what mechanism enables runtime polymorphism when a subclass provides its own specific implementation of a superclass method?',
        options: [
          'Method Overloading',
          'Method Overriding',
          'Static Binding',
          'Data Hiding'
        ],
        correctAnswer: 1,
        explanation: 'Method Overriding occurs when a subclass defines a method matching the name, return type, and signature of a method in its parent class, resolved dynamically at runtime.'
      },
      {
        id: 3,
        topic: 'OOP',
        difficulty: 'HARD',
        question: 'Which SOLID design principle is violated when an existing class requires modification each time a new payment processor or customer tier is added to the system?',
        options: [
          'Single Responsibility Principle only',
          'Open/Closed Principle (OCP)',
          'Liskov Substitution Principle (LSP)',
          'Interface Segregation Principle (ISP)'
        ],
        correctAnswer: 1,
        explanation: 'The Open/Closed Principle dictates that software entities should be open for extension (e.g. via strategy or polymorphism) but closed for modification.'
      },

      // DSA (3 questions: Easy, Med, Hard)
      {
        id: 4,
        topic: 'Data Structures',
        difficulty: 'EASY',
        question: 'What is the average time complexity to search for an element in a balanced Binary Search Tree (BST) with N nodes?',
        options: [
          'O(1)',
          'O(N)',
          'O(log N)',
          'O(N log N)'
        ],
        correctAnswer: 2,
        explanation: 'In a balanced BST (like AVL or Red-Black), each comparison cuts the remaining search space in half, resulting in O(log N) average search time.'
      },
      {
        id: 5,
        topic: 'Algorithms',
        difficulty: 'MEDIUM',
        question: 'Which data structure is primarily utilized to explore adjacent nodes level by level in Breadth-First Search (BFS)?',
        options: [
          'Stack (LIFO)',
          'Queue (FIFO)',
          'Binary Heap',
          'Disjoint Set (Union-Find)'
        ],
        correctAnswer: 1,
        explanation: 'BFS uses a Queue (First-In, First-Out) to process nodes in the exact order they were discovered level-by-level.'
      },
      {
        id: 6,
        topic: 'Algorithms',
        difficulty: 'HARD',
        question: 'In the classic 0/1 Knapsack problem with N items and maximum weight capacity W, what is the optimal Dynamic Programming time complexity?',
        options: [
          'O(2^N)',
          'O(N * W)',
          'O(N^2)',
          'O(W log N)'
        ],
        correctAnswer: 1,
        explanation: 'Standard bottom-up 0/1 Knapsack constructs a 2D table of size (N+1) x (W+1), requiring O(N * W) pseudo-polynomial time and space.'
      },

      // OS (3 questions: Easy, Med, Hard)
      {
        id: 7,
        topic: 'Operating Systems',
        difficulty: 'EASY',
        question: 'Which component of an Operating System is responsible for allocating the CPU to processes that are in the ready queue?',
        options: [
          'CPU Scheduler / Dispatcher',
          'Memory Manager',
          'Device Driver',
          'Virtual File System'
        ],
        correctAnswer: 0,
        explanation: 'The short-term scheduler selects which ready process should run, and the dispatcher handles the actual context switch to give CPU control to that process.'
      },
      {
        id: 8,
        topic: 'Operating Systems',
        difficulty: 'MEDIUM',
        question: 'Which of the following is NOT one of the four necessary Coffman conditions required for a Deadlock to occur?',
        options: [
          'Mutual Exclusion',
          'Hold and Wait',
          'Circular Wait',
          'Preemption Allowed'
        ],
        correctAnswer: 3,
        explanation: 'The Coffman condition is "No Preemption" (resources cannot be forcibly taken away). Allowing preemption actively prevents deadlock.'
      },
      {
        id: 9,
        topic: 'Operating Systems',
        difficulty: 'HARD',
        question: 'What is Belady’s Anomaly in Operating System virtual memory management?',
        options: [
          'Increasing physical page frames leads to more page faults in FIFO replacement',
          'A process consumes all swap memory causing kernel panic',
          'LRU page replacement fails on sequential arrays',
          'TLB cache hit rate drops to zero during context switching'
        ],
        correctAnswer: 0,
        explanation: 'Belady\'s Anomaly demonstrates that for certain page reference strings, allocating more physical page frames increases the total number of page faults under the FIFO algorithm.'
      },

      // CN (3 questions: Easy, Med, Hard)
      {
        id: 10,
        topic: 'Computer Networks',
        difficulty: 'EASY',
        question: 'Which transport layer protocol provides reliable, connection-oriented, ordered byte-stream delivery with congestion control?',
        options: [
          'UDP (User Datagram Protocol)',
          'TCP (Transmission Control Protocol)',
          'ICMP (Internet Control Message Protocol)',
          'ARP (Address Resolution Protocol)'
        ],
        correctAnswer: 1,
        explanation: 'TCP establishes a 3-way handshake and handles sequence numbering, acknowledgments, retries, and window-based flow control.'
      },
      {
        id: 11,
        topic: 'Computer Networks',
        difficulty: 'MEDIUM',
        question: 'At which layer of the OSI 7-layer reference model does a standard IP Router operate to forward packets based on logical IP addresses?',
        options: [
          'Data Link Layer (Layer 2)',
          'Network Layer (Layer 3)',
          'Transport Layer (Layer 4)',
          'Session Layer (Layer 5)'
        ],
        correctAnswer: 1,
        explanation: 'Routers operate at Layer 3 (Network Layer) where routing protocols, IP addressing, and packet forwarding take place.'
      },
      {
        id: 12,
        topic: 'Computer Networks',
        difficulty: 'HARD',
        question: 'During TCP connection termination, why does the initiating endpoint transition to and remain in the TIME_WAIT state for 2 * MSL (Maximum Segment Lifetime)?',
        options: [
          'To conserve memory before releasing the socket',
          'To allow stray duplicate packets in the network to expire and ensure the final ACK was received',
          'To reset the sequence number counter for security against SYN floods',
          'To negotiate TLS session tickets for future reconnections'
        ],
        correctAnswer: 1,
        explanation: 'TIME_WAIT lasts 2*MSL to ensure the final ACK arrives reliably (or retransmit if lost) and to prevent lingering segments from being accepted by a new connection on the same socket pair.'
      },

      // DBMS (3 questions: Easy, Med, Hard)
      {
        id: 13,
        topic: 'DBMS',
        difficulty: 'EASY',
        question: 'Which DDL command quickly removes all records from a table without logging individual row deletions?',
        options: [
          'DELETE FROM table_name;',
          'TRUNCATE TABLE table_name;',
          'DROP TABLE table_name;',
          'REMOVE ALL FROM table_name;'
        ],
        correctAnswer: 1,
        explanation: 'TRUNCATE deallocates data pages directly, making it significantly faster than row-by-row logged DELETE statements.'
      },
      {
        id: 14,
        topic: 'DBMS',
        difficulty: 'MEDIUM',
        question: 'In relational database normalization, a table is in Second Normal Form (2NF) if it is already in 1NF and contains no:',
        options: [
          'Transitive functional dependencies',
          'Partial functional dependencies on a composite primary key',
          'Multi-valued dependencies',
          'Foreign key references'
        ],
        correctAnswer: 1,
        explanation: '2NF requires that all non-key attributes are fully functionally dependent on the entire primary key, eliminating partial dependencies.'
      },
      {
        id: 15,
        topic: 'DBMS',
        difficulty: 'HARD',
        question: 'Which ACID property guarantees that concurrent execution of transactions produces the same state that would be obtained if they were executed serially?',
        options: [
          'Atomicity',
          'Consistency',
          'Isolation',
          'Durability'
        ],
        correctAnswer: 2,
        explanation: 'Isolation ensures that transactions execute independently without interfering with each other (serializability), preventing dirty reads, non-repeatable reads, and phantom reads.'
      }
    ]
  },

  cloud: {
    id: 'cloud',
    title: 'Cloud & DevOps Engineer',
    subtitle: 'Containers, Kubernetes, CI/CD, AWS Architecture & IaC',
    icon: Cloud,
    description: '15 questions testing Docker, Kubernetes orchestration, AWS cloud patterns, Infrastructure as Code (Terraform), and CI/CD pipelines.',
    topics: ['Docker', 'Kubernetes', 'AWS Architecture', 'Terraform (IaC)', 'CI/CD & Linux'],
    questions: [
      {
        id: 1,
        topic: 'Docker',
        difficulty: 'EASY',
        question: 'Which Dockerfile instruction sets the default command and parameters executed when a container image is spun up?',
        options: ['RUN', 'CMD', 'FROM', 'COPY'],
        correctAnswer: 1,
        explanation: 'CMD provides default arguments for an executing container, which can be overridden by docker run arguments at launch.'
      },
      {
        id: 2,
        topic: 'Kubernetes',
        difficulty: 'EASY',
        question: 'What is the smallest deployable computing unit that Kubernetes creates and manages to host one or more containers?',
        options: ['Node', 'Pod', 'Cluster', 'Namespace'],
        correctAnswer: 1,
        explanation: 'A Pod represents a single instance of a running process in a cluster and encapsulates one or more closely coupled containers.'
      },
      {
        id: 3,
        topic: 'CI/CD',
        difficulty: 'EASY',
        question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
        options: [
          'Continuous Deployment automatically releases to production without manual intervention',
          'Continuous Delivery does not run automated tests',
          'Continuous Delivery only applies to front-end applications',
          'Continuous Deployment requires manual manager approval for every build'
        ],
        correctAnswer: 0,
        explanation: 'Continuous Delivery keeps code in an always-deployable state with manual production triggers, whereas Continuous Deployment releases every passing commit straight to production.'
      },
      {
        id: 4,
        topic: 'AWS Architecture',
        difficulty: 'EASY',
        question: 'Which AWS cloud service provides serverless, event-driven compute execution without provisioning or managing virtual machines?',
        options: ['Amazon EC2', 'AWS Lambda', 'Amazon ECS', 'Amazon Lightsail'],
        correctAnswer: 1,
        explanation: 'AWS Lambda runs code in response to events and automatically manages underlying compute resources, scaling from zero seamlessly.'
      },
      {
        id: 5,
        topic: 'AWS Architecture',
        difficulty: 'EASY',
        question: 'Which Amazon S3 storage class is best suited for long-term data archives accessed less than once a year with retrieval times of several hours?',
        options: ['S3 Standard', 'S3 Glacier Deep Archive', 'S3 Intelligent-Tiering', 'S3 Express One Zone'],
        correctAnswer: 1,
        explanation: 'S3 Glacier Deep Archive is Amazon S3\'s lowest-cost storage class, designed for 7-10+ year compliance retention with 12-48 hour batch retrieval.'
      },
      {
        id: 6,
        topic: 'Docker',
        difficulty: 'MEDIUM',
        question: 'Why are multi-stage builds considered an industry best practice in modern Docker containerization?',
        options: [
          'They allow containers to run multiple operating systems concurrently',
          'They dramatically reduce final image size by copying only compiled artifacts and leaving build tools behind',
          'They bypass Docker layer caching completely',
          'They automatically convert containers into Kubernetes pods'
        ],
        correctAnswer: 1,
        explanation: 'Multi-stage builds separate the compile stage (SDKs, build tools) from runtime, copying only the final binary into a minimal scratch/distroless base.'
      },
      {
        id: 7,
        topic: 'Kubernetes',
        difficulty: 'MEDIUM',
        question: 'Which Kubernetes workload controller guarantees that exactly one copy of a Pod executes on every worker node in the cluster (e.g. for log collection)?',
        options: ['Deployment', 'StatefulSet', 'DaemonSet', 'ReplicaSet'],
        correctAnswer: 2,
        explanation: 'A DaemonSet ensures all (or eligible) nodes run a copy of a pod, typically used for cluster storage, log shippers (Fluentbit), or node monitoring.'
      },
      {
        id: 8,
        topic: 'Terraform (IaC)',
        difficulty: 'MEDIUM',
        question: 'What file does Terraform use to map declared configuration resources to real-world cloud infrastructure metadata and IDs?',
        options: ['terraform.lock.hcl', 'terraform.tfstate', 'variables.tf', 'providers.tf'],
        correctAnswer: 1,
        explanation: 'The terraform.tfstate file stores the current state of managed infrastructure to compute deltas during plan and apply operations.'
      },
      {
        id: 9,
        topic: 'CI/CD & Linux',
        difficulty: 'MEDIUM',
        question: 'Which Linux command is best suited to inspect all active listening TCP ports along with their corresponding process names and PIDs?',
        options: ['ss -tulpn', 'ps aux', 'ping -c 4', 'traceroute -n'],
        correctAnswer: 0,
        explanation: 'The `ss -tulpn` command prints TCP (-t), UDP (-u), listening (-l), numeric addresses (-n), and process details (-p).'
      },
      {
        id: 10,
        topic: 'AWS Architecture',
        difficulty: 'MEDIUM',
        question: 'In a custom Amazon VPC, how does an EC2 instance in a Private Subnet initiate outbound requests to download security updates without exposing public IPs?',
        options: [
          'Through an Internet Gateway attached directly to the private subnet route table',
          'Through a NAT Gateway located in a Public Subnet',
          'By assigning an Elastic IP to the private instance',
          'Via Route 53 private hosted zones'
        ],
        correctAnswer: 1,
        explanation: 'A NAT (Network Address Translation) Gateway resides in a public subnet with an Elastic IP, routing outbound internet traffic for private instances while blocking inbound connections.'
      },
      {
        id: 11,
        topic: 'Kubernetes',
        difficulty: 'MEDIUM',
        question: 'What is the purpose of Kubernetes Ingress compared to a standard NodePort or ClusterIP service?',
        options: [
          'It manages internal DNS records for pods',
          'It acts as an HTTP/HTTPS reverse proxy and load balancer routing external traffic by host and path',
          'It encrypts worker node EBS volumes',
          'It scales pod replicas based on CPU metrics'
        ],
        correctAnswer: 1,
        explanation: 'Ingress exposes HTTP/HTTPS routes from outside the cluster to services within the cluster, offering URL path routing, SSL termination, and virtual hosts.'
      },
      {
        id: 12,
        topic: 'Kubernetes',
        difficulty: 'HARD',
        question: 'During a zero-downtime rolling update in Kubernetes, what happens if the newly spawned Pod consistently fails its configured readinessProbe?',
        options: [
          'The pod is immediately terminated and rescheduled on another node',
          'The pod remains running but is excluded from Service endpoints, and deployment rollout halts',
          'Kubernetes restarts all existing healthy pods immediately',
          'The entire cluster undergoes automatic node reboot'
        ],
        correctAnswer: 1,
        explanation: 'A failed readinessProbe informs kube-proxy not to send traffic to this pod. The deployment controller halts rolling update progress, preserving healthy existing pods.'
      },
      {
        id: 13,
        topic: 'Terraform (IaC)',
        difficulty: 'HARD',
        question: 'When multiple team members apply infrastructure changes concurrently, how does Terraform prevent state corruption and race conditions?',
        options: [
          'Using git commit rebase workflows',
          'State Locking via remote backends (e.g. AWS S3 with DynamoDB table lock)',
          'By encrypting tfvars files with asymmetric GPG keys',
          'Terraform automatically cancels duplicate CLI runs locally'
        ],
        correctAnswer: 1,
        explanation: 'Remote backends like S3 support DynamoDB state locking, preventing simultaneous writers from updating the state file concurrently.'
      },
      {
        id: 14,
        topic: 'DevOps & Architecture',
        difficulty: 'HARD',
        question: 'What core principle defines "Immutable Infrastructure" in modern DevOps delivery models?',
        options: [
          'Servers and containers are updated in-place via SSH scripts and Ansible playbooks',
          'Servers are never modified after launch; any change triggers building and deploying new replacement instances/images',
          'Database schemas can never undergo migrations',
          'Security policies are hardcoded into application source files'
        ],
        correctAnswer: 1,
        explanation: 'Immutable infrastructure prevents configuration drift by replacing entire servers or container images upon every upgrade rather than patching running hosts.'
      },
      {
        id: 15,
        topic: 'Observability',
        difficulty: 'HARD',
        question: 'In Prometheus monitoring architecture, how does the Prometheus Server primarily collect time-series metrics from target services?',
        options: [
          'Target services push UDP metrics directly to Prometheus port 9090',
          'Prometheus periodically scrapes (HTTP GET) metrics endpoints exposed by targets/exporters (Pull model)',
          'Prometheus polls target syslog daemons over SSH',
          'Prometheus inspects kernel event logs using eBPF probes exclusively'
        ],
        correctAnswer: 1,
        explanation: 'Prometheus operates on a Pull model, querying targets over HTTP `/metrics` at designated scrape intervals discovered via service discovery.'
      }
    ]
  },

  aiml: {
    id: 'aiml',
    title: 'AI & Machine Learning Engineer',
    subtitle: 'Deep Learning, NLP, Transformers, Model Evaluation & MLOps',
    icon: Cpu,
    description: '15 questions assessing supervised/unsupervised machine learning, neural networks, LLM fine-tuning, evaluation metrics, and production MLOps.',
    topics: ['Supervised Learning', 'Deep Learning & Neural Networks', 'NLP & Transformers', 'Model Evaluation', 'GenAI & MLOps'],
    questions: [
      {
        id: 1,
        topic: 'Supervised Learning',
        difficulty: 'EASY',
        question: 'Which type of Machine Learning task aims to predict a continuous numerical output value (such as salary or house price)?',
        options: ['Classification', 'Regression', 'Clustering', 'Dimensionality Reduction'],
        correctAnswer: 1,
        explanation: 'Regression predicts continuous quantities, while Classification predicts discrete categorical labels.'
      },
      {
        id: 2,
        topic: 'Model Evaluation',
        difficulty: 'EASY',
        question: 'What phenomenon occurs when a machine learning model achieves near 100% training accuracy but performs terribly on unseen validation data?',
        options: ['Underfitting', 'Overfitting', 'High Bias', 'Data Imbalance'],
        correctAnswer: 1,
        explanation: 'Overfitting happens when a model learns noise and specific quirks of the training set rather than generalizable underlying patterns.'
      },
      {
        id: 3,
        topic: 'Deep Learning',
        difficulty: 'EASY',
        question: 'Which activation function is most widely used in hidden layers of modern Convolutional Neural Networks to prevent vanishing gradients?',
        options: ['Sigmoid', 'Tanh', 'ReLU (Rectified Linear Unit)', 'Softmax'],
        correctAnswer: 2,
        explanation: 'ReLU (f(x) = max(0, x)) does not saturate for positive values, maintaining strong derivative gradients and computing very quickly.'
      },
      {
        id: 4,
        topic: 'Supervised Learning',
        difficulty: 'EASY',
        question: 'In Python data science workflows, which library provides high-performance N-dimensional array processing and linear algebra foundations?',
        options: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
        correctAnswer: 1,
        explanation: 'NumPy forms the fundamental computing package in Python, offering ndarray objects and vectorised C-level operations.'
      },
      {
        id: 5,
        topic: 'NLP & Transformers',
        difficulty: 'EASY',
        question: 'What technique breaks raw textual sentences down into individual words, subwords, or punctuation symbols before passing them to an LLM?',
        options: ['Tokenization', 'Stemming', 'Vector Quantization', 'Cross-Validation'],
        correctAnswer: 0,
        explanation: 'Tokenization maps string characters into token IDs (e.g. Byte-Pair Encoding or WordPiece) that embedding matrices can ingest.'
      },
      {
        id: 6,
        topic: 'Model Evaluation',
        difficulty: 'MEDIUM',
        question: 'In a medical diagnostic system where failing to detect a malignant tumor can be fatal, which metric should be prioritized over raw accuracy?',
        options: ['Precision', 'Recall (Sensitivity)', 'Specificity', 'Accuracy'],
        correctAnswer: 1,
        explanation: 'Recall = TP / (TP + FN). Maximizing recall minimizes False Negatives, ensuring as few actual cancer cases are missed as possible.'
      },
      {
        id: 7,
        topic: 'Deep Learning',
        difficulty: 'MEDIUM',
        question: 'Which optimizer calculates adaptive learning rates for each parameter by maintaining exponential moving averages of both past gradients and squared gradients?',
        options: ['Vanilla SGD', 'Momentum SGD', 'Adam (Adaptive Moment Estimation)', 'Adagrad'],
        correctAnswer: 2,
        explanation: 'Adam combines the benefits of RMSprop and Momentum by tracking first (mean) and second (uncentered variance) moments of the gradients.'
      },
      {
        id: 8,
        topic: 'Supervised Learning',
        difficulty: 'MEDIUM',
        question: 'What is the key architectural difference between Random Forest and Gradient Boosted Decision Trees (XGBoost/LightGBM)?',
        options: [
          'Random Forest builds shallow linear models while XGBoost builds neural nets',
          'Random Forest trains independent trees in parallel (Bagging); Gradient Boosting trains trees sequentially to correct prior errors (Boosting)',
          'Random Forest cannot be used for classification',
          'Gradient Boosting does not support regularization'
        ],
        correctAnswer: 1,
        explanation: 'Random Forest uses bootstrap aggregation (Bagging) to reduce variance in parallel, whereas Boosting trains sequentially to reduce bias by fitting residuals.'
      },
      {
        id: 9,
        topic: 'NLP & Transformers',
        difficulty: 'MEDIUM',
        question: 'What revolutionary mechanism in the Transformer architecture allows the model to capture relationships between any two tokens in a sentence irrespective of distance?',
        options: ['Recurrent Feedback Loops', 'Self-Attention Mechanism', 'Convolutional Pooling', 'Markov Transition Matrices'],
        correctAnswer: 1,
        explanation: 'Scaled Dot-Product Self-Attention computes compatibility scores between Query, Key, and Value vectors across all positions in O(1) sequential step.'
      },
      {
        id: 10,
        topic: 'GenAI & Fine-Tuning',
        difficulty: 'MEDIUM',
        question: 'Which parameter-efficient fine-tuning (PEFT) method freezes pretrained LLM weights and injects trainable low-rank decomposition matrices into transformer layers?',
        options: ['RLHF', 'LoRA (Low-Rank Adaptation)', 'Quantization-Aware Training', 'Knowledge Distillation'],
        correctAnswer: 1,
        explanation: 'LoRA freezes the W0 weight matrix and injects trainable rank decomposition matrices A and B (ΔW = B x A), cutting trainable parameters by over 99%.'
      },
      {
        id: 11,
        topic: 'Deep Learning',
        difficulty: 'HARD',
        question: 'What is the primary objective of applying Batch Normalization in deep neural networks during training?',
        options: [
          'It guarantees zero test error on small datasets',
          'It normalizes layer inputs across the mini-batch to stabilize internal covariate shift and allow higher learning rates',
          'It compresses 32-bit floats into 8-bit integers',
          'It replaces the loss function with Kullback-Leibler divergence'
        ],
        correctAnswer: 1,
        explanation: 'Batch Normalization standardizes activations per mini-batch, smoothing the optimization landscape and mitigating vanishing/exploding gradients.'
      },
      {
        id: 12,
        topic: 'Model Evaluation',
        difficulty: 'HARD',
        question: 'What does an Area Under the ROC Curve (AUC-ROC) score of exactly 0.5 indicate for a binary classification model?',
        options: [
          'The model is a perfect predictor with 100% accuracy',
          'The model has zero discriminatory power and is equivalent to random coin tossing',
          'The model has inverted predictions and must be inverted',
          'The dataset suffers from exact 50/50 class balance'
        ],
        correctAnswer: 1,
        explanation: 'An AUC of 0.5 represents the diagonal line on the ROC curve, meaning the classifier cannot differentiate between positive and negative classes at all.'
      },
      {
        id: 13,
        topic: 'GenAI & RAG',
        difficulty: 'HARD',
        question: 'In modern Retrieval-Augmented Generation (RAG) vector databases, what indexing algorithm enables high-speed Approximate Nearest Neighbor (ANN) search over embeddings?',
        options: [
          'Dijkstra\'s shortest path',
          'HNSW (Hierarchical Navigable Small World)',
          'Ford-Fulkerson algorithm',
          'Bubble sort indexing'
        ],
        correctAnswer: 1,
        explanation: 'HNSW builds multi-layer proximity graphs offering logarithmic scaling and high recall for high-dimensional vector similarity lookups.'
      },
      {
        id: 14,
        topic: 'Unsupervised Learning',
        difficulty: 'HARD',
        question: 'How does the K-Means++ initialization algorithm significantly improve standard K-Means clustering convergence?',
        options: [
          'It runs principal component analysis on coordinates prior to clustering',
          'It chooses initial centroids that are distant from one another with probability proportional to their squared distance from nearest centroid',
          'It eliminates the need for calculating Euclidean distances',
          'It automatically selects the optimal value of K via elbow method'
        ],
        correctAnswer: 1,
        explanation: 'K-Means++ seeds initial cluster centers probabilistically proportional to squared distance D(x)^2, avoiding poor local minima and speeding up convergence.'
      },
      {
        id: 15,
        topic: 'MLOps',
        difficulty: 'HARD',
        question: 'What is "Concept Drift" in production machine learning systems?',
        options: [
          'The input data distribution P(X) shifts while the relationship P(Y|X) remains fixed',
          'The statistical relationship between input features and target labels P(Y|X) changes over time',
          'Model inference latency increases due to server RAM leaks',
          'GPU drivers become incompatible with the CUDA runtime'
        ],
        correctAnswer: 1,
        explanation: 'Concept Drift occurs when the underlying ground truth mapping changes (e.g. consumer fraud patterns change post-pandemic), rendering prior training data obsolete.'
      }
    ]
  },

  cybersecurity: {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst & Engineer',
    subtitle: 'Network Defense, Web Security (OWASP), Cryptography & Threat Analysis',
    icon: ShieldAlert,
    description: '15 questions covering the CIA Triad, OWASP Top 10 vulnerabilities, modern cryptography, Zero Trust networking, and incident response.',
    topics: ['CIA & Fundamentals', 'OWASP Web Security', 'Cryptography', 'Network Defense & Auth', 'Threats & Zero Trust'],
    questions: [
      {
        id: 1,
        topic: 'CIA & Fundamentals',
        difficulty: 'EASY',
        question: 'What are the three pillars that form the foundational CIA Triad in information security?',
        options: [
          'Control, Inspection, Auditing',
          'Confidentiality, Integrity, Availability',
          'Cryptography, Identity, Authorization',
          'Compliance, Incident, Alerting'
        ],
        correctAnswer: 1,
        explanation: 'Confidentiality (privacy), Integrity (data accuracy/tamper-resistance), and Availability (system uptime) constitute the CIA Triad.'
      },
      {
        id: 2,
        topic: 'OWASP Web Security',
        difficulty: 'EASY',
        question: 'Which HTTP response header forces compliant web browsers to strictly communicate with a website only via HTTPS encryption?',
        options: [
          'X-Frame-Options',
          'Strict-Transport-Security (HSTS)',
          'Content-Security-Policy',
          'Access-Control-Allow-Origin'
        ],
        correctAnswer: 1,
        explanation: 'HTTP Strict Transport Security (HSTS) prevents SSL stripping attacks by enforcing HTTPS connections directly on the client side.'
      },
      {
        id: 3,
        topic: 'Threats & Attacks',
        difficulty: 'EASY',
        question: 'What type of social engineering attack deceives victims into revealing credentials by spoofing legitimate organizations through fraudulent emails?',
        options: ['Phishing', 'Buffer Overflow', 'Port Scanning', 'SQL Injection'],
        correctAnswer: 0,
        explanation: 'Phishing exploits human deception via deceptive emails or messages to capture sensitive credentials or implant malware.'
      },
      {
        id: 4,
        topic: 'Cryptography',
        difficulty: 'EASY',
        question: 'What is the key functional difference between Symmetric and Asymmetric encryption algorithms?',
        options: [
          'Symmetric encryption does not use mathematical keys',
          'Symmetric uses a single shared secret key; Asymmetric uses a mathematically linked Public-Private key pair',
          'Asymmetric encryption cannot be decrypted',
          'Symmetric algorithms are only used for digital signatures'
        ],
        correctAnswer: 1,
        explanation: 'Symmetric (e.g. AES) uses the same secret key for encryption and decryption; Asymmetric (e.g. RSA, ECC) uses public and private keys.'
      },
      {
        id: 5,
        topic: 'OWASP Web Security',
        difficulty: 'EASY',
        question: 'Which vulnerability occurs when user input containing unescaped HTML/JavaScript is rendered directly in another user\'s web browser?',
        options: [
          'Cross-Site Scripting (XSS)',
          'Insecure Deserialization',
          'Server-Side Request Forgery (SSRF)',
          'Path Traversal'
        ],
        correctAnswer: 0,
        explanation: 'XSS allows attackers to execute arbitrary scripts in victims\' browser sessions, stealing cookies or session tokens.'
      },
      {
        id: 6,
        topic: 'OWASP Web Security',
        difficulty: 'MEDIUM',
        question: 'What is the most effective and standard defense mechanism against SQL Injection vulnerabilities in backend database queries?',
        options: [
          'Sanitizing input by removing single quotes with regex',
          'Parameterized Queries (Prepared Statements) with bind parameters',
          'Encrypting the database connection with TLS',
          'Using client-side HTML5 form validation only'
        ],
        correctAnswer: 1,
        explanation: 'Parameterized queries separate code from data; user input is strictly treated as a literal parameter, never parsed as executable SQL grammar.'
      },
      {
        id: 7,
        topic: 'Network Defense & Auth',
        difficulty: 'MEDIUM',
        question: 'In OAuth 2.0 / OpenID Connect (OIDC) protocols, which token specifically contains claims about user authentication identity formatted as a signed JWT?',
        options: ['Access Token', 'Refresh Token', 'ID Token', 'Bearer Header'],
        correctAnswer: 2,
        explanation: 'The ID Token contains user identity claims (sub, email, aud, exp) and is verified by client applications in OIDC flows.'
      },
      {
        id: 8,
        topic: 'Network Defense & Auth',
        difficulty: 'MEDIUM',
        question: 'What attack vector involves sending forged ARP messages over a local Ethernet LAN to link an attacker\'s MAC address with a default gateway\'s IP address?',
        options: ['DNS Poisoning', 'ARP Spoofing / Cache Poisoning', 'BGP Hijacking', 'Smurf Attack'],
        correctAnswer: 1,
        explanation: 'ARP spoofing associates the attacker\'s MAC with the IP address of a legitimate computer or gateway, facilitating Man-in-the-Middle traffic interception.'
      },
      {
        id: 9,
        topic: 'Network Defense & Auth',
        difficulty: 'MEDIUM',
        question: 'What type of firewall maintains a table of active TCP/UDP connections to inspect both packet headers and valid connection state transitions?',
        options: ['Stateless Packet Filter', 'Stateful Inspection Firewall', 'Proxy Firewall only', 'Circuit-level Gateway'],
        correctAnswer: 1,
        explanation: 'Stateful firewalls track the state of network connections (e.g. TCP SYN, SYN-ACK, ESTABLISHED), dropping unauthorized out-of-sequence packets.'
      },
      {
        id: 10,
        topic: 'OWASP Web Security',
        difficulty: 'MEDIUM',
        question: 'What browser security attribute configured on HTTP cookies prevents Cross-Site Request Forgery (CSRF) by not sending cookies with cross-site requests?',
        options: ['HttpOnly', 'SameSite (Strict or Lax)', 'Secure', 'Domain=.example.com'],
        correctAnswer: 1,
        explanation: 'SameSite=Strict prevents the browser from sending the cookie in cross-site browsing contexts, blocking CSRF attacks.'
      },
      {
        id: 11,
        topic: 'Threats & Zero Trust',
        difficulty: 'HARD',
        question: 'What fundamental security architecture paradigm replaces perimeter-based defenses with the doctrine "Never Trust, Always Verify"?',
        options: ['Defense in Depth (Classic)', 'Zero Trust Architecture (ZTA)', 'Demilitarized Zone (DMZ)', 'Air-Gapping'],
        correctAnswer: 1,
        explanation: 'Zero Trust assumes breach and requires continuous explicit verification of every transaction, least-privilege access, and microsegmentation.'
      },
      {
        id: 12,
        topic: 'Cryptography',
        difficulty: 'HARD',
        question: 'Why has Elliptic Curve Cryptography (ECC / ECDSA) largely superseded RSA in modern TLS 1.3 certificates and cryptographic hardware?',
        options: [
          'ECC does not rely on modular arithmetic',
          'ECC offers equivalent cryptographic strength with dramatically smaller key lengths (e.g. 256-bit ECC ≈ 3072-bit RSA), lowering computation and bandwidth',
          'ECC keys are immune to quantum computer Shor\'s algorithm',
          'ECC requires no random number generator'
        ],
        correctAnswer: 1,
        explanation: 'ECC leverages elliptic curve discrete logarithms, achieving high security with far smaller keys and faster signature verification compared to large RSA keys.'
      },
      {
        id: 13,
        topic: 'Threats & Zero Trust',
        difficulty: 'HARD',
        question: 'What operating system-level memory defense mechanism randomizes the base addresses of the stack, heap, and shared libraries to thwart buffer overflow and ROP exploits?',
        options: ['Data Execution Prevention (DEP / NX)', 'ASLR (Address Space Layout Randomization)', 'Stack Canaries', 'Control Flow Guard (CFG)'],
        correctAnswer: 1,
        explanation: 'ASLR randomizes memory offsets on executable launch, making it difficult for attackers to predict target shellcode or return gadget memory addresses.'
      },
      {
        id: 14,
        topic: 'Threats & Incident Response',
        difficulty: 'HARD',
        question: 'In the NIST Incident Response Framework (SP 800-61), what is the primary objective of the "Containment" phase?',
        options: [
          'Reinstalling compromised OS images from backup',
          'Preventing an active threat from expanding its blast radius and isolating affected hosts',
          'Documenting post-mortem lessons learned with executives',
          'Running vulnerability scanners on undamaged networks'
        ],
        correctAnswer: 1,
        explanation: 'Containment limits damage and prevents adversaries from spreading laterally or exfiltrating additional data while evidence is preserved.'
      },
      {
        id: 15,
        topic: 'Network Defense & Auth',
        difficulty: 'HARD',
        question: 'What primary capability distinguishes a modern SIEM with SOAR (Security Orchestration, Automation, and Response) from basic syslog aggregation?',
        options: [
          'Automatic generation of zero-day exploits',
          'Automated playbook execution (e.g. isolating hosts, disabling IAM accounts) in response to correlated threat alerts',
          'Replacing network intrusion detection hardware completely',
          'Re-indexing disk partitions without system reboot'
        ],
        correctAnswer: 1,
        explanation: 'SOAR tools ingest correlated SIEM alerts and automatically trigger remediation playbooks (quarantining endpoints, revoking tokens) with minimal human delay.'
      }
    ]
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const SkillAssessment = () => {
  // State: 'select' | 'quiz' | 'analysis'
  const [viewState, setViewState] = useState('select');
  const [selectedRole, setSelectedRole] = useState('fresher');

  // Quiz execution states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes (in seconds)
  const [timerActive, setTimerActive] = useState(false);

  // Analysis result states
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('ALL'); // 'ALL' | 'CORRECT' | 'INCORRECT' | 'EASY' | 'MEDIUM' | 'HARD'

  const activeAssessment = ROLE_ASSESSMENTS[selectedRole] || ROLE_ASSESSMENTS.fresher;
  const questions = activeAssessment.questions;
  const currentQ = questions[currentQuestionIndex];

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start Assessment
  const handleStartQuiz = (roleKey = selectedRole) => {
    setSelectedRole(roleKey);
    setUserAnswers({});
    setMarkedForReview({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(1200); // 20 mins
    setTimerActive(true);
    setViewState('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(`Assessment started: ${ROLE_ASSESSMENTS[roleKey].title}`);
  };

  // Select option
  const handleOptionSelect = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  // Toggle mark for review
  const handleToggleMark = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Submit and Calculate Comprehensive Analysis
  const handleSubmitAssessment = () => {
    setTimerActive(false);

    let totalMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    // Difficulty breakdown: { total, correct }
    const difficultyStats = {
      EASY: { total: 0, correct: 0 },
      MEDIUM: { total: 0, correct: 0 },
      HARD: { total: 0, correct: 0 }
    };

    // Topic breakdown: { [topic]: { total, correct } }
    const topicStats = {};

    questions.forEach((q) => {
      const diff = q.difficulty || 'MEDIUM';
      if (!difficultyStats[diff]) {
        difficultyStats[diff] = { total: 0, correct: 0 };
      }
      difficultyStats[diff].total += 1;

      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unattemptedCount += 1;
      } else if (userAns === q.correctAnswer) {
        correctCount += 1;
        totalMarks += 1;
        difficultyStats[diff].correct += 1;
        topicStats[q.topic].correct += 1;
      } else {
        incorrectCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const timeSpentSeconds = 1200 - timeRemaining;

    const resultData = {
      roleTitle: activeAssessment.title,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalMarks,
      percentage,
      timeSpentSeconds,
      difficultyStats,
      topicStats,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAssessmentResult(resultData);
    setViewState('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (percentage >= 70) {
      toast.success(`Outstanding! Scored ${correctCount}/${questions.length} (${percentage}%)`);
    } else {
      toast(`Assessment Completed! Scored ${correctCount}/${questions.length} (${percentage}%)`, {
        icon: '📊'
      });
    }
  };

  // Helper badge color
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40';
      case 'MEDIUM':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/40';
      case 'HARD':
        return 'bg-rose-950/60 text-rose-400 border-rose-800/40';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  // Filtered review questions
  const getFilteredQuestions = () => {
    if (!assessmentResult) return [];
    return questions.filter((q) => {
      const userAns = userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (reviewFilter === 'CORRECT') return isCorrect;
      if (reviewFilter === 'INCORRECT') return !isCorrect;
      if (reviewFilter === 'EASY') return q.difficulty === 'EASY';
      if (reviewFilter === 'MEDIUM') return q.difficulty === 'MEDIUM';
      if (reviewFilter === 'HARD') return q.difficulty === 'HARD';
      return true;
    });
  };

  // ==========================================================================
  // VIEW 1: ROLE SELECTION & OVERVIEW
  // ==========================================================================
  if (viewState === 'select') {
    return (
      <div className="space-y-8">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-red-950/60">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-xs font-semibold text-red-300 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Multi-Role Technical Assessments</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white hero-serif">
                Skill Assessment & Gap Diagnostics
              </h2>
              <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                Select your desired role to launch a 15-question targeted MCQ exam with real-time analytics, difficulty-level tagging (Easy, Medium, Hard), and deep performance breakdown.
              </p>
            </div>

            {/* Quick Role Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider hidden sm:block">
                Role:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-[#140f1c] border border-red-800/50 text-white text-sm font-semibold focus:outline-none focus:border-red-500 shadow-lg cursor-pointer"
              >
                <option value="fresher">Fresher (OOP, DSA, OS, CN, DBMS)</option>
                <option value="cloud">Cloud & DevOps Engineer</option>
                <option value="aiml">AI & Machine Learning Engineer</option>
                <option value="cybersecurity">Cybersecurity Analyst</option>
              </select>
            </div>
          </div>

          {/* Active Selected Role Highlight Banner */}
          <div className="mt-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#15101d] border border-red-900/30 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Duration</p>
                <p className="text-sm font-bold text-white">20 Minutes</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#15101d] border border-red-900/30 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Questions</p>
                <p className="text-sm font-bold text-white">15 MCQs (Easy / Med / Hard)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#15101d] border border-red-900/30 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Evaluation</p>
                <p className="text-sm font-bold text-white">Difficulty & Topic Breakdown</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(ROLE_ASSESSMENTS).map(([key, role]) => {
            const Icon = role.icon;
            const isSelected = selectedRole === key;

            return (
              <div
                key={key}
                onClick={() => setSelectedRole(key)}
                className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#170e1c] to-[#120a16] border-red-600/80 shadow-[0_0_25px_rgba(239,68,68,0.25)] ring-1 ring-red-500'
                    : 'bg-[#0f0b15]/90 border-red-900/30 hover:border-red-700/60 hover:bg-[#130d1c]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-red-950/50 text-red-400 border border-red-800/40'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{role.title}</h3>
                        <p className="text-xs text-red-400/90 font-medium">15 Questions • 20 Mins</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-sm flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Topics Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {role.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#1a1224] border border-red-900/40 text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-red-950/50 flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    <span className="text-emerald-400 font-semibold">5 Easy</span> •{' '}
                    <span className="text-amber-400 font-semibold">6 Med</span> •{' '}
                    <span className="text-rose-400 font-semibold">4 Hard</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartQuiz(key);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-md shadow-red-600/30 transition-all flex items-center space-x-1.5"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 2: ACTIVE QUIZ VIEW
  // ==========================================================================
  if (viewState === 'quiz') {
    const answeredCount = Object.keys(userAnswers).length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

    return (
      <div className="space-y-6">
        {/* Top Sticky Status Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0b15]/95 border border-red-900/50 shadow-xl flex flex-wrap items-center justify-between gap-4 sticky top-20 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-950/60 border border-red-800/50 text-red-300">
              {activeAssessment.title}
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Question <span className="text-white font-bold">{currentQuestionIndex + 1}</span> of {questions.length}
            </span>
          </div>

          {/* Timer Display */}
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl border font-mono text-sm font-bold shadow-sm ${
            timeRemaining < 300 
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
              : 'bg-[#140f1c] border-red-900/50 text-white'
          }`}>
            <Clock className="w-4 h-4 text-red-400" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          {/* Quick Submit */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSubmitAssessment}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all"
            >
              Finish & View Analysis
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#150f1e] overflow-hidden border border-red-950">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Question Card & Question Palette Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Question Box (8 cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
            
            {/* Question Header & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-red-950/60">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1a1224] border border-red-900/50 text-gray-300">
                  {currentQ.topic}
                </span>

                {/* Difficulty Tag */}
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getDifficultyBadge(currentQ.difficulty)}`}>
                  {currentQ.difficulty}
                </span>
              </div>

              <button
                onClick={handleToggleMark}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                    : 'bg-[#150f1d] border-red-950 text-gray-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                <span className="text-red-500 mr-2">Q{currentQuestionIndex + 1}.</span>
                {currentQ.question}
              </h3>
            </div>

            {/* 4 MCQ Option Cards */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start space-x-3.5 ${
                      isSelected
                        ? 'bg-red-950/40 border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.25)] text-white'
                        : 'bg-[#140f1a] border-red-900/30 text-gray-300 hover:border-red-700/50 hover:bg-[#181120]'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-red-950/50 text-gray-400 border border-red-900/40'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm font-medium pt-0.5 leading-relaxed">
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Nav Controls */}
            <div className="pt-6 border-t border-red-950/60 flex items-center justify-between">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-[#160f1f] border border-red-900/30 hover:border-red-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-gray-400">
                Answered: <span className="text-white font-bold">{answeredCount}</span> / {questions.length}
              </div>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all flex items-center space-x-1"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitAssessment}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-md shadow-emerald-600/30 transition-all flex items-center space-x-1"
                >
                  <span>Submit Exam</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Question Palette Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-5">
            <h4 className="text-sm font-bold text-white pb-3 border-b border-red-950 flex items-center justify-between">
              <span>Question Palette</span>
              <span className="text-xs text-red-400 font-normal">15 MCQs</span>
            </h4>

            {/* Grid of 15 buttons */}
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];

                let buttonClass = 'bg-[#150f1d] border-red-950 text-gray-400 hover:border-red-700/50';
                if (isCurrent) {
                  buttonClass = 'ring-2 ring-red-500 bg-red-950/80 text-white font-bold border-red-500';
                } else if (isMarked) {
                  buttonClass = 'bg-amber-950/60 border-amber-600 text-amber-300 font-bold';
                } else if (isAnswered) {
                  buttonClass = 'bg-emerald-950/60 border-emerald-600 text-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 rounded-xl border text-xs transition-all flex flex-col items-center justify-center relative ${buttonClass}`}
                  >
                    <span>{idx + 1}</span>
                    <span className="text-[9px] uppercase opacity-75">{q.difficulty[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-red-950/60 space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-gray-400">Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="text-gray-400">Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-gray-700 inline-block" />
                <span className="text-gray-400">Unanswered ({questions.length - answeredCount})</span>
              </div>
            </div>

            {/* Emergency Quit */}
            <div className="pt-2">
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to exit the assessment? Your progress will be discarded.')) {
                    setTimerActive(false);
                    setViewState('select');
                  }
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-400 hover:bg-red-950/20 transition-all"
              >
                Exit to Role Selector
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 3: COMPREHENSIVE ANALYSIS PAGE
  // ==========================================================================
  if (viewState === 'analysis' && assessmentResult) {
    const {
      roleTitle,
      totalQuestions,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalMarks,
      percentage,
      timeSpentSeconds,
      difficultyStats,
      topicStats
    } = assessmentResult;

    const filteredQuestions = getFilteredQuestions();

    return (
      <div className="space-y-8">
        
        {/* Main Scorecard Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-red-950/60">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-xs font-semibold text-red-300 mb-3">
                <Award className="w-3.5 h-3.5 text-red-400" />
                <span>Performance Diagnostic Report</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white hero-serif">
                {roleTitle} Analysis
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Completed in {Math.floor(timeSpentSeconds / 60)}m {timeSpentSeconds % 60}s • 15 Questions Evaluated
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStartQuiz(selectedRole)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all flex items-center space-x-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Exam</span>
              </button>

              <button
                onClick={() => setViewState('select')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-[#160f1f] border border-red-900/40 hover:text-white transition-all"
              >
                Change Role
              </button>
            </div>
          </div>

          {/* 4 Stat Highlights */}
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Score */}
            <div className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30">
              <p className="text-xs text-gray-400">Total Score (Marks)</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white">{totalMarks}</span>
                <span className="text-sm text-gray-400">/ {totalQuestions}</span>
              </div>
              <p className="text-xs text-red-400 font-semibold mt-1">{percentage}% Accuracy</p>
            </div>

            {/* Correct */}
            <div className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30">
              <p className="text-xs text-gray-400">Correct Answers</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-emerald-400">{correctCount}</span>
                <span className="text-sm text-gray-400">questions</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">+{correctCount} marks earned</p>
            </div>

            {/* Incorrect */}
            <div className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30">
              <p className="text-xs text-gray-400">Incorrect / Missed</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-rose-400">{incorrectCount}</span>
                <span className="text-sm text-gray-400">wrong</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{unattemptedCount} unattempted</p>
            </div>

            {/* Readiness Grade */}
            <div className="p-5 rounded-2xl bg-[#140f1c] border border-red-900/30">
              <p className="text-xs text-gray-400">Readiness Assessment</p>
              <div className="mt-1">
                <span className={`text-xl font-black ${
                  percentage >= 80 ? 'text-emerald-400' : percentage >= 60 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {percentage >= 80 ? 'Interview Ready' : percentage >= 60 ? 'Proficient' : 'Needs Practice'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {percentage >= 80 ? 'Exceeds benchmark' : percentage >= 60 ? 'Review gaps below' : 'Recommended targeted study'}
              </p>
            </div>

          </div>
        </div>

        {/* ==================================================================
            DIFFICULTY LEVEL BREAKDOWN (EASY, MEDIUM, HARD AS REQUESTED)
        ================================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-red-950">
            <div>
              <h3 className="text-xl font-bold text-white hero-serif">Difficulty Performance Breakdown</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Detailed split of correct answers categorized by question complexity level
              </p>
            </div>
            <span className="text-xs text-red-400 font-semibold px-3 py-1 rounded-full bg-red-950/40 border border-red-900/40">
              Difficulty Analytics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* EASY Breakdown */}
            {(() => {
              const stat = difficultyStats.EASY || { total: 0, correct: 0 };
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div className="p-5 rounded-2xl bg-[#140f1c] border border-emerald-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      EASY QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{pct}%</span>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-3xl font-extrabold text-white">{stat.correct}</span>
                    <span className="text-base text-gray-400">/ {stat.total} correct</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#1b1424] overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    {stat.correct === stat.total 
                      ? 'Flawless! All foundational questions answered correctly.'
                      : `${stat.total - stat.correct} easy question(s) missed — review basic concepts.`}
                  </p>
                </div>
              );
            })()}

            {/* MEDIUM Breakdown */}
            {(() => {
              const stat = difficultyStats.MEDIUM || { total: 0, correct: 0 };
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div className="p-5 rounded-2xl bg-[#140f1c] border border-amber-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-950/60 text-amber-400 border border-amber-800/40">
                      MEDIUM QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">{pct}%</span>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-3xl font-extrabold text-white">{stat.correct}</span>
                    <span className="text-base text-gray-400">/ {stat.total} correct</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#1b1424] overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    {pct >= 70
                      ? 'Strong grasp on standard technical interview questions.'
                      : `${stat.total - stat.correct} medium question(s) missed — solidify core techniques.`}
                  </p>
                </div>
              );
            })()}

            {/* HARD Breakdown */}
            {(() => {
              const stat = difficultyStats.HARD || { total: 0, correct: 0 };
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div className="p-5 rounded-2xl bg-[#140f1c] border border-rose-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-950/60 text-rose-400 border border-rose-800/40">
                      HARD QUESTIONS
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-bold">{pct}%</span>
                  </div>

                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-3xl font-extrabold text-white">{stat.correct}</span>
                    <span className="text-base text-gray-400">/ {stat.total} correct</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#1b1424] overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    {pct >= 50
                      ? 'Impressive advanced problem-solving capabilities.'
                      : 'High-complexity edge cases and deep architectural internals.'}
                  </p>
                </div>
              );
            })()}

          </div>
        </div>

        {/* Topic Breakdown Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-5">
          <h3 className="text-lg font-bold text-white hero-serif">Topic Mastery Breakdown</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Object.entries(topicStats).map(([topic, stat]) => {
              const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              return (
                <div key={topic} className="p-4 rounded-2xl bg-[#140f1c] border border-red-900/20 space-y-2">
                  <p className="text-xs font-bold text-white truncate" title={topic}>{topic}</p>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-gray-300 font-semibold">{stat.correct}/{stat.total}</span>
                    <span className={`font-mono font-bold ${pct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1b1424] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================
            QUESTION-BY-QUESTION REVIEW
        ================================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0f0b15]/90 border border-red-900/40 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-red-950">
            <div>
              <h3 className="text-xl font-bold text-white hero-serif">Comprehensive Question Review</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Inspect your answers, correct solutions, explanations, and difficulty ratings
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['ALL', 'CORRECT', 'INCORRECT', 'EASY', 'MEDIUM', 'HARD'].map((f) => (
                <button
                  key={f}
                  onClick={() => setReviewFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reviewFilter === f
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-[#140f1a] text-gray-400 hover:text-white border border-red-950'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List of Filtered Questions */}
          <div className="space-y-4">
            {filteredQuestions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;
              const isUnattempted = userAns === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all space-y-4 ${
                    isCorrect
                      ? 'bg-[#0f1414] border-emerald-900/40'
                      : 'bg-[#150f16] border-rose-900/40'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#1a1224] border border-red-900/40 text-gray-300">
                        {q.topic}
                      </span>
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getDifficultyBadge(q.difficulty)}`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1 Mark)
                        </span>
                      ) : isUnattempted ? (
                        <span className="text-amber-400 flex items-center gap-1 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                          <AlertCircle className="w-3.5 h-3.5" /> Not Attempted (0 Marks)
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 bg-rose-950/60 px-2.5 py-1 rounded-lg border border-rose-800/40">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (0 Marks)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Title */}
                  <h4 className="text-base font-bold text-white leading-relaxed">
                    <span className="text-red-500 mr-2">Q{q.id}.</span>
                    {q.question}
                  </h4>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAns === optIdx;
                      const isCorrectChoice = q.correctAnswer === optIdx;

                      let optStyle = 'bg-[#130d1a] border-red-950 text-gray-400';
                      if (isCorrectChoice) {
                        optStyle = 'bg-emerald-950/40 border-emerald-600 text-emerald-300 font-semibold';
                      } else if (isUserChoice && !isCorrect) {
                        optStyle = 'bg-rose-950/40 border-rose-600 text-rose-300 font-semibold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                          </div>
                          {isCorrectChoice && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                          {isUserChoice && !isCorrectChoice && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  <div className="p-3.5 rounded-xl bg-[#140e1f] border border-red-900/30 text-xs text-gray-300 space-y-1">
                    <p className="font-bold text-red-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      Explanation:
                    </p>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    );
  }

  return null;
};

export default SkillAssessment;
