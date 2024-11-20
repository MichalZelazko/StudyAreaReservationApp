import HeroSection from "@/components/HeroSection";
import PopularBuildings from "@/components/PopularBuildings";

const HomePage = () => {
  return (
    <div className="flex flex-col flex-grow">
      <HeroSection />
      <PopularBuildings />
    </div>
  );
};

export default HomePage;
