import React from "react";
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaGlobe,
  FaRobot,
  FaDatabase,
  FaLaptopCode,
  FaMapMarkedAlt,
  FaSpa,
  FaExchangeAlt,
  FaKey,
  FaPalette,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaJava,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiDjango,
  SiMysql,
  SiPostgresql,
  SiJavascript,
  SiHeroui,
  SiReactquery,
  SiNestjs,
  SiJsonwebtokens,
  SiSocketdotio,
  SiMongodb,
  SiNeon,
  SiC,
  SiCplusplus
} from "react-icons/si";
import { TbBrandReactNative, TbApi } from "react-icons/tb";

export const achievements = [
  {
    title: "Web Development Intern at Krumos",
    description:
      "Selected for a Web Development Internship at Krumos, working on real-world applications and gaining hands-on experience with modern frontend technologies and API integration.",
    icon: React.createElement(FaTrophy, { className: "text-yellow-500 text-2xl" }),
  },
  {
    title: "Built Full-Stack Projects",
    description:
      "Developed multiple full-stack applications including an IPO Web App using Django, DRF, PostgreSQL, and React with modern UI and API handling.",
    icon: React.createElement(FaMedal, { className: "text-blue-500 text-2xl" }),
  },
  {
    title: "Solved 150+ DSA Problems",
    description:
      "Solved over 150+ Data Structures and Algorithms problems, strengthening problem-solving skills and core concepts like arrays, trees, and dynamic programming.",
    icon: React.createElement(FaAward, { className: "text-green-500 text-2xl" }),
  },
];

export const experiences = [
  {
    role: "Web Development Intern at Krumos",
    description:
      "Selected as a Web Development Intern at Krumos, where I worked on building and optimizing modern web applications using React and backend technologies, gaining hands-on industry experience.",
    technologies: ["React", "JavaScript", "APIs", "Frontend Development"],
    duration: "Ongoing",
  },
  {
    role: "DSA Problem Solving",
    description:
      "Solved 150+ Data Structures and Algorithms problems, strengthening problem-solving skills and understanding of core concepts like arrays, trees, and dynamic programming.",
    technologies: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
    duration: "Ongoing",
  },
  {
    role: "Frontend Developer Intern",
    description:
      "Worked under Omkar Deota for a real-world project where I used React, Tailwind CSS, and HeroUI, and gained hands-on experience in frontend development.",
    technologies: ["React", "TailwindCSS", "HeroUI"],
    duration: "3 Months",
  },
  {
    role: "Backend Developer (Personal Project)",
    description:
      "Built a REST API for an IPO Web Application project using Django REST Framework and PostgreSQL, focusing on API design, authentication, and database optimization.",
    technologies: ["Django REST Framework", "PostgreSQL", "JWT"],
    duration: "1.5 Months",
  },
];

export const Introductiondata = [
  {
    salutation: "Hello sir",
    position: "I’m Shashvat Fullstack Developer",
    description: `I’m a passionate Fullstack Web Developer & Software Engineer dedicated to crafting clean, efficient, scalable, and user-centric digital experiences. 
With a strong foundation in modern frontend technologies, robust backend architectures, databases, and Data Structures & Algorithms (DSA), I enjoy turning ambitious ideas into seamless reality through reliable code. 
Whether developing full-stack web platforms, designing intuitive interfaces, or building optimized REST APIs, my goal is to create impactful applications that solve real-world problems while continuously evolving and growing as an engineer.`,
  },
];

export const projects = [
  {
    title: "Project Management Application",
    description:
      "A full-featured project and task management web application designed for seamless team collaboration, workflow tracking, interactive Kanban boards, and milestone management with responsive UI.",
    icon: React.createElement(FaLaptopCode, { className: "text-cyan-400 text-3xl" }),
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "IPO Web Application",
    description:
      "Developed a full-stack IPO management platform enabling users to view, track, and manage IPO listings. Implemented secure REST APIs using Django and integrated a responsive React frontend for seamless user experience.",
    icon: React.createElement(FaGlobe, { className: "text-purple-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Django", "DRF", "PostgreSQL"],
  },
  {
    title: "Disease Diagnostic System",
    description:
      "Built an AI-powered disease prediction system that analyzes symptoms and patient data using machine learning models, helping in early diagnosis and decision support.",
    icon: React.createElement(FaRobot, { className: "text-green-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
    tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
  },
  {
    title: "Chronic Kidney Disease Prediction",
    description:
      "Created a machine learning model for early detection of chronic kidney disease and deployed it using a Streamlit web interface for real-time predictions.",
    icon: React.createElement(FaDatabase, { className: "text-blue-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
    tech: ["Python", "Streamlit", "ML"],
  },
  {
    title: "FoodChow Style Website",
    description:
      "Designed and developed a responsive restaurant listing and food ordering UI with dynamic routing, optimized layouts, and modern UI using React and Tailwind.",
    icon: React.createElement(FaLaptopCode, { className: "text-orange-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat/Frontend-html-css-js",
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Tourist Safety Website (Frontend)",
    description:
      "Developed the frontend of a tourist safety platform focusing on user-friendly navigation, emergency features, and responsive design for better accessibility.",
    icon: React.createElement(FaMapMarkedAlt, { className: "text-red-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Tailwind CSS"],
  },
  {
    title: "Panchakarma Consultation Website (Frontend)",
    description:
      "Built a modern healthcare consultation UI for Panchakarma treatments, enabling users to explore services and connect with doctors digitally.",
    icon: React.createElement(FaSpa, { className: "text-pink-500 text-3xl" }),
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Tailwind CSS"],
  },
];

export const miniProjects = [
  {
    title: "Currency Converter",
    description:
      "Built a real-time currency converter that allows users to convert between different currencies using live exchange rates and intuitive UI.",
    icon: React.createElement(FaExchangeAlt, { className: "text-green-500 text-2xl" }),
    tech: ["JavaScript", "API", "React", "CSS"],
  },
  {
    title: "Password Generator",
    description:
      "Developed a secure password generator with customizable length and character options, focusing on usability and randomness.",
    icon: React.createElement(FaKey, { className: "text-yellow-500 text-2xl" }),
    tech: ["JavaScript", "React"],
  },
  {
    title: "Background Color Changer",
    description:
      "Created an interactive UI tool that dynamically changes background colors, demonstrating DOM manipulation and state handling.",
    icon: React.createElement(FaPalette, { className: "text-purple-500 text-2xl" }),
    tech: ["JavaScript", "React"],
  },
];

export const technologies = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: React.createElement(FaHtml5, { className: "text-orange-600" }) },
      { name: "CSS", icon: React.createElement(FaCss3Alt, { className: "text-blue-600" }) },
      {
        name: "JavaScript",
        icon: React.createElement(SiJavascript, { className: "text-yellow-500" }),
      },
      { name: "React.js", icon: React.createElement(FaReact, { className: "text-sky-500" }) },
      {
        name: "React Native",
        icon: React.createElement(TbBrandReactNative, { className: "text-cyan-400" }),
      },
      {
        name: "Tailwind CSS",
        icon: React.createElement(SiTailwindcss, { className: "text-cyan-500" }),
      },
      { name: "Bootstrap", icon: React.createElement(FaBootstrap, { className: "text-purple-600" }) },
      { name: "Hero-UI", icon: React.createElement(SiHeroui, { className: "text-pink-500" }) },
      {
        name: "ReactQuery",
        icon: React.createElement(SiReactquery, { className: "text-emerald-400" }),
      },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Django", icon: React.createElement(SiDjango, { className: "text-green-800" }) },
      { name: "Nest.js", icon: React.createElement(SiNestjs, { className: "text-red-500" }) },
      { name: "Node.js", icon: React.createElement(FaNodeJs, { className: "text-green-600" }) },
      { name: "JWT", icon: React.createElement(SiJsonwebtokens, { className: "text-pink-500" }) },
      { name: "Socket.io", icon: React.createElement(SiSocketdotio, { className: "text-white" }) },
      { name: "REST APIs", icon: React.createElement(TbApi, { className: "text-purple-500" }) },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", icon: React.createElement(SiPostgresql, { className: "text-sky-700" }) },
      { name: "MySQL", icon: React.createElement(SiMysql, { className: "text-orange-500" }) },
      { name: "MongoDB", icon: React.createElement(SiMongodb, { className: "text-green-500" }) },
      { name: "NeonDB", icon: React.createElement(SiNeon, { className: "text-green-500" }) },
    ],
  },
  {
    title: "Version Control",
    items: [
      { name: "Git & GitHub", icon: React.createElement(FaGitAlt, { className: "text-red-600" }) },
    ],
  },
  {
    title: "Programming",
    items: [
      { name: "C", icon: React.createElement(SiC, { className: "text-blue-500" }) },
      { name: "C++", icon: React.createElement(SiCplusplus, { className: "text-blue-500" }) },
      { name: "Java", icon: React.createElement(FaJava, { className: "text-red-500" }) },
      { name: "Python", icon: React.createElement(FaPython, { className: "text-yellow-500" }) },
    ],
  },
];

export const footerdata = [
  { type: "gmail", value: "shashvatsingh124@gmail.com" },
  {
    type: "MobNo",
    value: "7646907236",
  },
  {
    type: "Address",
    value: "Raipur, Chhattisgadh",
  },
];

export const techHeading = "Technologies";

export const techIntro =
  "Here are the technologies I use to bring ideas to life. From frontend frameworks to backend tools and databases, I enjoy experimenting with different stacks and continuously improving my skills in both development and Data Structures & Algorithms (DSA) to stay updated with the fast-moving tech world.";

export const projectHeading = "My Projects";
export const miniprojectHeading = "My Mini Projects";

export const siteConfig = {
  name: "My-Portfolio-App",
  description:
    "A proactive fresher with a keen interest in full-stack development, eager to learn, contribute, and grow with a dynamic team.",
  navItems: [
    {
      label: "Introduction",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
};
