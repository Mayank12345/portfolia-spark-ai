
import { Code2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PortfolioSkillsProps {
  skills: string[];
}

const PortfolioSkills = ({ skills }: PortfolioSkillsProps) => {
  return (
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
          {skills.map((skill, index) => (
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
  );
};

export default PortfolioSkills;
