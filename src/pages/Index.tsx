
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse-gentle">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4 mx-auto">
          <span className="text-primary-foreground font-bold text-xl">P</span>
        </div>
        <h1 className="text-2xl font-bold text-center">Loading PredictlyPro...</h1>
      </div>
    </div>
  );
};

export default Index;
