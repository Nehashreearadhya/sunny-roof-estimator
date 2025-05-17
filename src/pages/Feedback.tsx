
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FeedbackItem {
  name: string;
  rating: number;
  feedback: string;
  isModerate?: boolean;
}

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState("");
  
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    {
      name: "Aarav Mehta",
      rating: 5,
      feedback: "Impressive tool! I was skeptical at first, but the solar estimator gave me accurate projections for my home. It helped me understand the potential savings and environmental impact. Highly recommended!"
    },
    {
      name: "Sneha Reddy",
      rating: 5,
      feedback: "Super easy to use! I loved how intuitive the interface is. Within seconds, I had an estimate for solar panel feasibility on my rooftop. This tool makes going solar a no-brainer!"
    },
    {
      name: "Rahul Singh",
      rating: 5,
      feedback: "Game-changer! This tool gave me insights I never thought about before. The ability to visualize solar potential for my home with real data was amazing. Excited to take the next steps!"
    },
    {
      name: "Priya Sharma",
      rating: 3,
      feedback: "Saved me so much time! Instead of researching endlessly, I got reliable estimates in minutes. The recommendations were helpful, and now I'm considering solar seriously!",
      isModerate: true
    },
    {
      name: "Vikram Das",
      rating: 3,
      feedback: "Perfect for decision-making! I had doubts about whether solar was worth the investment, but this estimator cleared everything up. The results were detailed, and the comparison feature was helpful!",
      isModerate: true
    }
  ]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple classification of review sentiment
    const isModerate = feedback.toLowerCase().includes('moderate') || feedback.length < 50;
    const rating = isModerate ? 3 : 5;
    
    const newFeedback: FeedbackItem = {
      name,
      rating,
      feedback,
      isModerate
    };
    
    setFeedbackList([newFeedback, ...feedbackList]);
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setFeedback("");
  };
  
  const renderStars = (count: number) => {
    return "🌟".repeat(count);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-solar-gradient">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">User Feedback and Reviews</h1>
            <p className="text-lg text-gray-700">See what people are saying about Solivolve</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">What Our Users Say</h2>
            
            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${item.isModerate ? "bg-orange-50 border-orange-400" : "bg-green-50 border-green-500"}`}>
                  <div className="font-bold mb-1">{item.name}</div>
                  <div className="mb-2">{renderStars(item.rating)}</div>
                  <p className="text-gray-700">"{item.feedback}"</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-primary">Leave Your Feedback</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Full Name</label>
                  <Input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email ID</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone Number</label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="feedback" className="block mb-1 font-medium text-gray-700">Your Feedback</label>
                  <Textarea 
                    id="feedback" 
                    rows={4} 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full py-6">
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Feedback;
