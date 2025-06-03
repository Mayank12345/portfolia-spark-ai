
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { parseResumeFromFile, getDefaultResumeData, type ParsedResume } from "@/utils/resumeParser";
import { ArrowLeft, Mail, ExternalLink, MapPin } from "lucide-react";

const PortfolioPage = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        if (!userId) {
          setLoading(false);
          return;
        }

        // Get the latest resume file for this session
        const { data: files } = await supabase
          .storage
          .from('resumes')
          .list(userId, { sortBy: { column: 'created_at', order: 'desc' }, limit: 1 });

        if (files && files.length > 0) {
          const fileName = files[0].name;
          
          // Download the file to parse it
          const { data: fileData } = await supabase
            .storage
            .from('resumes')
            .download(`${userId}/${fileName}`);

          if (fileData) {
            // Create a File object for parsing
            const file = new File([fileData], fileName, { type: 'application/pdf' });
            
            try {
              const parsedData = await parseResumeFromFile(file);
              setPortfolio(parsedData);
            } catch (error) {
              console.error("Error parsing resume:", error);
              // Use default data if parsing fails
              setPortfolio(getDefaultResumeData());
            }
          } else {
            setPortfolio(getDefaultResumeData());
          }
        } else {
          setPortfolio(getDefaultResumeData());
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(getDefaultResumeData());
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Generating your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-lg">Portfolio not found</p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getContactIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'location':
        return <MapPin className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Navigation */}
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Create Another Portfolio
          </Link>
        </Button>

        {/* Header */}
        <header className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {portfolio.name}
            </h1>
            <h2 className="text-2xl text-muted-foreground font-medium">
              {portfolio.title}
            </h2>
          </div>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto text-gray-600">
            {portfolio.summary}
          </p>
        </header>

        {/* Skills */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Skills & Technologies</CardTitle>
            <CardDescription>Technical expertise and core competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Experience</CardTitle>
            <CardDescription>Career highlights and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-primary pl-6 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <Badge variant="outline" className="w-fit">{exp.years}</Badge>
                </div>
                <p className="text-lg text-primary font-medium">{exp.company}</p>
                <p className="text-gray-600 leading-relaxed">{exp.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Featured Projects</CardTitle>
            <CardDescription>Showcase of recent work and contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {portfolio.projects.map((project, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Get In Touch</CardTitle>
            <CardDescription>Ready to collaborate? Let's connect!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {portfolio.contactLinks.map((link, index) => (
                <Button key={index} variant="outline" className="justify-start" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {getContactIcon(link.type)}
                    <span className="ml-2">{link.type}</span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 text-gray-500">
          <p>Portfolio generated automatically from resume</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
