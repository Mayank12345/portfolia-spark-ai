
import DashboardContent from "@/components/DashboardContent";
import { Button } from "@/components/ui/button";

const Login = () => {
  const handleSignOut = () => {
    // Placeholder for now - no actual auth to sign out from
    console.log("Sign out clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">PortfolioAI</h1>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your resumes and portfolios
          </p>
        </div>

        <DashboardContent userEmail="user@example.com" />
      </main>
    </div>
  );
};

export default Login;
