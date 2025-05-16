
import { SolarParams, SolarResult } from "./types";

// We'll use jspdf - we need to install it
export const generatePDF = async (
  rooftopArea: number,
  location: { state: string; district: string },
  energyResult: any,
  tariffInfo: { rate: number; subsidy: number; maxSubsidy: number }
): Promise<Blob> => {
  // This is a placeholder for the PDF generation
  // In a real app, you would use a library like jsPDF
  
  // Since we can't actually generate a PDF in this example without the required libraries,
  // we'll create a text representation that would go into the PDF
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `solar_report_${timestamp}.pdf`;
  
  const reportContent = `
    SOLAR POTENTIAL REPORT
    =====================
    
    Generated on: ${new Date().toLocaleString()}
    
    ROOFTOP INFORMATION
    ------------------
    Usable Area: ${rooftopArea.toFixed(2)} sq.m
    Location: ${location.district}, ${location.state}
    
    ENERGY PRODUCTION
    ----------------
    Annual Energy: ${energyResult.annualEnergy.toLocaleString()} kWh
    
    Monthly Breakdown:
    ${energyResult.monthlyEnergy.map((energy: number, i: number) => 
      `${getMonthName(i)}: ${energy.toLocaleString()} kWh`
    ).join('\n    ')}
    
    FINANCIAL ANALYSIS
    -----------------
    Electricity Rate: ₹${tariffInfo.rate}/kWh
    Annual Savings: ₹${energyResult.annualSavings.toLocaleString()}
    Subsidy: ${tariffInfo.subsidy}% (up to ₹${tariffInfo.maxSubsidy.toLocaleString()})
    Estimated Payback Period: ${energyResult.paybackPeriod.toFixed(1)} years
    
    ENVIRONMENTAL IMPACT
    ------------------
    CO₂ Emissions Avoided: ${energyResult.co2Offset.toFixed(2)} kg per year
    Equivalent to:
    - ${energyResult.treesEquivalent} trees planted
    - ${energyResult.bulbsEquivalent.toLocaleString()} LED bulbs powered for an hour
  `;
  
  // In a real application, you would create an actual PDF using jsPDF or another library
  // For now, we'll just convert the text to a Blob to simulate the download
  const pdfBlob = new Blob([reportContent], { type: 'application/pdf' });
  
  return pdfBlob;
};

// Helper functions
const getMonthName = (index: number): string => {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  return months[index];
};

// Function to trigger download of the PDF
export const downloadPDF = async (
  rooftopArea: number,
  location: { state: string; district: string },
  energyResult: any,
  tariffInfo: { rate: number; subsidy: number; maxSubsidy: number }
) => {
  try {
    const pdfBlob = await generatePDF(rooftopArea, location, energyResult, tariffInfo);
    
    // Create a URL for the blob
    const url = URL.createObjectURL(pdfBlob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `solar_report_${Date.now()}.pdf`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};
