import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FileText, Users, TrendingUp, Loader2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface QuoteSubmission {
  id: string;
  state: string;
  violation_type: string;
  coverage_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signOut, isAdmin } = useAuth();
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (!authLoading && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/dashboard");
      return;
    }

    if (isAdmin) {
      fetchSubmissions();
    }
  }, [user, authLoading, isAdmin, navigate]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: "pending" | "quoted" | "contacted" | "converted" | "expired") => {
    try {
      const { error } = await supabase
        .from("quote_submissions")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setSubmissions(prev =>
        prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch =
      s.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === "pending").length,
    quoted: submissions.filter(s => s.status === "quoted").length,
    converted: submissions.filter(s => s.status === "converted").length,
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
            <span className="font-bold text-xl text-primary-foreground">Admin Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="subtle" size="sm">
                User Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-primary-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quoted</p>
                <p className="text-2xl font-bold text-foreground">{stats.quoted}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold text-foreground">{stats.converted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="quoted">Quoted</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Submissions table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">State</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Violation</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {submission.first_name} {submission.last_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{submission.email}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{submission.state}</td>
                    <td className="px-4 py-3 text-sm text-foreground capitalize">
                      {submission.violation_type.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id, e.target.value as "pending" | "quoted" | "contacted" | "converted" | "expired")}
                        className="px-2 py-1 text-xs rounded border border-border bg-card focus:outline-none focus:ring-1 focus:ring-accent/50"
                      >
                        <option value="pending">Pending</option>
                        <option value="quoted">Quoted</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="expired">Expired</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-accent hover:underline text-sm"
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSubmissions.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No submissions found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Quote submissions will appear here"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
