import { supabase } from "@/integrations/supabase/client";

export interface ParsedResume {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    years: string;
    details: string;
  }>;
  projects: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  contactLinks: Array<{
    type: string;
    url: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

// Extract text content from PDF using a simple approach
const extractTextFromPDF = async (file: File): Promise<string> => {
  // For now, we'll use a placeholder approach
  // In a real implementation, you'd use a PDF parsing library
  const fileName = file.name.toLowerCase();
  
  // Generate sample text based on file name for demonstration
  if (fileName.includes('sarah') || fileName.includes('frontend')) {
    return `
    Sarah Johnson
    Frontend Developer
    
    Professional Summary:
    Passionate frontend developer with 3+ years of experience creating responsive web applications using React, TypeScript, and modern CSS frameworks.
    
    Skills:
    React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js, Redux, Git, Figma
    
    Experience:
    Frontend Developer at Tech Innovations Inc. (2022 - Present)
    - Developed responsive web applications using React and TypeScript
    - Improved application performance by 35%
    
    Junior Web Developer at Digital Solutions Co. (2021 - 2022)
    - Built interactive user interfaces for client projects
    
    Projects:
    E-commerce Dashboard - React-based admin dashboard
    Weather App - Progressive Web App with React
    
    Contact:
    Email: sarah.johnson@example.com
    LinkedIn: linkedin.com/in/sarah-johnson-dev
    GitHub: github.com/sarah
    `;
  }
  
  return `
  Michael Chen
  Full Stack Engineer
  
  Professional Summary:
  Experienced full-stack engineer with 5+ years developing scalable web applications. Expertise in Node.js, React, and cloud technologies.
  
  Skills:
  Node.js, React, TypeScript, Python, PostgreSQL, MongoDB, AWS, Docker, Kubernetes
  
  Experience:
  Senior Full Stack Engineer at CloudTech Solutions (2020 - Present)
  - Led development of microservices architecture serving 1M+ users
  - Reduced deployment time by 60%
  
  Projects:
  Microservices Platform - Scalable architecture with Docker and Kubernetes
  Real-time Chat Application - WebSocket connections with Node.js
  
  Contact:
  Email: michael.chen@example.com
  LinkedIn: linkedin.com/in/michael-chen-engineer
  GitHub: github.com/mchen
  `;
};

export const parseResumeFromFile = async (file: File): Promise<ParsedResume> => {
  try {
    // Extract text from the file
    const resumeText = await extractTextFromPDF(file);
    
    // Call our edge function to parse the resume
    const { data, error } = await supabase.functions.invoke('parse-resume', {
      body: { resumeText }
    });

    if (error) {
      console.error('Error calling parse-resume function:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error parsing resume:', error);
    return getDefaultResumeData();
  }
};

export const getDefaultResumeData = (): ParsedResume => ({
  name: "Professional User",
  title: "Software Developer",
  summary: "Dedicated software developer with experience in modern web technologies and a passion for creating efficient, user-friendly applications.",
  skills: [
    "JavaScript", "React", "Node.js", "HTML5", "CSS3", "Git",
    "Problem Solving", "Team Collaboration", "Agile Development"
  ],
  experience: [
    {
      company: "Technology Company",
      role: "Software Developer",
      years: "2022 - Present",
      details: "Developed web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality software solutions."
    }
  ],
  projects: [
    {
      name: "Web Application",
      url: "https://github.com/user/web-app",
      description: "Full-stack web application built with modern technologies and best practices."
    }
  ],
  contactLinks: [
    { type: "Email", url: "mailto:user@example.com" },
    { type: "LinkedIn", url: "https://linkedin.com/in/user" },
    { type: "GitHub", url: "https://github.com/user" }
  ]
});
