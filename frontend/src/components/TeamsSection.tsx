import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";
import { Button } from "@/components/ui/button";
import { Plus, Search, Users } from "lucide-react";

const mockTeams = [
  {
    name: "Neural Nexus",
    description: "Construindo soluções de IA de próxima geração para diagnósticos médicos usando deep learning e visão computacional.",
    leader: "Alex Chen",
    members: 3,
    maxMembers: 5,
    skills: ["Python", "TensorFlow", "React", "AWS"],
    lookingFor: ["Desenvolvedor Backend", "Cientista de Dados"],
    hackathon: "Desafio de Inovação em IA",
    isRecruiting: true
  },
  {
    name: "EcoCode Warriors",
    description: "Criando soluções tecnológicas sustentáveis para reduzir a pegada de carbono em ambientes urbanos.",
    leader: "Maria Santos",
    members: 4,
    maxMembers: 6,
    skills: ["Node.js", "React Native", "IoT", "MongoDB"],
    lookingFor: ["Desenvolvedor Mobile", "UX Designer"],
    hackathon: "Hack de Tecnologia Sustentável",
    isRecruiting: true
  },
  {
    name: "Blockchain Builders",
    description: "Desenvolvendo soluções de finanças descentralizadas para mercados emergentes e inclusão financeira.",
    leader: "David Kim",
    members: 5,
    maxMembers: 5,
    skills: ["Solidity", "Web3.js", "React", "Smart Contracts"],
    lookingFor: [],
    hackathon: "Revolução FinTech",
    isRecruiting: false
  }
];

export const TeamsSection = () => {
  return (
    <section id="teams" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Times Ativos
          </h2>
          <p className="text-xl text-muted-foreground font-exo max-w-2xl mx-auto">
            Participe de times existentes ou crie sua própria guilda. Encontre desenvolvedores com habilidades complementares e construam algo incrível juntos.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-primary/50 hover:border-primary hover:shadow-neon font-exo"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar Times
            </Button>
            <Button 
              variant="outline" 
              className="border-primary/50 hover:border-primary hover:shadow-neon font-exo"
            >
              <Users className="h-4 w-4 mr-2" />
              Apenas Recrutando
            </Button>
          </div>
          
          <Button 
            className="bg-gradient-primary shadow-neon hover:shadow-glow font-exo font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Time
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TeamCard {...team} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};