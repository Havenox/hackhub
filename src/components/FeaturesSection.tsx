import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Users, 
  Zap, 
  Shield, 
  Target, 
  MessageCircle, 
  Trophy,
  Bot,
  Network
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Formação Inteligente de Times",
    description: "Sistema de guildas inspirado em MMORPGs para criar e participar de times com habilidades complementares.",
    gradient: "from-primary to-neon-pink"
  },
  {
    icon: Zap,
    title: "Matchmaking Instantâneo",
    description: "Recomendações com IA para encontrar os membros perfeitos baseado em habilidades e interesses.",
    gradient: "from-accent to-neon-cyan"
  },
  {
    icon: Shield,
    title: "Validação Automatizada",
    description: "Previne participação em múltiplos times e garante formação justa com verificações integradas.",
    gradient: "from-gold to-primary"
  },
  {
    icon: Target,
    title: "Matching por Habilidades",
    description: "Encontre membros com exatamente as habilidades que você precisa para seu projeto de hackathon.",
    gradient: "from-neon-blue to-accent"
  },
  {
    icon: MessageCircle,
    title: "Comunicação de Time",
    description: "Chat integrado e ferramentas de colaboração para manter seu time conectado e produtivo.",
    gradient: "from-neon-pink to-primary"
  },
  {
    icon: Trophy,
    title: "Sistema de Conquistas",
    description: "Ganhe badges e construa sua reputação conforme participa de mais hackathons.",
    gradient: "from-gold to-neon-cyan"
  },
  {
    icon: Bot,
    title: "Notificações Inteligentes",
    description: "Mantenha-se atualizado com alertas inteligentes sobre convites, prazos e oportunidades.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Network,
    title: "Hub de Networking",
    description: "Construa conexões duradouras com outros desenvolvedores que se estendem além de eventos individuais.",
    gradient: "from-neon-cyan to-neon-blue"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Eleve Sua Experiência em Hackathons
          </h2>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto">
            Nossa plataforma traz o melhor das mecânicas de jogos para a formação de times em hackathons, 
            tornando a colaboração intuitiva, eficiente e divertida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-neon group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="h-8 w-8 text-background" />
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <h3 className="text-lg font-orbitron font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-exo leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};