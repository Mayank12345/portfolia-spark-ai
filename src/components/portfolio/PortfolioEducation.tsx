
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

interface PortfolioEducationProps {
  education: EducationItem[];
}

const PortfolioEducation = ({ education }: PortfolioEducationProps) => {
  if (!education || education.length === 0) {
    return null;
  }

  return (
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
          {education.map((edu, index) => (
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
  );
};

export default PortfolioEducation;
