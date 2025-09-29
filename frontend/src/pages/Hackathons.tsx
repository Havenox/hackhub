import { useMemo } from "react";
import { Header } from "@/components/Header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { deleteHackathon, getHackathons, type HackathonResponse } from "@/lib/api";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { HackathonCard } from "@/components/HackathonCard";

const Hackathons = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["hackathons"],
    queryFn: () => getHackathons(token),
  });

  const mutation = useMutation({
    mutationFn: async (id: string) => deleteHackathon(id, token),
    onSuccess: () => {
      toast.success("Hackathon removido");
      queryClient.invalidateQueries({ queryKey: ["hackathons"] });
    },
    onError: (e: any) => toast.error(e?.message || "Erro ao remover"),
  });

  const hackathons = useMemo(() => data || [], [data]);

  return (
    <>
      <Header />
      <section className="py-24 bg-background/50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold bg-gradient-primary bg-clip-text text-transparent">
              Meus Hackathons
            </h2>
            <Button
              className="bg-gradient-primary shadow-neon"
              onClick={() => navigate("/hackathons/new")}
            >
              <Plus className="h-4 w-4 mr-2" /> Criar Hackathon
            </Button>
          </div>

          {isLoading && <p className="text-muted-foreground">Carregando...</p>}

          {!isLoading && hackathons.length === 0 && (
            <p className="text-muted-foreground">Nenhum hackathon encontrado.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((h: HackathonResponse, index: number) => {
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  {/* HackathonCard para exibir dados */}
                  <HackathonCard
                    title={h.name || "Hackathon sem nome"}
                    description={h.description || ""}
                    // organizer={h.organizer ?? "Você"} // se vier no backend, use o organizador real
                    organizer="Organização Desconhecida"
                    participants={Math.floor(Math.random() * 50)}
                    maxParticipants={200}
                    startDate={new Date(h.startDate).toLocaleDateString("pt-BR")}
                    endDate={new Date(h.endDate).toLocaleDateString("pt-BR")}
                    prize="R$ 0,00"
                    tags={["Pessoal"]}
                    status={status}
                  />

                  {/* Botões só aparecem se o hackathon for do usuário logado */}
                  {/* {h.isOwner === user?.userId && ( */}
                  {user?.userId && (
                    <div className="flex gap-2 mt-2">
                      <Link to={`/hackathons/${h.id}/edit`} className="w-full">
                        <Button variant="secondary" className="w-full">
                          <Pencil className="h-4 w-4 mr-2" /> Editar
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => mutation.mutate(h.id)}
                        disabled={mutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remover
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hackathons;
