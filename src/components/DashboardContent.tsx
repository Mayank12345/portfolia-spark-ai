
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, User, Settings } from "lucide-react";

interface DashboardContentProps {
  userEmail: string;
}

const DashboardContent = ({ userEmail }: DashboardContentProps) => {
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
        <Button className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          Upload Resume
        </Button>
      </Card>

      {/* Portfolio Status Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Portfolio Status</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          No portfolio created yet
        </p>
        <Button variant="outline" className="w-full" disabled>
          Generate Portfolio
        </Button>
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
