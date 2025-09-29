import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Zap, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Verifica se a rota é exatamente a raiz ("/")
  const isHome = location.pathname === "/";

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-3"
            >
            <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-orbitron font-bold bg-gradient-primary bg-clip-text text-transparent">
              Hackhub
            </h1>
            </Link>
          </motion.div>
          
          {isHome && (
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/#marketplace" className="text-foreground hover:text-primary transition-colors font-exo">
                Marketplace
              </a>
              <a href="/#teams" className="text-foreground hover:text-primary transition-colors font-exo">
                Times
              </a>
              <a href="/#events" className="text-foreground hover:text-primary transition-colors font-exo">
                Eventos
              </a>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                  <Button variant="outline" size="sm" className="hidden sm:flex border-primary/50 hover:border-primary hover:shadow-neon" onClick={() => navigate("/login")}>
                    Entrar
                  </Button>
                <Button size="sm" className="bg-gradient-primary shadow-neon hover:shadow-glow" onClick={() => navigate("/register")}> 
                  Participar
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" className="hidden sm:flex" onClick={() => navigate("/hackathons")}>Meus Hackathons</Button>
                <Button variant="destructive" size="sm" onClick={() => { logout(); navigate("/"); }}>
                  <LogOut className="h-4 w-4 mr-2" /> Sair
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};