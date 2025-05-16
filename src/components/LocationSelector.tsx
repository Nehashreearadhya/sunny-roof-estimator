
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { indianStates, State, District } from "@/data/indianStates";
import { getTariffData, defaultTariff } from "@/data/tariffs";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  onLocationChange: (stateId: number, districtId: number) => void;
}

const LocationSelector = ({ onLocationChange }: LocationSelectorProps) => {
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);

  // Update districts when state changes
  useEffect(() => {
    if (selectedState) {
      const state = indianStates.find(state => state.id === selectedState);
      if (state) {
        setDistricts(state.districts);
        setSelectedDistrict(null); // Reset district selection
      }
    } else {
      setDistricts([]);
      setSelectedDistrict(null);
    }
  }, [selectedState]);

  // Notify parent component when location changes
  useEffect(() => {
    if (selectedState && selectedDistrict) {
      onLocationChange(selectedState, selectedDistrict);
    }
  }, [selectedState, selectedDistrict, onLocationChange]);

  const handleStateChange = (value: string) => {
    const stateId = parseInt(value);
    setSelectedState(stateId);
  };

  const handleDistrictChange = (value: string) => {
    const districtId = parseInt(value);
    setSelectedDistrict(districtId);
  };

  // Get tariff info based on selected location
  const getTariffInfo = () => {
    if (selectedState && selectedDistrict) {
      const tariff = getTariffData(selectedState, selectedDistrict) || defaultTariff;
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Electricity Rate</p>
            <p className="text-xl font-semibold text-primary">₹{tariff.rate_per_kwh}/kWh</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500">Subsidy</p>
            <p className="text-xl font-semibold text-secondary">{tariff.subsidy_percentage}%</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-500">Max Subsidy</p>
            <p className="text-xl font-semibold text-accent-foreground">₹{tariff.subsidy_max_amount.toLocaleString()}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="card-gradient shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">State</label>
            <Select onValueChange={handleStateChange} value={selectedState?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state.id} value={state.id.toString()}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">District</label>
            <Select 
              onValueChange={handleDistrictChange} 
              value={selectedDistrict?.toString()} 
              disabled={!selectedState}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedState ? "Select district" : "Select state first"} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id.toString()}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Display tariff information */}
        {getTariffInfo()}
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
