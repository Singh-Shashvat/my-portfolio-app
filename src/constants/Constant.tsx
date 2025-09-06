
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
export const achievements = [
  {
    title: "Hackathon Winner",
    description: "Won 1st place at Navonmesh 2.0 Hackathon for developing an AI-powered disease diagnostic system.",
    icon: <FaTrophy className="text-yellow-500 text-2xl" />,
  },
  {
    title: "Open Source Contributor",
    description: "Contributed to multiple open-source projects on GitHub and collaborated with developers worldwide.",
    icon: <FaMedal className="text-blue-500 text-2xl" />,
  },
  {
    title: "Techfest Finalist",
    description: "Selected as finalist at IIT Bombay Techfest for creating sustainable supply chain optimization solutions.",
    icon: <FaAward className="text-green-500 text-2xl" />,
  },
];




export const experiences = [
  {
    role: "Frontend Developer Intern",
    description:
      "Worked under Omkar Deota for a real-world project where I used React, Tailwind CSS, and HeroUI, and gained hands-on experience in frontend development.",
    technologies: ["React", "TailwindCSS", "HeroUI"],
    duration: "3 Months",
  },
  {
    role: "Fullstack Developer (Freelance Project)",
    description:
      "Developed a responsive multi-page web application for a local business, integrating a Django backend with PostgreSQL and a modern React-based frontend.",
    technologies: ["Django", "PostgreSQL", "React", "Bootstrap"],
    duration: "2 Months",
  },
  {
    role: "Open Source Contributor",
    description:
      "Contributed to open-source projects by fixing bugs, improving documentation, and adding new features, gaining collaboration and version control experience.",
    technologies: ["Git", "GitHub", "Markdown"],
    duration: "Ongoing",
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
        salutation: "Hi, I’m Shashvat 👋",
        position: " Fullstack Developer",
        description: `I’m a passionate Web Developer & Software Engineer who loves building clean, efficient, and user-friendly digital solutions. 
            With a strong foundation in Web Development, DSA, and Databases, I enjoy turning ideas into reality through code. 
            My goal is to create impactful applications that solve real-world problems while continuously learning and growing as a developer.`
    },
];

import { FaDatabase, FaRobot, FaGlobe, FaLaptopCode } from "react-icons/fa";




export const projects  = [
  {
    title: "IPO Web Application",
    description:
      "A full-stack IPO management system built with Django, DRF, PostgreSQL, and a modern React frontend.",
    icon: <FaGlobe className="text-purple-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat",
  },
  {
    title: "Disease Diagnostic System",
    description:
      "An AI-powered platform for predicting diseases using symptoms and patient history with ML models.",
    icon: <FaRobot className="text-green-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
  },
  {
    title: "Chronic Kidney Disease Prediction",
    description:
      "Machine learning model for CKD detection, integrated with a Python-based Streamlit app.",
    icon: <FaDatabase className="text-blue-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
  },
  {
    title: "FoodChow Style Website",
    description:
      "A responsive multi-page restaurant listing and ordering site built with React, Tailwind, and routing.",
    icon: <FaLaptopCode className="text-orange-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/Frontend-html-css-js",
  },
];

import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaPython, FaGitAlt,  } from "react-icons/fa";
import { SiTailwindcss, SiDjango, SiMysql, SiPostgresql, SiJavascript, SiNextui } from "react-icons/si";


export const technologies = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", icon: <FaHtml5 className="text-orange-600" /> },
      { name: "CSS", icon: <FaCss3Alt className="text-blue-600" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" /> },
      { name: "React.js", icon: <FaReact className="text-sky-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "Bootstrap", icon: <FaBootstrap className="text-purple-600" /> },
      { name: "Hero-UI", icon: <SiNextui className="text-pink-500" /> },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Django", icon: <SiDjango className="text-green-800" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
      { name: "REST APIs", icon: <FaDatabase className="text-gray-500" /> }, 
    ],
  },
  {
    title: "Database",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-700" /> },
      { name: "MySQL", icon: <SiMysql className="text-orange-500" /> },
    ],
  },
  {
    title: "Version Control",
    items: [{ name: "Git & GitHub", icon: <FaGitAlt className="text-red-600" /> }],
  },
  {
    title: "Programming",
    items: [
      { name: "C", icon: <FaDatabase className="text-gray-500" /> }, 
      { name: "C++", icon: <FaDatabase className="text-blue-500" /> }, 
      { name: "Python", icon: <FaPython className="text-yellow-500" /> },
    ],
  },
];


export const footerdata = [
  {type:"gmail",
    value:"shashvatsingh124@gmail.com"
  },
  {
    type:"MobNo",
    value:"7646907236"
  },
  {
    type:"Address",
    value:"Raipur, Chhattisgadh"
  }
]

export const techHeading ="Technologies";

export const techIntro = "Here are the technologies I use to bring ideas to life. From frontend frameworks to backend tools and databases, I enjoy experimenting with different stacks and continuously improving my skills in both development and Data Structures & Algorithms (DSA) to stay updated with the fast-moving tech world."

export const projectHeading = "My Project";


export const siteConfig = {
  name: "Vite + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
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
    }
  ],
  
 
};