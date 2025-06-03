
import { Briefcase, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceItem {
  company: string;
  role: string;
  years: string;
  details: string;
}

interface PortfolioExperienceProps {
  experience: ExperienceItem[];
}

const PortfolioExperience = ({ experience }: PortfolioExperienceProps) => {
  return (
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
        {experience.map((exp, index) => (
          <div key={index} className="relative pl-8 pb-8 last:pb-0">
            <div className="absolute left-0 top-1 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full"></div>
            </div>
            {index < experience.length - 1 && (
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
  );
};

export default PortfolioExperience;
