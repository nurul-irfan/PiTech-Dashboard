import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Info, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  setAuthToken,
  adminApi,
} from "@/api/useApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();


  /* =========================
     LOGIN
  ========================== */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await adminApi.login({ email, password });

      /* Store auth data */
      setAuthToken(result.data.token)
      localStorage.setItem("token", result.data.token);
      // localStorage.setItem("roles", JSON.stringify(result.admin.roles));
      // localStorage.setItem("user", JSON.stringify(result.admin));

      toast({
        title: "Login Successful",
        description: "Welcome to PI Tech Dashboard",
      });

      navigate("/");
    } catch (err) {
      // handled by hook
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     FORGOT PASSWORD
  ========================== */
  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email first",
        variant: "destructive",
      });
      return;
    }

    try {
      await adminApi.resetPassword(email);
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions",
      });
    } catch (err) {
      // handled by hook
    }
  };

  /* =========================
     DEMO CREDENTIALS
  ========================== */
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
      {/* Left Panel */}
      <div className="lg:w-1/2 bg-gradient-primary p-8 lg:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl border-2 border-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">PI Tech</h1>
              <p className="text-white/60 text-sm">Payment Processing</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">
            Secure Fiat to Crypto<br />
            <span className="text-accent">Payment Processing</span>
          </h2>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:w-1/2 bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-muted-foreground">
              Sign in to access the processing platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="admin@pitech.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-sm font-medium">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 gap-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight />}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">Demo Credentials</span>
            </div>

            <button onClick={() => fillDemoCredentials("admin")}>
              admin@pitech.io / Admin@123
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
