
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SolarResult } from "@/utils/types";
import { calculateSolarPotential, formatCurrency } from "@/utils/calculateEnergy";
import { downloadPDF } from "@/utils/generatePDF";
import { indianStates } from "@/data/indianStates";
import { getTariffData, defaultTariff } from "@/data/tariffs";
import { Sun, Download, BarChart3, Leaf, Lightbulb, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface EnergyDashboardProps {
  area: number;
  stateId: number | null;
  districtId: number | null;
}

const EnergyDashboard = ({ area, stateId, districtId }: EnergyDashboardProps) => {
  const [results, setResults] = useState<SolarResult | null>(null);
  const [activeTab, setActiveTab] = useState("energy");

  useEffect(() => {
    if (area > 0) {
      const tariff = stateId && districtId 
        ? getTariffData(stateId, districtId) || defaultTariff 
        : defaultTariff;

      const result = calculateSolarPotential({
        area,
        electricityRate: tariff.rate_per_kwh,
        systemCost: 70000, // Cost per kW in INR
        subsidyPercentage: tariff.subsidy_percentage,
        subsidyMaxAmount: tariff.subsidy_max_amount
      });
      
      setResults(result);
    } else {
      setResults(null);
    }
  }, [area, stateId, districtId]);

  const getLocationName = (): { state: string; district: string } => {
    let stateName = "Default";
    let districtName = "Location";
    
    if (stateId) {
      const state = indianStates.find(s => s.id === stateId);
      if (state) {
        stateName = state.name;
        
        if (districtId) {
          const district = state.districts.find(d => d.id === districtId);
          if (district) {
            districtName = district.name;
          }
        }
      }
    }
    
    return { state: stateName, district: districtName };
  };

  const handleDownloadPDF = () => {
    if (!results || !stateId || !districtId) return;
    
    const location = getLocationName();
    const tariff = getTariffData(stateId, districtId) || defaultTariff;
    
    downloadPDF(
      area,
      location,
      results,
      { 
        rate: tariff.rate_per_kwh, 
        subsidy: tariff.subsidy_percentage, 
        maxSubsidy: tariff.subsidy_max_amount 
      }
    );
  };

  // Prepare data for charts
  const getMonthlyEnergyData = () => {
    if (!results) return [];
    
    return results.monthlyEnergy.map((value, index) => ({
      month: getMonthName(index).substring(0, 3),
      energy: value
    }));
  };
  
  const getMonthlySavingsData = () => {
    if (!results) return [];
    
    return results.monthlySavings.map((value, index) => ({
      month: getMonthName(index).substring(0, 3),
      savings: value
    }));
  };
  
  const getEnvironmentalData = () => {
    if (!results) return [];
    
    return [
      { name: 'CO2 Reduced', value: results.co2Offset },
      { name: 'Trees Equiv.', value: results.treesEquivalent * 20 }, // Scaled for visualization
    ];
  };
  
  const getMonthName = (index: number): string => {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return months[index];
  };
  
  // COLORS
  const COLORS = ['#0ea5e9', '#22c55e', '#facc15', '#ef4444'];
  
  if (!area || area <= 0) {
    return (
      <Card className="card-gradient shadow-lg h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-solar-yellow" /> 
            Solar Energy Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              Draw or enter your rooftop area to see energy estimates
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-solar-yellow" /> 
          Solar Energy Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryCard 
                title="Annual Energy" 
                value={`${results.annualEnergy.toLocaleString()} kWh`}
                icon={<Sun className="h-4 w-4" />}
                color="bg-blue-50"
              />
              <SummaryCard 
                title="Annual Savings" 
                value={formatCurrency(results.annualSavings)}
                icon={<DollarSign className="h-4 w-4" />}
                color="bg-green-50"
              />
              <SummaryCard 
                title="CO₂ Offset" 
                value={`${Math.round(results.co2Offset).toLocaleString()} kg`}
                icon={<Leaf className="h-4 w-4" />}
                color="bg-yellow-50"
              />
              <SummaryCard 
                title="Bulbs Powered" 
                value={results.bulbsEquivalent.toLocaleString()}
                icon={<Lightbulb className="h-4 w-4" />}
                color="bg-orange-50"
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="energy" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="energy">Energy</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="energy" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getMonthlyEnergyData()} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value} kWh`, 'Energy']}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem' }}
                      />
                      <Bar dataKey="energy" fill="#0ea5e9" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Estimated monthly energy production (kWh)
                </p>
              </TabsContent>
              
              <TabsContent value="savings" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getMonthlySavingsData()} margin={{ top: 5, right: 30, left: 20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), 'Savings']}
                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem' }}
                      />
                      <Bar dataKey="savings" fill="#22c55e" barSize={30} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Estimated monthly cost savings (₹)
                </p>
              </TabsContent>
              
              <TabsContent value="environment" className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-1/2 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getEnvironmentalData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {getEnvironmentalData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => {
                            if (name === 'CO2 Reduced') return [`${value} kg`, name];
                            if (name === 'Trees Equiv.') return [`${Math.round(results.treesEquivalent)} trees`, 'Trees Equivalent'];
                            return [value, name];
                          }}
                          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0.5rem' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-4 p-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">CO₂ Offset Annually</p>
                        <p className="text-lg font-semibold">{Math.round(results.co2Offset).toLocaleString()} kg</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Leaf className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Trees Equivalent</p>
                        <p className="text-lg font-semibold">{results.treesEquivalent} trees</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Lightbulb className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">LED Bulbs Powered</p>
                        <p className="text-lg font-semibold">{results.bulbsEquivalent.toLocaleString()} bulbs for 1 hour</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Download Button */}
            <div className="flex justify-center pt-4">
              <Button onClick={handleDownloadPDF} className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF Report
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading calculations...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard = ({ title, value, icon, color }: SummaryCardProps) => (
  <div className={`p-3 rounded-lg ${color}`}>
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <p className="text-xs font-medium text-gray-500">{title}</p>
    </div>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default EnergyDashboard;
