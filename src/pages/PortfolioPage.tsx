
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Portfolio {
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
}

const PortfolioPage = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // Check if resume exists for this user
        const { data } = await supabase
          .storage
          .from('resumes')
          .list(userId, { sortBy: { column: 'created_at', order: 'desc' }, limit: 1 });

        if (data && data.length > 0) {
          // Mock parse the resume - for now we'll use placeholder data
          const mockPortfolio: Portfolio = {
            name: "John Doe",
            title: "Senior Software Engineer",
            summary: "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable web applications and leading cross-functional teams to deliver high-quality solutions.",
            skills: [
              "JavaScript", "TypeScript", "React", "Node.js", "Python", 
              "AWS", "Docker", "PostgreSQL", "Git", "Agile"
            ],
            experience: [
              {
                company: "Tech Solutions Inc.",
                role: "Senior Software Engineer",
                years: "2021 - Present",
                details: "Led development of microservices architecture serving 100k+ users. Mentored junior developers and improved deployment efficiency by 40%."
              },
              {
                company: "StartupXYZ",
                role: "Full Stack Developer",
                years: "2019 - 2021",
                details: "Built responsive web applications using React and Node.js. Collaborated with design team to implement pixel-perfect UI components."
              },
              {
                company: "Digital Agency",
                role: "Frontend Developer",
                years: "2018 - 2019",
                details: "Developed customer-facing websites for various clients. Optimized performance and implemented responsive design principles."
              }
            ],
            projects: [
              {
                name: "E-commerce Platform",
                url: "https://github.com/johndoe/ecommerce",
                description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics."
              },
              {
                name: "Task Management App",
                url: "https://github.com/johndoe/taskmanager",
                description: "React-based productivity app with drag-and-drop functionality and team collaboration features."
              },
              {
                name: "Data Visualization Dashboard",
                url: "https://github.com/johndoe/dashboard",
                description: "Interactive dashboard using D3.js and React for visualizing complex datasets and KPIs."
              },
              {
                name: "Mobile Weather App",
                url: "https://github.com/johndoe/weather",
                description: "Cross-platform mobile app built with React Native providing real-time weather updates and forecasts."
              }
            ],
            contactLinks: [
              {
                type: "Email",
                url: "mailto:john.doe@example.com"
              },
              {
                type: "LinkedIn",
                url: "https://linkedin.com/in/johndoe"
              },
              {
                type: "GitHub",
                url: "https://github.com/johndoe"
              },
              {
                type: "Portfolio Website",
                url: "https://johndoe.dev"
              }
            ]
          };
          setPortfolio(mockPortfolio);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading portfolio...</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Portfolio not found</p>
          <Button asChild variant="outline">
            <Link to="/login">← Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-10">
      {/* Back button */}
      <Button asChild variant="outline">
        <Link to="/login">← Back to Dashboard</Link>
      </Button>

      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">{portfolio.name}</h1>
        <h2 className="text-xl text-muted-foreground">{portfolio.title}</h2>
        <p className="leading-7">{portfolio.summary}</p>
      </header>

      {/* Skills */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {portfolio.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="mr-2 mb-2">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Experience</h3>
        <div className="flex flex-col gap-4">
          {portfolio.experience.map(exp => (
            <Card key={exp.company + exp.role} className="shadow">
              <CardHeader>
                <CardTitle>{exp.role} @ {exp.company}</CardTitle>
                <CardDescription>{exp.years}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{exp.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Projects</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.projects.map(project => (
            <Card key={project.name} className="shadow">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {project.url}
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Contact</h3>
        <ul className="space-y-2">
          {portfolio.contactLinks.map(link => (
            <li key={link.type}>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                {link.type}: {link.url}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PortfolioPage;
