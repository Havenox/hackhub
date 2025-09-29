import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star, MapPin, MessageCircle } from "lucide-react";

interface TeamCardProps {
  name: string;
  description: string;
  leader: string;
  members: number;
  maxMembers: number;
  skills: string[];
  lookingFor: string[];
  hackathon: string;
  isRecruiting: boolean;
}

export const TeamCard = ({
  name,
  description,
  leader,
  members,
  maxMembers,
  skills,
  lookingFor,
  hackathon,
  isRecruiting
}: TeamCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 overflow-hidden group">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start mb-2">
            <Badge className={`${isRecruiting ? 'bg-accent' : 'bg-muted-foreground'} text-background`}>
              {isRecruiting ? "Recrutando" : "Completo"}
            </Badge>
            <div className="flex items-center text-gold">
              <Star className="h-4 w-4 mr-1" />
              <span className="text-sm font-exo">4.8</span>
            </div>
          </div>
          
          <h3 className="text-xl font-orbitron font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <p className="text-sm text-muted-foreground font-exo leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center text-sm text-accent">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="font-exo">{hackathon}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span className="font-exo">{members}/{maxMembers} membros</span>
            </div>
            <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-accent transition-all duration-300"
                style={{ width: `${(members / maxMembers) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-exo mb-2">Habilidades do Time</p>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs font-exo bg-secondary/50"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {isRecruiting && lookingFor.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground font-exo mb-2">Procurando por</p>
              <div className="flex flex-wrap gap-1">
                {lookingFor.map((role, index) => (
                  <Badge 
                    key={index} 
                    className="text-xs font-exo bg-accent/20 text-accent border-accent/50"
                    variant="outline"
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-4 flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 border-primary/50 hover:border-primary hover:shadow-neon font-exo"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button 
            size="sm"
            className="flex-1 bg-gradient-primary shadow-neon hover:shadow-glow font-exo font-semibold"
            disabled={!isRecruiting}
          >
            {isRecruiting ? "Candidatar-se" : "Completo"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};