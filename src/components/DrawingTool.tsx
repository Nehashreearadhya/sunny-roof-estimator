
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Eraser, Upload, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DrawingToolProps {
  onAreaCalculated: (area: number) => void;
}

const DrawingTool = ({ onAreaCalculated }: DrawingToolProps) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState<"pen" | "eraser">("pen");
  const [manualArea, setManualArea] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showOriginalImage, setShowOriginalImage] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  const polygonPoints = useRef<{ x: number; y: number }[]>([]);
  
  // Initialize the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0ea5e9";
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
    
    // Redraw everything if we have an image
    if (uploadedImage) {
      const img = new Image();
      img.src = uploadedImage;
      img.onload = () => {
        if (!ctx) return;
        // Clear and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        imageRef.current = img;
        
        // Redraw polygon if we have points
        if (polygonPoints.current.length > 0) {
          drawPolygon();
        }
      };
    }
    
    // Adjust canvas on resize
    const handleResize = () => {
      if (!canvas) return;
      
      // Store the current drawing
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore context properties
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0ea5e9";
      ctx.lineWidth = 5;
      
      // Restore the drawing
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uploadedImage]);
  
  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        if (!canvasRef.current || !ctxRef.current) return;
        
        // Clear canvas and reset polygon
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        polygonPoints.current = [];
        
        // Draw the new image
        ctxRef.current.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        imageRef.current = img;
        setUploadedImage(event.target?.result as string);
        setShowOriginalImage(true); // Show the original image when uploaded
      };
    };
    reader.readAsDataURL(file);
  };
  
  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!uploadedImage) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (drawingMode === "pen") {
      polygonPoints.current.push({ x, y });
      drawPolygon();
    }
    
    setIsDrawing(true);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !uploadedImage || !ctxRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (drawingMode === "eraser" && polygonPoints.current.length > 0) {
      // Find the closest point to the cursor and remove it
      let minDist = Number.MAX_VALUE;
      let minIndex = -1;
      
      polygonPoints.current.forEach((point, index) => {
        const dist = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
        if (dist < minDist && dist < 20) {  // 20px threshold for eraser
          minDist = dist;
          minIndex = index;
        }
      });
      
      if (minIndex !== -1) {
        polygonPoints.current.splice(minIndex, 1);
        redrawCanvas();
      }
    }
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    calculateArea();
  };
  
  // Draw the polygon based on points
  const drawPolygon = () => {
    if (!ctxRef.current || !canvasRef.current || polygonPoints.current.length === 0) return;
    
    // Redraw the image
    if (imageRef.current) {
      ctxRef.current.drawImage(
        imageRef.current, 
        0, 
        0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );
    }
    
    // Draw the polygon
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(polygonPoints.current[0].x, polygonPoints.current[0].y);
    
    for (let i = 1; i < polygonPoints.current.length; i++) {
      ctxRef.current.lineTo(polygonPoints.current[i].x, polygonPoints.current[i].y);
    }
    
    if (polygonPoints.current.length > 2) {
      // Close the polygon
      ctxRef.current.lineTo(polygonPoints.current[0].x, polygonPoints.current[0].y);
    }
    
    ctxRef.current.stroke();
    
    // Fill with semi-transparent color
    ctxRef.current.fillStyle = "rgba(14, 165, 233, 0.2)";
    ctxRef.current.fill();
    
    // Draw points
    polygonPoints.current.forEach(point => {
      if (!ctxRef.current) return;
      ctxRef.current.beginPath();
      ctxRef.current.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctxRef.current.fillStyle = "#0ea5e9";
      ctxRef.current.fill();
    });
  };
  
  // Redraw the canvas (image + polygon)
  const redrawCanvas = () => {
    if (!canvasRef.current || !ctxRef.current) return;
    
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (imageRef.current) {
      ctxRef.current.drawImage(
        imageRef.current, 
        0, 
        0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );
    }
    
    if (polygonPoints.current.length > 0) {
      drawPolygon();
    }
    
    calculateArea();
  };
  
  // Reset drawing
  const resetDrawing = () => {
    polygonPoints.current = [];
    redrawCanvas();
    onAreaCalculated(0);
  };
  
  // Calculate polygon area (in pixels, then convert to approximate sq meters)
  const calculateArea = () => {
    if (polygonPoints.current.length < 3) {
      onAreaCalculated(0);
      return;
    }
    
    let area = 0;
    const points = polygonPoints.current;
    
    // Shoelace formula for polygon area
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    
    area = Math.abs(area) / 2;
    
    // Convert pixel area to square meters (rough approximation for visualization)
    // In a real application, you'd need proper calibration or scale information
    const pixelToMeterRatio = 0.1;  // This is a placeholder value
    const areaInSqMeters = area * pixelToMeterRatio;
    
    onAreaCalculated(areaInSqMeters);
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

  // Toggle original image view
  const toggleOriginalImage = () => {
    setShowOriginalImage(!showOriginalImage);
  };
  
  return (
    <div className="w-full space-y-6">
      <Card className="card-gradient shadow-lg">
        <CardHeader>
          <CardTitle>Draw Your Rooftop Area</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Image Preview */}
          {uploadedImage && showOriginalImage && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">Uploaded Image</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleOriginalImage}
                >
                  Hide Original
                </Button>
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

          {/* Canvas Container */}
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
            {!uploadedImage ? (
              <div className="text-center p-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Upload a roof image to start drawing</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: JPG, PNG</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={endDrawing}
                  onMouseLeave={endDrawing}
                  className="absolute inset-0 w-full h-full cursor-crosshair"
                />
                {!showOriginalImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={toggleOriginalImage}
                  >
                    Show Original
                  </Button>
                )}
              </div>
            )}
          </div>

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
              variant={drawingMode === "pen" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setDrawingMode("pen")}
              disabled={!uploadedImage}
            >
              <Pen className="mr-2 h-4 w-4" /> Draw
            </Button>
            
            <Button
              variant={drawingMode === "eraser" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setDrawingMode("eraser")}
              disabled={!uploadedImage}
            >
              <Eraser className="mr-2 h-4 w-4" /> Erase
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
              onClick={resetDrawing}
              disabled={!uploadedImage}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Manual Input */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2">Or enter manually:</h4>
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
