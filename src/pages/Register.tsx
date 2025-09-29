import { useState } from "react";
import { Header } from "@/components/Header";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { register as registerApi } from "@/lib/api"; // 👈 importa do api.tsx

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
      await registerApi({ name, email, password }); // 👈 usa função da api
      toast.success("Conta criada com sucesso! Faça login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao registrar");
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
            Criar conta
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
              />
            </div>

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

            {/* <Button
              type="submit"
              className="w-full bg-gradient-primary shadow-neon"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar"}
              </Button> */}
              
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary shadow-neon hover:shadow-glow text-lg py-4 font-exo font-semibold"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 border-primary/50 shadow-neon hover:shadow-glow hover:bg-transparent hover:text-white text-lg py-4 font-exo font-semibold group"
                onClick={() => navigate("/login")}
              >
                Entrar
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

export default Register;
