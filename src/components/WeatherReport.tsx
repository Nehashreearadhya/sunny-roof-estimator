
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Cloud, CloudRain, Sun, CloudSun, Wind, Droplets, CircleOff } from "lucide-react";
import Lottie from "lottie-react";
import weatherAnimation from "@/assets/animations/weather.json";

interface WeatherReportProps {
  stateId: number | null;
  districtId: number | null;
}

// Weather condition types
type WeatherCondition = "sunny" | "cloudy" | "partly_cloudy" | "rainy" | "unknown";

interface WeatherData {
  date: Date;
  condition: WeatherCondition;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

// Mock function to simulate weather API based on location
const fetchWeatherData = (stateId: number, districtId: number): WeatherData[] => {
  // In a real app, this would be an API call using the state and district
  const conditions: WeatherCondition[] = ["sunny", "cloudy", "partly_cloudy", "rainy", "unknown"];
  
  // Seed random with stateId and districtId to get consistent but different weather per location
  const seed = stateId * 100 + districtId;
  
  // Generate 7 days of weather data
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Use the seed to create deterministic but varying weather
    const conditionIndex = (seed + i) % conditions.length;
    
    return {
      date,
      condition: conditions[conditionIndex],
      temperature: 25 + Math.sin(seed + i) * 5, // 20-30°C
      humidity: 60 + ((seed + i * 3) % 30), // 60-90%
      pressure: 1010 + ((seed + i * 2) % 15), // 1010-1025 hPa
      windSpeed: 2 + ((seed + i) % 8) // 2-10 km/h
    };
  });
};

const WeatherReport = ({ stateId, districtId }: WeatherReportProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    if (stateId && districtId) {
      const data = fetchWeatherData(stateId, districtId);
      setWeatherData(data);
    } else {
      setWeatherData([]);
    }
  }, [stateId, districtId]);

  const getWeatherIcon = (condition: WeatherCondition) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "partly_cloudy":
        return <CloudSun className="h-8 w-8 text-solar-yellow" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <CircleOff className="h-8 w-8 text-gray-400" />;
    }
  };

  const getWeatherText = (condition: WeatherCondition) => {
    switch (condition) {
      case "sunny":
        return "Sunny";
      case "cloudy":
        return "Cloudy";
      case "partly_cloudy":
        return "Partly Cloudy";
      case "rainy":
        return "Rainy";
      default:
        return "Unknown";
    }
  };

  if (!stateId || !districtId) {
    return (
      <Card className="card-gradient shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-solar-yellow" />
            Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Lottie animationData={weatherAnimation} className="w-48 h-48" />
          <p className="text-center text-gray-500 mt-4">
            Select a location to view the weather forecast for solar panel efficiency.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-solar-yellow" />
          7-Day Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
          {weatherData.map((day, index) => (
            <div key={index} className="flex flex-col items-center bg-white/50 p-3 rounded-lg text-center">
              <p className="text-sm font-medium mb-1">{format(day.date, "E, MMM d")}</p>
              {getWeatherIcon(day.condition)}
              <p className="text-sm font-semibold mt-1">{getWeatherText(day.condition)}</p>
              <p className="text-xl font-bold mt-1">{day.temperature.toFixed(1)}°C</p>
              
              <div className="grid grid-cols-2 gap-1 w-full mt-2 text-xs text-gray-600">
                <div className="flex items-center justify-center gap-1">
                  <Droplets className="h-3 w-3" />
                  <span>{day.humidity}%</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Wind className="h-3 w-3" />
                  <span>{day.windSpeed} km/h</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                <span>{day.pressure} hPa</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-1 text-primary">Solar Panel Efficiency</h4>
          <p className="text-xs text-gray-600">
            Weather conditions directly affect solar panel performance. Sunny days provide optimal energy generation, 
            while cloudy or rainy conditions can reduce efficiency by 10-25%.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherReport;
