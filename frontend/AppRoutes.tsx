import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavBar } from "./NavBar.tsx";
import { AuthComponent, MyVideos } from "./VideoModalSupabaseAuth";
import AIVideoGenerator from "./AIVideoGenerator";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nljbsoeugmofzavehida.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5samJzb2V1Z21vZnphdmVoaWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNzMxMjMsImV4cCI6MjA2MDg0OTEyM30.xfE4OPoTe0zmwiAvmsaKBkrLI-wtOd4g8yeW9p0yN-4"
);

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-white p-4 animate-pulse">Loading protected content...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

function NotFound() {
  return (
    <div className="text-center text-white mt-32 space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-zinc-400">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="text-purple-400 underline">Return Home</a>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<AIVideoGenerator />} />
        <Route path="/login" element={<AuthComponent />} />
        <Route
          path="/my-videos"
          element={
            <ProtectedRoute>
              <MyVideos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}