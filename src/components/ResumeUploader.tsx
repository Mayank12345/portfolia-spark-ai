
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { parseResumeFromFile, type ParsedResume } from "@/utils/resumeParser";

interface ResumeUploaderProps {
  onUploadSuccess: (portfolioId: string) => void;
}

const ResumeUploader = ({ onUploadSuccess }: ResumeUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const savePortfolioToDatabase = async (sessionId: string, parsedData: ParsedResume) => {
    const { error } = await supabase
      .from('portfolios')
      .insert({
        session_id: sessionId,
        name: parsedData.name,
        title: parsedData.title,
        summary: parsedData.summary,
        skills: parsedData.skills,
        experience: parsedData.experience,
        projects: parsedData.projects,
        contact_links: parsedData.contactLinks,
        education: parsedData.education || []
      });

    if (error) {
      console.error('Error saving portfolio to database:', error);
      throw error;
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validation
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      setUploadStatus('error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      setUploadStatus('error');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');
    
    try {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fileExt = file.name.split('.').pop();
      const fileName = `${sessionId}/resume_${Date.now()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Upload failed",
          description: uploadError.message,
          variant: "destructive",
        });
        setUploadStatus('error');
        return;
      }

      // Parse the resume
      const parsedData = await parseResumeFromFile(file);
      
      // Save parsed data to database
      await savePortfolioToDatabase(sessionId, parsedData);
      
      setUploadStatus('success');
      toast({
        title: "Success!",
        description: "Resume uploaded and portfolio generated successfully!",
      });
      onUploadSuccess(sessionId);

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
          <p className="text-muted-foreground">
            Transform your resume into a beautiful portfolio website in seconds
          </p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? "border-primary bg-primary/5"
              : uploadStatus === 'success'
              ? "border-green-500 bg-green-50"
              : uploadStatus === 'error'
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-primary hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleInputChange}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-4">
            {uploading ? (
              <>
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-primary font-medium">Processing your resume...</p>
              </>
            ) : uploadStatus === 'success' ? (
              <>
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                <p className="text-green-600 font-medium">Resume uploaded successfully!</p>
              </>
            ) : uploadStatus === 'error' ? (
              <>
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
                <p className="text-red-600 font-medium">Upload failed. Please try again.</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    Drop your resume here, or{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                      browse files
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOC, DOCX (max 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {!uploading && uploadStatus !== 'success' && (
          <div className="mt-6">
            <Button
              className="w-full"
              onClick={() => document.getElementById('resume-upload')?.click()}
              size="lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            Secure Upload
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            AI Powered
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            Instant Portfolio
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUploader;
