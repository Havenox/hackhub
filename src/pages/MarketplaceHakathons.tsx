import { motion } from "framer-motion";
import { HackathonCard } from "@/components/HackathonCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getHackathons } from "@/lib/api";
import { Header } from "@/components/Header";

export const MarketplaceHackathons = () => {
  const { data: hackathons = [], isLoading } = useQuery({
    queryKey: ["hackathons-public"],
    queryFn: () => getHackathons(), // sem token = só pega públicos
  });

  return (
    <>
      <Header />
      <section id="marketplace" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Marketplace de Hackathons
            </h2>
            <p className="text-xl text-muted-foreground font-exo max-w-2xl mx-auto">
              Descubra e participe de hackathons do mundo inteiro. Encontre seu
              próximo desafio e forme times com desenvolvedores incríveis.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="border-primary/50 hover:border-primary hover:shadow-neon font-exo"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtrar Eventos
            </Button>
          </motion.div>

          {isLoading && (
            <p className="text-center text-muted-foreground">Carregando...</p>
          )}

          {!isLoading && hackathons.length === 0 && (
            <p className="text-center text-muted-foreground">
              Nenhum hackathon disponível.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {hackathons.map((h, index) => {
              const status =
                new Date(h.endDate) < new Date()
                  ? "ended"
                  : new Date(h.startDate) > new Date()
                  ? "upcoming"
                  : "active";

              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <HackathonCard
                    title={h.name || "Hackathon sem nome"}
                    description={h.description || ""}
                    organizer="Organização Desconhecida"
                    participants={Math.floor(Math.random() * 100)} // TEMP: depende do backend expor isso
                    maxParticipants={200}
                    startDate={new Date(h.startDate).toLocaleDateString(
                      "pt-BR"
                    )}
                    endDate={new Date(h.endDate).toLocaleDateString("pt-BR")}
                    prize="R$ 0,00"
                    tags={["Hackathon"]}
                    status={status}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
