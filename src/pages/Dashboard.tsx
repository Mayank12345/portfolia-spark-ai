
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, FileText, Trash2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Load user's uploaded files
  useEffect(() => {
    if (user) {
      loadUploadedFiles();
    }
  }, [user]);

  const loadUploadedFiles = async () => {
    if (!user) return;
    
    setLoadingFiles(true);
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .list(user.id, {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error('Error loading files:', error);
        toast.error('Failed to load uploaded files');
      } else {
        setUploadedFiles(data || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load uploaded files');
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload file');
      } else {
        toast.success('Résumé uploaded successfully!');
        loadUploadedFiles(); // Refresh the file list
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!user) return;

    try {
      const filePath = `${user.id}/${fileName}`;
      const { error } = await supabase.storage
        .from('resumes')
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete file');
      } else {
        toast.success('File deleted successfully');
        loadUploadedFiles(); // Refresh the file list
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center gap-6 p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Welcome, {user.email}!
          </p>
        </div>

        {/* Resume Upload Section */}
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Résumé Upload
          </h2>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload your résumé in PDF or Word format (max 5MB)
            </p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
              className="hidden"
              id="resumeFile"
            />
            
            <Button 
              onClick={handleFileSelect}
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Résumé"}
            </Button>
          </div>

          {/* Uploaded Files List */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Your Uploaded Files</h3>
            {loadingFiles ? (
              <p className="text-sm text-muted-foreground">Loading files...</p>
            ) : uploadedFiles.length > 0 ? (
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-3 border rounded bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.metadata?.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFile(file.name)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
            )}
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            🎉 You're successfully logged in!
          </p>
          <p className="text-sm text-muted-foreground">
            Portfolio features coming soon...
          </p>
        </div>

        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
