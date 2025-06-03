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
  
  // Return empty string to indicate parsing is not yet implemented
  console.log('PDF text extraction not yet implemented for file:', fileName);
  return '';
};

export const parseResumeFromFile = async (file: File): Promise<ParsedResume | null> => {
  try {
    // Extract text from the file
    const resumeText = await extractTextFromPDF(file);
    
    if (!resumeText) {
      console.log('No text extracted from file, skipping parsing');
      return null;
    }
    
    // Call our edge function to parse the resume
    const { data, error } = await supabase.functions.invoke('parse-resume', {
      body: { resumeText }
    });

    if (error) {
      console.error('Error calling parse-resume function:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error parsing resume:', error);
    return null;
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
