
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

export const achievements = [
  {
    title: "Web Development Intern at Krumos",
    description:
      "Selected for a Web Development Internship at Krumos, working on real-world applications and gaining hands-on experience with modern frontend technologies and API integration.",
    icon: <FaTrophy className="text-yellow-500 text-2xl" />,
  },
  {
    title: "Built Full-Stack Projects",
    description:
      "Developed multiple full-stack applications including an IPO Web App using Django, DRF, PostgreSQL, and React with modern UI and API handling.",
    icon: <FaMedal className="text-blue-500 text-2xl" />,
  },
  {
    title: "Solved 150+ DSA Problems",
    description:
      "Solved over 150+ Data Structures and Algorithms problems, strengthening problem-solving skills and core concepts like arrays, trees, and dynamic programming.",
    icon: <FaAward className="text-green-500 text-2xl" />,
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
        description: `I’m a passionate Web Developer & Software Engineer who loves building clean, efficient, and user-friendly digital solutions. 
            With a strong foundation in Web Development, DSA, and Databases, I enjoy turning ideas into reality through code. 
            My goal is to create impactful applications that solve real-world problems while continuously learning and growing as a developer.`
    },
];

import { FaGlobe, FaRobot, FaDatabase, FaLaptopCode, FaMapMarkedAlt, FaSpa } from "react-icons/fa";

export const projects = [
 {
    title: "IPO Web Application",
    description:
      "Developed a full-stack IPO management platform enabling users to view, track, and manage IPO listings. Implemented secure REST APIs using Django and integrated a responsive React frontend for seamless user experience.",
    icon: <FaGlobe className="text-purple-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Django", "DRF", "PostgreSQL"],
  },
  {
    title: "Disease Diagnostic System",
    description:
      "Built an AI-powered disease prediction system that analyzes symptoms and patient data using machine learning models, helping in early diagnosis and decision support.",
    icon: <FaRobot className="text-green-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
    tech: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
  },
  {
    title: "Chronic Kidney Disease Prediction",
    description:
      "Created a machine learning model for early detection of chronic kidney disease and deployed it using a Streamlit web interface for real-time predictions.",
    icon: <FaDatabase className="text-blue-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/InternshipAICTE",
    tech: ["Python", "Streamlit", "ML"],
  },
  {
    title: "FoodChow Style Website",
    description:
      "Designed and developed a responsive restaurant listing and food ordering UI with dynamic routing, optimized layouts, and modern UI using React and Tailwind.",
    icon: <FaLaptopCode className="text-orange-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat/Frontend-html-css-js",
    tech: ["React", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Tourist Safety Website (Frontend)",
    description:
      "Developed the frontend of a tourist safety platform focusing on user-friendly navigation, emergency features, and responsive design for better accessibility.",
    icon: <FaMapMarkedAlt className="text-red-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Tailwind CSS"],
  },
  {
    title: "Panchakarma Consultation Website (Frontend)",
    description:
      "Built a modern healthcare consultation UI for Panchakarma treatments, enabling users to explore services and connect with doctors digitally.",
    icon: <FaSpa className="text-pink-500 text-3xl" />,
    link: "https://github.com/Singh-Shashvat",
    tech: ["React", "Tailwind CSS"],
  },
];



import { FaExchangeAlt, FaKey, FaPalette } from "react-icons/fa";

export const miniProjects = [
  {
    title: "Currency Converter",
    description:
      "Built a real-time currency converter that allows users to convert between different currencies using live exchange rates and intuitive UI.",
    icon: <FaExchangeAlt className="text-green-500 text-2xl" />,
    tech: ["JavaScript", "API", "React", "CSS"],
  },
  {
    title: "Password Generator",
    description:
      "Developed a secure password generator with customizable length and character options, focusing on usability and randomness.",
    icon: <FaKey className="text-yellow-500 text-2xl" />,
    tech: ["JavaScript", "React"],
  },
  {
    title: "Background Color Changer",
    description:
      "Created an interactive UI tool that dynamically changes background colors, demonstrating DOM manipulation and state handling.",
    icon: <FaPalette className="text-purple-500 text-2xl" />,
    tech: ["JavaScript", "React"],
  },
];

import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaPython, FaGitAlt,  } from "react-icons/fa";
import { SiTailwindcss, SiDjango, SiMysql, SiPostgresql, SiJavascript, SiNextui,SiReactquery } from "react-icons/si";


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
      { name: "ReactQuery", icon: <SiReactquery className="text-emerald-400" /> },
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
export const miniprojectHeading = "My Mini Project's";


export const siteConfig = {
  name: "My-Portfolio-App",
  description: "A proactive fresher with a keen interest in full-stack development, eager to learn, contribute, and grow with a dynamic team.",
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