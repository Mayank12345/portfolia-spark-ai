
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardContentProps {
  userEmail: string;
}

const DashboardContent = ({ userEmail }: DashboardContentProps) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  
  // Mock user ID for demo purposes - in real app this would come from auth
  const mockUserId = "user123";

  const handleResumeUpload = () => {
    // Mock resume upload - in real app this would handle file upload to Supabase Storage
    console.log("Resume upload clicked");
    setResumeUploaded(true);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Welcome Card */}
      <Card className="p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </Card>

      {/* Resume Upload Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Upload className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Upload Resume</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your resume to get started with portfolio generation
        </p>
        <Button className="w-full" onClick={handleResumeUpload}>
          <FileText className="h-4 w-4 mr-2" />
          Upload Resume
        </Button>
        {resumeUploaded && (
          <p className="text-sm text-green-600 mt-2">✓ Resume uploaded successfully!</p>
        )}
      </Card>

      {/* Portfolio Status Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Portfolio Status</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {resumeUploaded ? "Portfolio ready to view!" : "No portfolio created yet"}
        </p>
        {resumeUploaded ? (
          <Button asChild variant="default" className="w-full">
            <Link to={`/portfolio/${mockUserId}`}>See Portfolio</Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Generate Portfolio
          </Button>
        )}
      </Card>

      {/* Settings Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Account Settings</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your account preferences
        </p>
        <Button variant="outline" className="w-full">
          View Settings
        </Button>
      </Card>
    </div>
  );
};

export default DashboardContent;
