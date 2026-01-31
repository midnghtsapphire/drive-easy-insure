import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FileText, User, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuoteSubmission {
  id: string;
  state: string;
  violation_type: string;
  coverage_type: string;
  status: string;
  created_at: string;
}

interface Profile {
  full_name: string | null;
  email: string;
  phone: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signOut, isAdmin } = useAuth();
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email, phone")
        .eq("user_id", user!.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch user's quote submissions
      const { data: submissionsData } = await supabase
        .from("quote_submissions")
        .select("id, state, violation_type, coverage_type, status, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      setSubmissions(submissionsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: React.ReactNode }> = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-3 h-3" /> },
      quoted: { color: "bg-blue-100 text-blue-800", icon: <FileText className="w-3 h-3" /> },
      contacted: { color: "bg-purple-100 text-purple-800", icon: <User className="w-3 h-3" /> },
      converted: { color: "bg-green-100 text-green-800", icon: <CheckCircle2 className="w-3 h-3" /> },
      expired: { color: "bg-gray-100 text-gray-800", icon: <AlertCircle className="w-3 h-3" /> },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatViolationType = (type: string) => {
    const types: Record<string, string> = {
      dui: "DUI/DWI",
      reckless: "Reckless Driving",
      uninsured: "Driving Uninsured",
      suspended: "Suspended License",
      accident: "At-Fault Accident",
      other: "Other Violation",
    };
    return types[type] || type;
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-primary-foreground">ReinstatePro</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="subtle" size="sm">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.full_name || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Track your quote requests and manage your SR-22 filings.
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Quote Requests</h3>
            <p className="text-2xl font-bold text-accent">{submissions.length}</p>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Active Policies</h3>
            <p className="text-2xl font-bold text-success">
              {submissions.filter(s => s.status === "converted").length}
            </p>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Pending</h3>
            <p className="text-2xl font-bold text-primary">
              {submissions.filter(s => s.status === "pending").length}
            </p>
          </div>
        </div>

        {/* Quote submissions table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Your Quote Requests</h2>
          </div>
          
          {submissions.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No quote requests yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by requesting your first SR-22 quote.
              </p>
              <Link to="/#quote-wizard">
                <Button variant="hero">Get Your Quote</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">State</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Violation</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Coverage</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{submission.state}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {formatViolationType(submission.violation_type)}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground capitalize">
                        {submission.coverage_type}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(submission.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
