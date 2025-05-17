
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DrawingTool from "@/components/DrawingTool";
import LocationSelector from "@/components/LocationSelector";
import EnergyDashboard from "@/components/EnergyDashboard";
import SolarHeatmap from "@/components/SolarHeatmap";
import WeatherReport from "@/components/WeatherReport";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [rooftopArea, setRooftopArea] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const [solarResults, setSolarResults] = useState(null);

  const handleAreaCalculated = (area: number) => {
    setRooftopArea(area);
  };

  const handleLocationChange = (stateId: number, districtId: number) => {
    setSelectedStateId(stateId);
    setSelectedDistrictId(districtId);
  };

  const handleSolarResultsCalculated = (results: any) => {
    setSolarResults(results);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Core Functionality Section */}
        <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DrawingTool onAreaCalculated={handleAreaCalculated} />
            </div>
            <div>
              <LocationSelector onLocationChange={handleLocationChange} />
            </div>
          </div>
          
          <div className="mt-6">
            <EnergyDashboard 
              area={rooftopArea} 
              stateId={selectedStateId} 
              districtId={selectedDistrictId}
              onResultsCalculated={handleSolarResultsCalculated}
            />
          </div>

          {/* Solar Heatmap Section */}
          <div className="mt-8">
            <SolarHeatmap result={solarResults} />
          </div>

          {/* Weather Report Section */}
          <div className="mt-8">
            <WeatherReport 
              stateId={selectedStateId} 
              districtId={selectedDistrictId} 
            />
          </div>
        </section>
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Benefits Section */}
        <Benefits />
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
