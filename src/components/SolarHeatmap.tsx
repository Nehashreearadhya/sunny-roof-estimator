
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun } from "lucide-react";
import { SolarResult } from "@/utils/types";

interface SolarHeatmapProps {
  result: SolarResult | null;
}

const SolarHeatmap = ({ result }: SolarHeatmapProps) => {
  const [months] = useState([
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]);

  if (!result) return null;

  // Find the maximum energy value for scaling
  const maxEnergy = Math.max(...result.monthlyEnergy);

  // Get color intensity based on energy value
  const getColorIntensity = (value: number) => {
    const normalized = value / maxEnergy;
    
    // Create different color gradients based on intensity
    if (normalized > 0.8) {
      return 'bg-orange-500'; // Highest energy - hot orange
    } else if (normalized > 0.6) {
      return 'bg-yellow-400'; // High energy - bright yellow
    } else if (normalized > 0.4) {
      return 'bg-yellow-300'; // Medium-high energy - yellow
    } else if (normalized > 0.2) {
      return 'bg-blue-300'; // Medium-low energy - light blue
    } else {
      return 'bg-blue-200'; // Low energy - very light blue
    }
  };

  return (
    <Card className="card-gradient shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-solar-yellow" /> 
          Solar Energy Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-2">
          <div className="grid grid-cols-12 gap-1 mb-4">
            {months.map((month, index) => (
              <div key={month} className="flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-1">{month}</div>
                <div 
                  className={`w-full h-16 md:h-24 rounded-md ${getColorIntensity(result.monthlyEnergy[index])} transition-all duration-200 hover:opacity-90 hover:scale-105`}
                  title={`${month}: ${result.monthlyEnergy[index]} kWh`}
                >
                  <div className="flex items-end justify-center h-full pb-1">
                    <span className="text-xs font-semibold text-white drop-shadow-md">
                      {Math.round(result.monthlyEnergy[index])}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4 px-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-200"></div>
              <span className="text-xs text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-300"></div>
              <span className="text-xs text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-yellow-300"></div>
              <span className="text-xs text-gray-600">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-yellow-400"></div>
              <span className="text-xs text-gray-600">Very good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-orange-500"></div>
              <span className="text-xs text-gray-600">Excellent</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Annual Production Overview</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500">Peak Month</p>
                <p className="text-lg font-semibold">{months[result.monthlyEnergy.indexOf(maxEnergy)]}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xs text-gray-500">Peak Production</p>
                <p className="text-lg font-semibold">{Math.round(maxEnergy)} kWh</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">Annual Average</p>
                <p className="text-lg font-semibold">{Math.round(result.annualEnergy / 12)} kWh</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-500">Total Annual</p>
                <p className="text-lg font-semibold">{Math.round(result.annualEnergy)} kWh</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolarHeatmap;
