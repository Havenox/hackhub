import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { TeamsSection } from "@/components/TeamsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <HeroSection />
      <MarketplaceSection />
      <TeamsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
