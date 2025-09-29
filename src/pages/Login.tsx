import { useState } from "react";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/hackathons" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso");
      navigate("/hackathons");
    } catch (err: any) {
      toast.error(err?.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <h2 className="text-2xl font-orbitron font-bold bg-gradient-primary bg-clip-text text-transparent text-center">
              Entrar
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              {/* <Button type="submit" className="w-full bg-gradient-primary shadow-neon" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button> */}

              
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary shadow-neon hover:shadow-glow text-lg py-4 font-exo font-semibold"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary/50 shadow-neon hover:shadow-glow hover:bg-transparent hover:text-white text-lg py-4 font-exo font-semibold group"
                onClick={() => navigate("/register")}
              >
                Registrar
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>


            </form>
          </CardContent>
        </Card>
        </div>
    </>
  );
};

export default Login;

