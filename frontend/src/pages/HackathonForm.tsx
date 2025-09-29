import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  createHackathon,
  getHackathon,
  updateHackathon,
  type HackathonCreateRequest,
} from "@/lib/api";
import { Header } from "@/components/Header";

const HackathonForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const h = await getHackathon(id, token);
          setName(h.name || "");
          setDescription(h.description || "");
          setIsPublic(h.isPublic);
          setStartDate(h.startDate.slice(0, 16));
          setEndDate(h.endDate.slice(0, 16));
        } catch (e: any) {
          toast.error(e?.message || "Erro ao carregar hackathon");
        }
      })();
    }
  }, [id, isEdit, token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload: HackathonCreateRequest = {
      name,
      description,
      isPublic,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    };

    try {
      if (isEdit && id) {
        await updateHackathon(id, payload, token);
        toast.success("Hackathon atualizado");
      } else {
        await createHackathon(payload, token);
        toast.success("Hackathon criado");
      }
      navigate("/hackathons");
    } catch (e: any) {
      toast.error(e?.message || "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <h2 className="text-2xl font-orbitron font-bold bg-gradient-primary bg-clip-text text-transparent text-center">
              {isEdit ? "Editar Hackathon" : "Criar Hackathon"}
            </h2>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="start">Início</Label>
                <Input
                  id="start"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end">Fim</Label>
                <Input
                  id="end"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  Público
                </label>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate("/hackathons")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-primary shadow-neon hover:shadow-glow"
                    disabled={loading}
                  >
                    {loading ? "Salvando..." : "Salvar"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HackathonForm;
