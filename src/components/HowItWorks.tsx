
import { Card, CardContent } from "@/components/ui/card";
import { Upload, PencilRuler, BarChart3, FileDown } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Upload Your Roof Image",
      description: "Start by uploading an image of your rooftop, such as a screenshot from Google Maps or a photograph.",
      icon: <Upload className="h-10 w-10 text-primary" />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "Draw Usable Solar Area",
      description: "Use our drawing tool to outline the usable area on your roof where solar panels could be installed.",
      icon: <PencilRuler className="h-10 w-10 text-secondary" />,
      color: "bg-green-50"
    },
    {
      id: 3,
      title: "View Dashboard Insights",
      description: "Instantly see your estimated energy generation, cost savings, and environmental impact.",
      icon: <BarChart3 className="h-10 w-10 text-accent" />,
      color: "bg-yellow-50"
    },
    {
      id: 4,
      title: "Download PDF Report",
      description: "Get a detailed report with all calculations and recommendations for your solar installation.",
      icon: <FileDown className="h-10 w-10 text-orange-500" />,
      color: "bg-orange-50"
    }
  ];

  return (
    <section id="how-it-works" className="section-container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600">
          Estimate your solar potential in four simple steps, no complex tools or technical knowledge required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <Card key={step.id} className="card-gradient border-none shadow-md transition-transform duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${step.color} p-4 rounded-full mb-4`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 text-2xl font-bold text-primary">
                  {step.id}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
