
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DashboardContentProps {
  userEmail: string;
}

const DashboardContent = ({ userEmail }: DashboardContentProps) => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Generate a unique session ID for this upload
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fileExt = file.name.split('.').pop();
      const fileName = `${sessionId}/resume_${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setResumeUploaded(true);
        setPortfolioId(sessionId);
        toast({
          title: "Success!",
          description: "Resume uploaded successfully! You can now view your portfolio.",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Welcome Card */}
      <Card className="p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p className="text-muted-foreground">Upload your resume to generate a beautiful portfolio</p>
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
        
        <div className="w-full">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button 
            className="w-full" 
            onClick={() => document.getElementById('resume-upload')?.click()}
            disabled={uploading}
          >
            <FileText className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>
        
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
          {resumeUploaded ? "Portfolio ready to view!" : "Upload a resume to generate your portfolio"}
        </p>
        {resumeUploaded && portfolioId ? (
          <Button asChild variant="default" className="w-full">
            <Link to={`/portfolio/${portfolioId}`}>View Portfolio</Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Upload Resume First
          </Button>
        )}
      </Card>

      {/* Info Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">How it works</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Simply upload your resume and we'll generate a beautiful portfolio for you instantly
        </p>
        <Button variant="outline" className="w-full" disabled>
          No setup required!
        </Button>
      </Card>
    </div>
  );
};

export default DashboardContent;
