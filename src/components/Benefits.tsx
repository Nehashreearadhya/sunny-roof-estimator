
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, BarChart3, Coins } from "lucide-react";
import Lottie from "lottie-react";
import environmentAnimation from "@/assets/animations/environment.json";

const Benefits = () => {
  const benefits = [
    {
      title: "No GPS or Location Required",
      description: "Calculate your solar potential without needing to share your precise location or address.",
      icon: <MapPin className="h-10 w-10 text-primary" />
    },
    {
      title: "Fast, Intuitive Interface",
      description: "Draw your rooftop area directly on uploaded images for quick and accurate estimations.",
      icon: <Zap className="h-10 w-10 text-secondary" />
    },
    {
      title: "Comprehensive Insights",
      description: "Get detailed information on energy generation, cost savings, and environmental impact.",
      icon: <BarChart3 className="h-10 w-10 text-accent" />
    },
    {
      title: "Government Subsidy Integration",
      description: "Automatically incorporate location-specific electricity rates and solar subsidies.",
      icon: <Coins className="h-10 w-10 text-orange-500" />
    }
  ];

  return (
    <section id="benefits" className="section-container bg-solar-gradient">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits</h2>
        <p className="text-lg text-gray-600">
          Discover why our solar estimator is the simplest way to evaluate your solar energy potential.
        </p>
        
        <div className="max-w-md mx-auto mt-6 mb-10">
          <Lottie 
            animationData={environmentAnimation} 
            loop={true} 
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="card-gradient border-none overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex items-center justify-center md:w-1/3">
                  <div className="bg-white rounded-full p-4 shadow-md">
                    {benefit.icon}
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <div className="card-gradient p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Go Solar, Save Money, and Help the Environment
          </h3>
          <p className="text-lg text-gray-600 mb-0">
            With our estimator, you're one step closer to making an informed decision about your solar investment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
