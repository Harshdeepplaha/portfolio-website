import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { Brain, Code2 } from "lucide-react";
import VRgameImg from "@/public/VRgame.jpeg"
import { LuGraduationCap } from "react-icons/lu";
import SignlingoImg from "@/public/Signlingo.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import { machine } from "os";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Data Scientist @ Bliink AI Payments",
    location: "Iselin, NJ, USA",
    description: [
      "Architected real-time and batch data pipelines for transaction ingestion and model training, streaming through Apache Kafka and coordinating 10+ Apache Airflow DAG tasks",
      "Built and trained ensemble models (Neural Network, Random Forest, XGBoost) on GPU clusters, achieving 95% ROC-AUC",
      "Developed secure Model/Parameter Admin module (FastAPI + React) with role-based access control and audit logging",
      "Containerized models in FastAPI microservice on Azure Kubernetes Service, delivering 1500 req/s with < 600ms processing",
      "Implemented CI/CD pipelines with GitHub Actions + Terraform + Helm for blue-green deployments",
      "Building feedback loop system with RL agent and MCP servers for internal API integration"
    ],
    icon: React.createElement(Brain),
    date: "January 2025 - Present",
  },
  {
    title: "Software Engineer Intern @ Q2",
    location: "Austin, TX",
    description: [
      "Upgraded adapters within distributed systems using Kessel 2.0 framework",
      "Migrated 45+ financial institutions to latest technology following Agile SDLC",
      "Enhanced Python-based HTTP request handling framework for improved performance"
    ],
    icon: React.createElement(Code2),
    date: "May 2024 - Aug 2024",
  },
  {
    title: "Undergraduate Research Assistant @ UMKC",
    location: "Kansas City, MO",
    description: [
      "Led data science, machine learning and software development initiatives",
      "Worked under Dr. Chen Shyu Ching at the Data Science and Analytics Innovation Center",
      "Conducted research in AI/ML applications and data analytics"
    ],
    icon: React.createElement(Brain),
    date: "Oct 2023 - Jul 2024",
  },
  {
    title: "Software Developer Intern @ DRDO",
    location: "Bangalore, India",
    description: [
      "Developed cross-platform full-stack remote system control and monitoring application",
      "Utilized React Native, Firebase and ESP32 WiFi module for IoT integration",
      "Implemented real-time sensor monitoring with data visualization"
    ],
    icon: React.createElement(Code2),
    date: "May 2023 - Jul 2023",
  },
  {
    title: "Front End Developer Intern @ Supremetech",
    location: "Nagpur, India",
    description: [
      "Developed responsive web applications using modern frontend technologies",
      "Collaborated with development team on various client projects",
      "Gained experience with Angular framework and frontend best practices"
    ],
    icon: React.createElement(Code2),
    date: "Nov 2022 - Jul 2023",
  },
] as const;

export const projectsData = [
  {
    title: "Sign Lingo",
    impact: "Real-time sign language translation with 95% accuracy",
    description: "A web application that can recognize and interpret sign language gestures, providing real-time translation into both text and natural audio.",
    tags: ["React", "Tensorflow.js", "OpenCV", "IBM Cloud"],
    impactTags: ["95% Accuracy", "Real-time Translation", "Accessibility"],
    imageUrl: SignlingoImg,
    demoVideo: "/demos/signlingo.webm",
    caseStudy: {
      problem: "Millions of people with hearing impairments face communication barriers in daily interactions, making it difficult to participate fully in conversations and activities.",
      approach: "Developed a computer vision-based system using TensorFlow.js and OpenCV to capture and analyze hand gestures in real-time, combined with a React frontend for intuitive user interaction.",
      result: "Achieved 95% accuracy in sign language recognition, enabling real-time translation that bridges communication gaps for the deaf and hard-of-hearing community.",
      role: "Full-stack developer, ML engineer, UI/UX designer",
      stack: ["React", "TensorFlow.js", "OpenCV", "IBM Cloud", "WebRTC", "Canvas API"],
      learnings: ["Real-time video processing optimization", "Accessibility-first design principles", "ML model deployment in browsers", "Cross-browser compatibility challenges"],
      links: {
        demo: "https://signlingo-demo.com",
        github: "https://github.com/username/signlingo",
        live: "https://signlingo.app"
      }
    }
  },
  {
    title: "IoT Device Control & Monitoring",
    impact: "Real-time IoT telemetry with 500+ concurrent devices",
    description: "A full stack cross platform mobile application to control electronic devices and realtime sensor monitoring with data visualization.",
    tags: ["React Native", "TypeScript", "Firebase", "ESP32 WiFi Module"],
    impactTags: ["500+ Devices", "Real-time Telemetry", "IoT Platform"],
    imageUrl: rmtdevImg,
    demoVideo: "/demos/iot-control.webm",
    caseStudy: {
      problem: "Industrial facilities needed a centralized system to monitor and control hundreds of IoT devices remotely, with real-time data visualization and alert systems.",
      approach: "Built a React Native mobile app with TypeScript for cross-platform compatibility, integrated with Firebase for real-time data synchronization and ESP32 modules for device communication.",
      result: "Successfully managed 500+ concurrent IoT devices with real-time monitoring, reducing manual intervention by 80% and improving system reliability.",
      role: "Full-stack developer, IoT engineer, Mobile developer",
      stack: ["React Native", "TypeScript", "Firebase", "ESP32", "WebSocket", "Chart.js"],
      learnings: ["IoT device management at scale", "Real-time data synchronization", "Cross-platform mobile development", "Hardware-software integration"],
      links: {
        demo: "https://iot-demo.com",
        github: "https://github.com/username/iot-control",
        live: "https://iot-control.app"
      }
    }
  },
  {
    title: "VR Child Behavior Analysis",
    impact: "AI-powered behavioral insights with 90% prediction accuracy",
    description: "A research project in collaboration with the University of Miami studying child behavior and teaching parents ways to deal with children.",
    tags: ["Unity", "C#", "Hugging Face", "Voice SDK", "NLP"],
    impactTags: ["90% Prediction", "AI Analysis", "Research Platform"],
    imageUrl: VRgameImg,
    demoVideo: "/demos/vr-behavior.webm",
    caseStudy: {
      problem: "Child psychologists needed a controlled environment to study behavioral patterns and develop intervention strategies, requiring both immersive experiences and data collection capabilities.",
      approach: "Created a Unity-based VR environment with AI-powered behavior analysis using Hugging Face models, integrated voice recognition and NLP for comprehensive behavioral assessment.",
      result: "Achieved 90% accuracy in predicting behavioral patterns, providing valuable insights for child psychology research and parent education programs.",
      role: "VR developer, AI engineer, Research collaborator",
      stack: ["Unity", "C#", "Hugging Face", "Voice SDK", "NLP", "VR SDK"],
      learnings: ["VR development for research applications", "AI model integration in games", "Ethical considerations in behavioral research", "Multi-modal data collection"],
      links: {
        demo: "https://vr-behavior-demo.com",
        github: "https://github.com/username/vr-behavior",
        research: "https://research-paper.com"
      }
    }
  },
  {
    title: "Fraud Detection System",
    impact: "95% ROC-AUC with real-time inference < 600ms",
    description: "Built ensemble ML models for fraud detection in financial transactions with real-time processing capabilities.",
    tags: ["Python", "FastAPI", "Azure", "Kubernetes", "ML"],
    impactTags: ["95% ROC-AUC", "Real-time Inference", "1500 req/s"],
    imageUrl: rmtdevImg, // Placeholder - you can add a fraud detection image
    demoVideo: "/demos/fraud-detection.webm",
    caseStudy: {
      problem: "Financial institutions needed a high-performance fraud detection system capable of processing thousands of transactions per second with minimal latency and high accuracy.",
      approach: "Developed ensemble models (Neural Network, Random Forest, XGBoost) with real-time data pipelines using Apache Kafka and deployed on Azure Kubernetes for scalability.",
      result: "Achieved 95% ROC-AUC with real-time inference under 600ms, processing 1500 requests per second while maintaining high accuracy.",
      role: "Data Scientist, ML Engineer, DevOps Engineer",
      stack: ["Python", "FastAPI", "Azure", "Kubernetes", "Apache Kafka", "XGBoost"],
      learnings: ["High-performance ML systems", "Real-time data processing", "Cloud-native ML deployment", "Ensemble model optimization"],
      links: {
        demo: "https://fraud-demo.com",
        github: "https://github.com/username/fraud-detection",
        paper: "https://research-paper.com"
      }
    }
  }
] as const;

export const skillsData = [
  
"Python",
"JavaScript",
"HTML",
"CSS",
"Java",
"C++",
"R",
"TypeScript",
"C#",
"Go",
"iOS/Swift",
"XML",
"MySQL",
"NoSQL",
"Firebase",
"MongoDB",
"SQL",
"Postgres",
"DynamoDB",
"React.js",
"React Native",
"AngularJS",
"Pytorch",
"Scikit Learn",
"Pandas",
"NumPy",
"Keras",
"TensorFlow",
"OpenCV",
"OpenAI API",
".NET",
"Flask",
"Node.js",
"Spring",
"GraphQL",
"PowerBI",
"Tableau",
"Figma",
"Kubernetes",
"MATLAB",
"Unity",
"Git",
"Microsoft Azure",
"Jenkins",
"Nomad",
"Docker",
"NPM",
"Linux/Unix",
"Apache Spark",
"REST APIs",
"Terraform",
"Excel",
"Atlassian",
"Salesforce",
] as const;
