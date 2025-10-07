import { motion } from "framer-motion";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background/95 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold bg-gradient-primary bg-clip-text text-transparent">
                Hackhub
              </h3>
            </div>
            <p className="text-muted-foreground font-exo">
              Revolucionando a formação de times em hackathons com networking e colaboração inspirados em MMORPGs.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-orbitron font-bold mb-4 text-foreground">Produto</h4>
            <ul className="space-y-2 font-exo">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentação</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-orbitron font-bold mb-4 text-foreground">Empresa</h4>
            <ul className="space-y-2 font-exo">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Carreira</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-orbitron font-bold mb-4 text-foreground">Conecte-se</h4>
            <div className="flex space-x-4">
              <a 
                href="http://github.com/havenox"
                target="_blank"
                className="p-2 bg-secondary/50 rounded-lg hover:bg-gradient-primary hover:shadow-neon transition-all duration-300 group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a 
                href="https://x.com/Havenox"
                target="_blank"
                className="p-2 bg-secondary/50 rounded-lg hover:bg-gradient-primary hover:shadow-neon transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a 
                href="https://www.linkedin.com/in/havenox/" 
                target="_blank"
                className="p-2 bg-secondary/50 rounded-lg hover:bg-gradient-primary hover:shadow-neon transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a 
                href="mailto:eduardonascto@msn.com" 
                className="p-2 bg-secondary/50 rounded-lg hover:bg-gradient-primary hover:shadow-neon transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-8 pt-8 text-center"
        >
          <p className="text-muted-foreground font-exo">
            © {currentYear} Hackhub. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};