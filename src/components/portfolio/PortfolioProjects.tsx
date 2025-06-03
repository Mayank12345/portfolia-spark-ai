
import { Code2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectItem {
  name: string;
  url: string;
  description: string;
}

interface PortfolioProjectsProps {
  projects: ProjectItem[];
}

const PortfolioProjects = ({ projects }: PortfolioProjectsProps) => {
  return (
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
          {projects.map((project, index) => (
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
  );
};

export default PortfolioProjects;
