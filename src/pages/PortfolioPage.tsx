
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { getDefaultResumeData, type ParsedResume } from "@/utils/resumeParser";
import { ArrowLeft, Mail, ExternalLink, MapPin, Download, Share2, Globe, Briefcase, GraduationCap, Code2, User, Phone, Calendar } from "lucide-react";

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

        // Fetch portfolio data from database
        const { data: portfolioData, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('session_id', userId)
          .single();

        if (error) {
          console.error("Error fetching portfolio:", error);
          setPortfolio(getDefaultResumeData());
        } else if (portfolioData) {
          // Convert database format to ParsedResume format
          const formattedPortfolio: ParsedResume = {
            name: portfolioData.name,
            title: portfolioData.title,
            summary: portfolioData.summary,
            skills: portfolioData.skills,
            experience: portfolioData.experience,
            projects: portfolioData.projects,
            contactLinks: portfolioData.contact_links,
            education: portfolioData.education
          };
          setPortfolio(formattedPortfolio);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin h-16 w-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
            <div className="absolute inset-0 h-16 w-16 border-4 border-transparent border-t-blue-300 rounded-full mx-auto animate-ping"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-medium text-slate-700">Loading your portfolio...</p>
            <p className="text-slate-500">This will just take a moment</p>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-medium text-slate-700">Portfolio not found</p>
            <p className="text-slate-500">The requested portfolio could not be loaded</p>
          </div>
          <Button asChild variant="outline" className="bg-white hover:bg-slate-50">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Create New Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getContactIcon = (type: string) => {
    const iconType = type.toLowerCase();
    if (iconType.includes('email') || iconType.includes('mail')) return <Mail className="h-4 w-4" />;
    if (iconType.includes('phone')) return <Phone className="h-4 w-4" />;
    if (iconType.includes('location') || iconType.includes('address')) return <MapPin className="h-4 w-4" />;
    if (iconType.includes('website') || iconType.includes('portfolio')) return <Globe className="h-4 w-4" />;
    return <ExternalLink className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-white/50">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Create Another Portfolio
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative px-8 py-16 md:px-16 md:py-24">
            <div className="max-w-4xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    {portfolio.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6" />
                    <h2 className="text-xl md:text-2xl font-medium opacity-90">
                      {portfolio.title}
                    </h2>
                  </div>
                </div>
                <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-3xl">
                  {portfolio.summary}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {portfolio.contactLinks.slice(0, 3).map((link, index) => (
                    <Button 
                      key={index} 
                      variant="secondary" 
                      size="sm" 
                      asChild
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {getContactIcon(link.type)}
                        <span className="ml-2">{link.type}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
                <CardDescription className="text-slate-600">Technical skills and core competencies</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:shadow-md transition-all duration-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Professional Experience</CardTitle>
                <CardDescription className="text-slate-600">Career journey and achievements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-8 last:pb-0">
                <div className="absolute left-0 top-1 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
                {index < portfolio.experience.length - 1 && (
                  <div className="absolute left-3 top-7 w-px h-full bg-gradient-to-b from-blue-200 to-transparent"></div>
                )}
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        {exp.years}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-blue-600">{exp.company}</p>
                  <p className="text-slate-600 leading-relaxed">{exp.details}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">Featured Projects</CardTitle>
                <CardDescription className="text-slate-600">Notable work and contributions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.projects.map((project, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education Section */}
        {portfolio.education && portfolio.education.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Education</CardTitle>
                  <CardDescription className="text-slate-600">Academic background and qualifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolio.education.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div>
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <p className="text-amber-700 font-medium">{edu.institution}</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                      {edu.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white border-0 shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Let's Connect</CardTitle>
                <CardDescription className="text-blue-100">Ready to collaborate? Let's get in touch!</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {portfolio.contactLinks.map((link, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="justify-start h-auto p-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-200" 
                  asChild
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    {getContactIcon(link.type)}
                    <div className="text-left">
                      <div className="font-medium">{link.type}</div>
                      <div className="text-sm opacity-75 truncate">
                        {link.url.replace(/^(mailto:|https?:\/\/)/, '')}
                      </div>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-slate-500">
            Portfolio generated with ❤️ by PortfolioAI
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
