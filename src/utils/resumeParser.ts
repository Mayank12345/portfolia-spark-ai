
// Simple resume parser - in a real application, you'd use a more sophisticated parser
// or a service like Resume Parser API to extract structured data from PDF/DOC files

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

// This is a simplified parser that generates realistic data
// In production, you would integrate with a PDF parsing library or service
export const parseResumeFromFile = async (file: File): Promise<ParsedResume> => {
  // For demonstration, we'll create different profiles based on file name patterns
  // In production, you'd parse the actual file content
  
  const fileName = file.name.toLowerCase();
  
  // Generate varied sample data based on file characteristics
  const profiles = [
    {
      name: "Sarah Johnson",
      title: "Frontend Developer",
      summary: "Passionate frontend developer with 3+ years of experience creating responsive web applications using React, TypeScript, and modern CSS frameworks. Strong focus on user experience and performance optimization.",
      skills: [
        "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS",
        "Next.js", "Redux", "Git", "Figma", "Responsive Design", "Performance Optimization"
      ],
      experience: [
        {
          company: "Tech Innovations Inc.",
          role: "Frontend Developer",
          years: "2022 - Present",
          details: "Developed and maintained responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components. Improved application performance by 35% through code optimization."
        },
        {
          company: "Digital Solutions Co.",
          role: "Junior Web Developer",
          years: "2021 - 2022",
          details: "Built interactive user interfaces for client projects. Worked with cross-functional teams to deliver projects on time. Gained experience in modern JavaScript frameworks and agile development practices."
        }
      ],
      projects: [
        {
          name: "E-commerce Dashboard",
          url: "https://github.com/sarah/ecommerce-dashboard",
          description: "React-based admin dashboard for managing online store inventory, orders, and analytics with real-time data visualization."
        },
        {
          name: "Weather App",
          url: "https://github.com/sarah/weather-app",
          description: "Progressive Web App built with React and OpenWeather API, featuring geolocation, forecasts, and offline functionality."
        },
        {
          name: "Portfolio Website",
          url: "https://sarahjohnson.dev",
          description: "Personal portfolio showcasing projects and skills, built with Next.js and deployed on Vercel with perfect Lighthouse scores."
        }
      ],
      contactLinks: [
        { type: "Email", url: "mailto:sarah.johnson@example.com" },
        { type: "LinkedIn", url: "https://linkedin.com/in/sarah-johnson-dev" },
        { type: "GitHub", url: "https://github.com/sarah" },
        { type: "Portfolio", url: "https://sarahjohnson.dev" }
      ]
    },
    {
      name: "Michael Chen",
      title: "Full Stack Engineer",
      summary: "Experienced full-stack engineer with 5+ years developing scalable web applications. Expertise in Node.js, React, and cloud technologies. Led multiple teams and delivered high-impact projects.",
      skills: [
        "Node.js", "React", "TypeScript", "Python", "PostgreSQL", "MongoDB",
        "AWS", "Docker", "Kubernetes", "GraphQL", "REST APIs", "Microservices"
      ],
      experience: [
        {
          company: "CloudTech Solutions",
          role: "Senior Full Stack Engineer",
          years: "2020 - Present",
          details: "Led development of microservices architecture serving 1M+ users. Mentored junior developers and established coding standards. Reduced deployment time by 60% through CI/CD pipeline improvements."
        },
        {
          company: "StartupXYZ",
          role: "Full Stack Developer",
          years: "2019 - 2020",
          details: "Built complete web applications from concept to deployment. Worked closely with product team to define requirements and user stories. Implemented real-time features using WebSockets."
        }
      ],
      projects: [
        {
          name: "Microservices Platform",
          url: "https://github.com/mchen/microservices-platform",
          description: "Scalable microservices architecture with Docker, Kubernetes, and automated deployment pipelines handling millions of requests."
        },
        {
          name: "Real-time Chat Application",
          url: "https://github.com/mchen/realtime-chat",
          description: "Full-stack chat application with WebSocket connections, user authentication, and message persistence using Node.js and React."
        }
      ],
      contactLinks: [
        { type: "Email", url: "mailto:michael.chen@example.com" },
        { type: "LinkedIn", url: "https://linkedin.com/in/michael-chen-engineer" },
        { type: "GitHub", url: "https://github.com/mchen" }
      ]
    }
  ];

  // Simple logic to return different profiles based on file characteristics
  const profileIndex = fileName.includes('sarah') || fileName.includes('frontend') ? 0 : 
                      Math.floor(Math.random() * profiles.length);
  
  // Simulate parsing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return profiles[profileIndex];
};

// Fallback data if parsing fails
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
