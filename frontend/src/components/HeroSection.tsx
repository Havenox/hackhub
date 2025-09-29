import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Trophy, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-orbitron font-black mb-6 bg-gradient-primary bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Forme Times Épicos
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl font-exo mb-8 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experimente a formação de times em hackathons como nunca antes. 
            Participe de guildas, crie equipes e construa o futuro juntos.
          </motion.h2>

          {/* Stats */}
          <motion.div 
            className="flex justify-center space-x-8 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-accent">
              <Users className="h-5 w-5" />
              <span className="font-exo font-semibold">1000+ Hackers</span>
            </div>
            <div className="flex items-center space-x-2 text-gold">
              <Trophy className="h-5 w-5" />
              <span className="font-exo font-semibold">250+ Times</span>
            </div>
            <div className="flex items-center space-x-2 text-neon-cyan">
              <Zap className="h-5 w-5" />
              <span className="font-exo font-semibold">50+ Eventos</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-primary shadow-neon hover:shadow-glow text-lg px-8 py-6 font-exo font-semibold group"
              onClick={() => navigate("/register")}
            >
              Começar Jornada
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-primary/50 hover:border-primary hover:shadow-neon text-lg px-8 py-6 font-exo font-semibold"
              onClick={() => navigate("/hackathons")}
            >
              Explorar Marketplace
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};