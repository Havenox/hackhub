# [GranHackathon 2025 - Proposta de Solução: HackHub](https://hackhub.impulse8.com.br/)
👉[Protótipo em Produção](https://hackhub.impulse8.com.br/)

## Problema

* A **formação de times em hackathons online** pode ser trabalhosa, causando confusão e até desorganização.
* No caso do GRAN, o responsável pelo Discord, embora muito competente, precisou **gerenciar manualmente tags, checar e-mails, validar nomes, verificar se o aluno passou na triagem e se não estava em outro grupo**.
* Voluntários tiveram que **encaixar pessoas manualmente**, entrando em contato individualmente, aguardando respostas e tentando resolver situações de última hora.
* Isso resultou em **retrabalho, perda de tempo, frustração dos alunos** e desvio do foco principal do hackathon: networking, inovação e prototipagem.

## Solução

* Criar um sistema, uma **plataforma SaaS para organização de hackathons e formação de times**, focada em **networking estruturado**.
* Inspirada nos sistemas de recrutamento de guildas de MMORPGs (Jogos Online Massivos), a plataforma centraliza **avisos, prazos e regras**, além de oferecer ferramentas de **criação e recrutamento de grupos**.
* Principais diferenciais:

  * **Automação de validações**: checagem de e-mail, elegibilidade e duplicidade de participação em grupos.
  * **Recrutamento estruturado**: times criam "vagas" com perfil desejado e participantes se candidatam.
  * **Matchmaking inteligente**: sugestão de times baseada em interesses, habilidades e microtemas escolhidos.
  * **Networking ativo**: registro de conexões feitas no hackathon, que permanecem disponíveis após o evento.

## Funcionalidades Principais

1. **Gestão do evento (Organizador)**

   * Cadastro de hackathon (público ou privado).
   * Publicação de cronograma, temas e avisos.
   * Painel de acompanhamento de times formados.

2. **Formação de times (Participante)**

   * Criar time: nome, imagem, descrição da ideia.
   * Abrir recrutamento (definir vagas e perfis procurados).
   * Receber candidaturas, aceitar ou recusar membros.

3. **Automação de processos**

   * Verificação automática de elegibilidade e status do aluno.
   * Bloqueio de duplicidade (mesma pessoa não pode estar em dois grupos).
   * Notificações automáticas sobre prazos e convites pendentes.

4. **Networking e integração social**

   * Explorar times abertos e candidatar-se.
   * Chat interno de time.
   * Painel de conexões pós-evento.

## Impacto

* **Para alunos:** facilita entrada em times, reduz ansiedade e promove conexões mais ricas.
* **Para organizadores (ex.: Gran):** elimina o trabalho manual, aumenta a eficiência e reduz falhas.
* **Para o mercado:** pode se tornar um **SaaS white-label** para universidades e empresas organizarem seus próprios hackathons, e/ou até mesmo um **grande Hub de Hackathons** onde pessoas de várias áreas podem de reunir em busca de algum hackathon para participar em busca de oportunidades de aprendizado e networking.

## Tecnologias Possíveis (Protótipo 48h)

* **Frontend:** React + Vite.
* **Backend:** .NET Core (C#).
* **Banco:** MariaDB.
* **Hospedagem:** Servidor Próprio.
* **Matchmaking inicial:** filtros por tags/interesses (IA como evolução futura).

## Próximos Passos

1. Lançar MVP com foco em **formação de times + avisos centralizados**.
2. Evoluir para **matchmaking com IA**.
3. Criar **marketplace público de hackathons** para escalar a solução.

---

**Resumo:**
"Estamos trazendo para os hackathons acadêmicos a lógica das guildas dos MMORPGs: uma plataforma que elimina o trabalho manual e transforma a formação de times em uma experiência de networking estruturado e inteligente."


![Demonstração](hackhubdemo.gif)


---

## Deploy do Protótipo em Produção:

A aplicação está em produção no link:  
👉 [https://hackhub.impulse8.com.br/](https://hackhub.impulse8.com.br/)

### Stack em Produção
* **Backend:** .NET C# rodando em containers Docker.  
* **Frontend:** React + Vite em container Docker.  
* **Banco de Dados:** MariaDB em container Docker.  
* **Infraestrutura:** Servidor próprio (Homelab Caseiro).

### Documentação da API
Swagger disponível em:  
👉 [https://hackhubapi.impulse8.com.br/swagger/index.html](https://hackhubapi.impulse8.com.br/swagger/index.html)


