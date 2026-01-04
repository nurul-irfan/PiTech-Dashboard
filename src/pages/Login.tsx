import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Info, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Demo login simulation
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to PI Tech Dashboard",
        });
        navigate("/");
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const fillDemoCredentials = (role: string) => {
    switch (role) {
      case "admin":
        setEmail("admin@pitech.io");
        setPassword("Admin@123");
        break;
      case "operator":
        setEmail("operator@pitech.io");
        setPassword("Operator@123");
        break;
      case "auditor":
        setEmail("auditor@pitech.io");
        setPassword("Auditor@123");
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-gradient-primary p-8 lg:p-12 flex flex-col justify-between min-h-[40vh] lg:min-h-screen">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl border-2 border-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl font-['Outfit']">PI Tech</h1>
              <p className="text-white/60 text-sm">Payment Processing</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="max-w-md">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-['Outfit'] mb-6 leading-tight">
              Secure Fiat to Crypto<br />
              <span className="text-accent">Payment Processing</span>
            </h2>
            <p className="text-white/70 text-base lg:text-lg leading-relaxed">
              Enterprise-grade payment gateway with 10% fee management, 
              complete audit trails, and automated settlement to bank core wallets.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 lg:gap-12 mt-8 lg:mt-0">
          <div>
            <p className="text-accent text-2xl lg:text-3xl font-bold font-['Outfit']">$18M+</p>
            <p className="text-white/60 text-sm">Volume Processed</p>
          </div>
          <div>
            <p className="text-accent text-2xl lg:text-3xl font-bold font-['Outfit']">100%</p>
            <p className="text-white/60 text-sm">Audit Compliant</p>
          </div>
          <div>
            <p className="text-accent text-2xl lg:text-3xl font-bold font-['Outfit']">52</p>
            <p className="text-white/60 text-sm">Settlements</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 bg-background flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold font-['Outfit'] text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to access the processing platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input
                type="email"
                placeholder="admin@pitech.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                <button type="button" className="text-sm text-accent hover:text-accent/80">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-card border-border pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base gap-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-muted rounded-xl border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Demo Credentials</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Super Admin:</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("admin")}
                  className="font-mono text-accent hover:underline"
                >
                  admin@pitech.io / Admin@123
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Operator:</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("operator")}
                  className="font-mono text-accent hover:underline"
                >
                  operator@pitech.io / Operator@123
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Auditor:</span>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("auditor")}
                  className="font-mono text-accent hover:underline"
                >
                  auditor@pitech.io / Auditor@123
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-muted-foreground text-sm mt-8">
            Protected by enterprise-grade security.<br />
            Contact your administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
