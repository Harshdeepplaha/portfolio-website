import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaAngular, FaPython, FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
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
    title: "Software Engineer Intern @ Q2",
    location: "Austin, TX",
    description:
      "Upgraded adapters within distributed systems, built using Kessel, Q2's proprietary Python-based http request handling framework to kessel 2.0, moving more than 45 financial institutions to the latest technology, following Agile SDLC.",
    icon: React.createElement(FaPython),
    date: "May 2024 - Aug 2024",
  },
  {
    title: "Undergradute Research Assistant @ UMKC",
    location: "Kansas City, MO",
    description:
      "worked as a Research assistant under Dr chen shyu ching at the Data Science and Analytics Inovation center in UMKC leading data science, machine learning and software development initiatives for the group.",
    icon: React.createElement(GiArtificialIntelligence),
    date: "Oct 2023 - Jul 2024",
  },
  {
    title: "Software Developer Intern @ DRDO",
    location: "Banglore, India",
    description:
      "Develpoed a cross platform full stack remote system control and monitering application for the facility using React Native, firebase and ESP 32 wifi module. " ,
    icon: React.createElement(FaReact),
    date: "May 2023 - Jul 2023",
  },
  {
    title: "Front End Developer Intern @ Supremetech",
    location: "Nagpur, India",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaAngular),
    date: "Nov 2022 - Jul 2023",
  },
] as const;

export const projectsData = [
  {
    title: "Sign Lingo",
    description:
      "A web application that can recognize and interpret sign language gestures, providing real-time translation into both text and natural audio.",
    tags: ["React", "Tensorflow.js", "OpenCV", "IBM Cloud"],
    imageUrl: SignlingoImg ,
  },
  {
    title: "Device control and monitering",
    description:
      "A full stack cross platform mobile application to control electronic devices and realtime sensor monitering with data visualization.",
    tags: ["React Native ", "TypeScript", "Firebase", "ESP 32 Wifi Module"],
    imageUrl: rmtdevImg,
  },
  {
    title: "VR Game for child behavior analysis",
    description:
      "A research project in collaboratin with the University of Miami studying child behaviour and teaching parents way to deal with children.",
    tags: ["Unity", "C#", "Hugging Face", "Voice SDK", "NLP"],
    imageUrl: VRgameImg,
  },
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
