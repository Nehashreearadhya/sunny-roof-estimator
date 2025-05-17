
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DrawingToolProps {
  onAreaCalculated: (area: number) => void;
}

const DrawingTool = ({ onAreaCalculated }: DrawingToolProps) => {
  const [manualArea, setManualArea] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the new image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imageRef.current = img;
        setUploadedImage(event.target?.result as string);
      };
    };
    reader.readAsDataURL(file);
  };
  
  // Reset image
  const resetImage = () => {
    setUploadedImage(null);
    if (canvasRef.current && canvasRef.current.getContext('2d')) {
      canvasRef.current.getContext('2d')?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    onAreaCalculated(0);
  };
  
  // Handle manual area input
  const handleManualAreaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualArea(e.target.value);
  };
  
  const submitManualArea = () => {
    const area = parseFloat(manualArea);
    if (!isNaN(area) && area > 0) {
      onAreaCalculated(area);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="card-gradient shadow-lg">
        <CardHeader>
          <CardTitle>Upload Your Rooftop Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Canvas Container */}
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
            {!uploadedImage ? (
              <div className="text-center p-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Upload a roof image to calculate solar potential</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, PNG</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Image Preview */}
          {uploadedImage && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Your Uploaded Image</h4>
              </div>
              <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded rooftop" 
                  className="w-full h-auto object-contain max-h-[300px]"
                />
              </div>
            </div>
          )}

          {/* Tool Controls */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <div className="w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <span><Upload className="mr-2 h-4 w-4" /> Upload Image</span>
                  </Button>
                </div>
              </label>
            </div>
            
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetImage}
              disabled={!uploadedImage}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Manual Input */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">Or enter your roof area manually:</h4>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                placeholder="Area in square meters"
                value={manualArea}
                onChange={handleManualAreaInput}
                className="flex-1"
              />
              <Button onClick={submitManualArea}>Apply</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrawingTool;
