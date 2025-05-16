
import { Button } from "@/components/ui/button";
import { Sun, Cloud, ArrowDownCircle } from "lucide-react";
import Lottie from "lottie-react";
import solarPanelAnimation from "@/assets/animations/solar-panels.json";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-20 pb-10 relative overflow-hidden bg-solar-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Sun rays */}
        <div className="absolute top-20 right-20 w-[500px] h-[500px] opacity-30 sun-ray">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-solar-yellow to-yellow-300 blur-3xl"></div>
        </div>

        {/* Floating clouds */}
        <Cloud className="absolute top-20 left-[10%] text-sky-100 w-16 h-16 opacity-70 cloud-float" />
        <Cloud className="absolute top-40 right-[15%] text-white w-20 h-20 opacity-80 cloud-float" style={{ animationDelay: "-2s" }} />
        <Cloud className="absolute bottom-20 left-[20%] text-white w-24 h-24 opacity-90 cloud-float" style={{ animationDelay: "-4s" }} />
      </div>
      
      <div className="container mx-auto px-4 pt-16 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sun className="w-16 h-16 text-solar-yellow animate-float" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-solar-blue via-solar-green to-solar-yellow">
            Estimate Your Solar Potential
          </h1>
          
          <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
            Upload your roof image, draw your usable area, and discover your solar energy potential, savings, and environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all">
              Upload Roof Image
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 border-2 transition-all flex items-center gap-2">
              Learn More <ArrowDownCircle size={18} />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="card-gradient rounded-2xl p-6 shadow-lg">
            <div className="relative">
              <Lottie 
                animationData={solarPanelAnimation} 
                loop={true} 
                className="w-full h-auto rounded-xl object-cover shadow-md panel-glow"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
