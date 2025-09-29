import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Clock } from "lucide-react";

interface HackathonCardProps {
  title: string;
  description: string;
  organizer: string;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  prize: string;
  tags: string[];
  status: "upcoming" | "active" | "ended";
}

export const HackathonCard = ({
  title,
  description,
  organizer,
  participants,
  maxParticipants,
  startDate,
  endDate,
  prize,
  tags,
  status
}: HackathonCardProps) => {
  const statusColors = {
    upcoming: "bg-neon-blue",
    active: "bg-accent",
    ended: "bg-muted-foreground"
  };

  const statusLabels = {
    upcoming: "Em Breve",
    active: "Ativo",
    ended: "Finalizado"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <Badge className={`${statusColors[status]} text-background`}>
              {statusLabels[status]}
            </Badge>
            <div className="flex items-center text-gold">
              <Trophy className="h-4 w-4 mr-1" />
              <span className="text-sm font-exo">{prize}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-orbitron font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground font-exo leading-relaxed">
            {description}
          </p>
          
          <p className="text-sm text-accent font-exo">
            Organizado por <span className="font-semibold">{organizer}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-exo">{participants}/{maxParticipants} participantes</span>
            </div>
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-accent transition-all duration-300"
                style={{ width: `${(participants / maxParticipants) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="font-exo">{startDate} - {endDate}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs font-exo bg-secondary/50 hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button 
            className="w-full bg-gradient-primary shadow-neon hover:shadow-glow font-exo font-semibold"
            disabled={status === "ended"}
          >
            {status === "active" ? "Participar" : status === "upcoming" ? "Inscrever-se" : "Ver Resultados"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};