
import { jsPDF } from "jspdf";
import { SolarParams, SolarResult } from "./types";

export const generatePDF = async (
  rooftopArea: number,
  location: { state: string; district: string },
  energyResult: SolarResult,
  tariffInfo: { rate: number; subsidy: number; maxSubsidy: number }
): Promise<Blob> => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set font sizes and styles
    const titleFontSize = 18;
    const sectionFontSize = 14;
    const normalFontSize = 10;
    const smallFontSize = 8;
    
    // Add title
    doc.setFontSize(titleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("SOLAR POTENTIAL REPORT", 105, 20, { align: "center" });
    
    // Add generated date
    doc.setFontSize(smallFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 27, { align: "center" });
    
    // Rooftop Information Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("ROOFTOP INFORMATION", 20, 40);
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);
    
    doc.setFontSize(normalFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Usable Area: ${rooftopArea.toFixed(2)} sq.m`, 20, 50);
    doc.text(`Location: ${location.district}, ${location.state}`, 20, 57);
    
    // Energy Production Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("ENERGY PRODUCTION", 20, 70);
    doc.setLineWidth(0.5);
    doc.line(20, 72, 190, 72);
    
    doc.setFontSize(normalFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Annual Energy: ${energyResult.annualEnergy.toLocaleString()} kWh`, 20, 80);
    
    doc.text("Monthly Breakdown:", 20, 87);
    
    // Monthly breakdown (in two columns)
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    
    let y = 95;
    for (let i = 0; i < 6; i++) {
      doc.text(`${months[i]}: ${energyResult.monthlyEnergy[i].toLocaleString()} kWh`, 25, y);
      doc.text(`${months[i+6]}: ${energyResult.monthlyEnergy[i+6].toLocaleString()} kWh`, 105, y);
      y += 7;
    }
    
    // Financial Analysis Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("FINANCIAL ANALYSIS", 20, 145);
    doc.setLineWidth(0.5);
    doc.line(20, 147, 190, 147);
    
    doc.setFontSize(normalFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Electricity Rate: ₹${tariffInfo.rate}/kWh`, 20, 155);
    doc.text(`Annual Savings: ₹${energyResult.annualSavings.toLocaleString()}`, 20, 162);
    doc.text(`Subsidy: ${tariffInfo.subsidy}% (up to ₹${tariffInfo.maxSubsidy.toLocaleString()})`, 20, 169);
    doc.text(`Estimated Payback Period: ${energyResult.paybackPeriod.toFixed(1)} years`, 20, 176);
    
    // Environmental Impact Section
    doc.setFontSize(sectionFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("ENVIRONMENTAL IMPACT", 20, 190);
    doc.setLineWidth(0.5);
    doc.line(20, 192, 190, 192);
    
    doc.setFontSize(normalFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`CO₂ Emissions Avoided: ${energyResult.co2Offset.toFixed(2)} kg per year`, 20, 200);
    doc.text("Equivalent to:", 20, 207);
    doc.text(`- ${energyResult.treesEquivalent} trees planted`, 25, 214);
    doc.text(`- ${energyResult.bulbsEquivalent.toLocaleString()} LED bulbs powered for an hour`, 25, 221);
    
    // Footer
    const footerY = 270;
    doc.setFontSize(smallFontSize);
    doc.text("This report is for informational purposes only. Actual solar performance may vary.", 105, footerY, { align: "center" });
    doc.text("© Solar Estimator Tool", 105, footerY + 5, { align: "center" });
    
    // Return the PDF as a blob
    return doc.output('blob');
  } catch (error) {
    console.error("Error generating PDF:", error);
    // If there's an error with jsPDF, fall back to simple text-based PDF
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
      ).join('\n      ')}
      
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
    
    // Convert the text to a Blob to simulate the download
    return new Blob([reportContent], { type: 'application/pdf' });
  }
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
