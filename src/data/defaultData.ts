import { ProfileData, AboutData, SkillCategory, TimelineItem, Project, ContactInfo, CollaborationData, PortfolioData } from '../types';

export const defaultProfile: ProfileData = {
    name: "Srinivasu Kadiyam",
    nickname: "Srinu",
    roles: ["Entrepreneur", "Tech Enthusiast", "Innovator"],
    quote: "Help Millions, To make Millions",
    profileImage: "https://i.postimg.cc/kgGdy3bD/Srinu.png"
};

export const defaultAbout: AboutData = {
    bio: "I am a passionate entrepreneur and tech enthusiast, dedicated to creating impactful solutions. Through my startup and VR projects, I aim to revolutionize agriculture and education. My journey is driven by innovation and accessibility.",
    image: "/b.png"
};

export const defaultSkills: SkillCategory[] = [
    {
        id: "programming",
        name: "Programming",
        icon: "Code",
        skills: [
            { name: "C", level: 91 },
            { name: "Python", level: 95 },
            { name: "HTML & CSS", level: 92 },
            { name: "JavaScript", level: 80 },
            { name: "C#", level: 40 }
        ]
    },
    {
        id: "software-tools",
        name: "Software Tools",
        icon: "Monitor",
        skills: [
            { name: "Git", level: 85 },
            { name: "Unity", level: 75 },
            { name: "VS Code", level: 90 },
            { name: "Postman", level: 80 }
        ]
    },
    {
        id: "frameworks",
        name: "Frameworks & Libraries",
        icon: "Box",
        skills: [
            { name: "React", level: 68 },
            { name: "Node.js", level: 72 },
            { name: "Flask", level: 48 }
        ]
    },
    {
        id: "entrepreneurial",
        name: "Entrepreneurial Skills",
        icon: "Lightbulb",
        skills: [
            { name: "Business Strategy", level: 55 },
            { name: "Market Analysis", level: 60 },
            { name: "Funding", level: 45 },
            { name: "Team Leadership", level: 90 }
        ]
    }
];

export const defaultTimeline: TimelineItem[] = [
    {
        id: "school",
        date: "2020",
        title: "10th Grade - Infant Jesus School",
        shortDescription: "Secured 10/10 GPA in SSC (Corona Batch).",
        fullDescription: "Completed 10th grade at Infant Jesus English Medium High School with a perfect 10/10 GPA, adapting to online learning challenges during the pandemic.",
        icon: "School"
    },
    {
        id: "intermediate",
        date: "2022",
        title: "12th Grade - Narayana Junior College",
        shortDescription: "Scored 82% in Intermediate, EPCET Rank - 111072.",
        fullDescription: "Completed Intermediate at Narayana Junior College, focusing on science and engineering subjects, securing 82% and an EPCET Rank of 111072.",
        icon: "BookOpen"
    },
    {
        id: "engineering",
        date: "2023-Present",
        title: "Engineering - SITE",
        shortDescription: "Currently pursuing Engineering at Sasi Institute.",
        fullDescription: "Enrolled in the Engineering program at Sasi Institute of Technology and Engineering, gaining hands-on experience in research and real-world projects.",
        icon: "GraduationCap"
    },
    {
        id: "vr-project",
        date: "2024",
        title: "VR Educational Platform",
        shortDescription: "Developing a VR-based education project.",
        fullDescription: "Taking forward an SIH project as a personal initiative to create a VR-based educational platform, making learning more immersive.",
        icon: "Glasses"
    },
    {
        id: "sih",
        date: "2024",
        title: "Smart India Hackathon",
        shortDescription: "Participated in SIH, cleared two rounds.",
        fullDescription: "Competed in Smart India Hackathon (SIH), successfully clearing two rounds while working on an innovative solution.",
        icon: "Award"
    },
    {
        id: "weather-research",
        date: "2025",
        title: "Weather Satellite Research",
        shortDescription: "Processing image data for satellite research.",
        fullDescription: "Working as a researcher in the R&D department of ECT, focusing on processing satellite image data for weather prediction systems.",
        icon: "Satellite"
    },
    {
        id: "startup",
        date: "2025",
        title: "Startup - Naandhi Tech",
        shortDescription: "Building a tech-driven platform for farmers.",
        fullDescription: "Founded Naandhi Tech, a startup dedicated to supporting farmers by providing innovative tech solutions for agriculture.",
        icon: "Rocket"
    },
    {
        id: "youtube",
        date: "2025",
        title: "YouTube - Srinu Bytes",
        shortDescription: "Started Srinu Bytes for tech & VR content.",
        fullDescription: "Launched Srinu Bytes YouTube channel to share insights on VR development, tech innovations, and startup experiences.",
        icon: "Youtube"
    }
];

export const defaultProjects: Project[] = [
    {
        id: "vr-education",
        title: "VR Educational Project",
        tagline: "Immersive Learning Experience",
        description: "I have consistently worked on VR-based educational projects, focusing on making learning immersive and interactive. My goal has been to leverage VR technology to simplify complex concepts, especially in STEM education. From developing 3D models and simulations to integrating backend communication for VR labs, I have explored various ways to make education more engaging and accessible.",
        icon: "Globe",
        technologies: ["Unity", "Unreal Engine", "Vuforia", "ARCore"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "farm-service",
        title: "Farm Service Platform",
        tagline: "My Startup",
        description: "I am actively working on my startup, Farm Service Platform, which aims to help farmers access essential services efficiently. The platform enables farmers to rent equipment, hire labor, and access services like drone fertilization, harvesting, and organic crop solutions through a WhatsApp bot, mobile app, and toll-free number. The WhatsApp bot is fully functional, and I am currently developing the mobile app while working on real-time service tracking.",
        icon: "Leaf",
        technologies: ["React Native", "WhatsApp API", "Node.js", "Real-time Tracking"],
        githubUrl: "",
        demoUrl: ""
    },
    {
        id: "weather-prediction",
        title: "Weather Prediction System",
        tagline: "AI-Powered Forecasting",
        description: "I worked on a Weather Prediction System that used satellite images, radar data, and AI analysis to provide accurate, real-time weather forecasts. The system was designed to predict rainfall with precise timing, benefiting agriculture and institutional weather reporting. I used Python, OpenWeather API, and data from MOSDAC and MAUSAM IMD to process satellite imagery and radar inputs.",
        icon: "Cloud",
        technologies: ["Python", "OpenWeather API", "MOSDAC", "MAUSAM IMD"],
        githubUrl: "",
        demoUrl: ""
    }
];

export const defaultContact: ContactInfo = {
    email: "srinu18yt@gmail.com",
    github: "https://github.com/CodeSrinu",
    linkedin: "",
    youtube: "",
    twitter: ""
};

export const defaultCollaboration: CollaborationData = {
    title: "Let's Collaborate",
    description: "Exciting opportunity to work on my VR Educational Project and startup! I'm looking for individuals with expertise in UI/UX, 3D modeling, VR Unity, and ECE subjects to create impactful educational solutions and scale my Farm Service Platform.",
    buttonText: "Collaborate Now",
    buttonLink: "#contact",
    icon: "Users",
    visible: true
};

export const defaultPortfolioData: PortfolioData = {
    profile: defaultProfile,
    about: defaultAbout,
    skills: defaultSkills,
    timeline: defaultTimeline,
    projects: defaultProjects,
    contact: defaultContact,
    collaboration: defaultCollaboration,
    customSections: []
};
