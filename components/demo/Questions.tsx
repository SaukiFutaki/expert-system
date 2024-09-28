"use client"
import { useState } from "react";

interface HouseDesign {
  id: string;
  house_type: string;
  description: string;
  budget: number;
}

interface CostEstimation {
  id: string;
  design_id: string;
  total_cost: number;
  details: string;
}

export default function HousePlanner() {
  const [budget, setBudget] = useState<string>("");
  const [houseType, setHouseType] = useState<string>("");
  const [designResult, setDesignResult] = useState<HouseDesign | null>(null);
  const [designId, setDesignId] = useState<string>("");
  const [costEstimation, setCostEstimation] = useState<CostEstimation | null>(null);

  const handleGenerateDesign = async () => {
    const budgetNumber = parseFloat(budget);
    const design = await generateHouseDesign(budgetNumber, houseType);
    setDesignResult(design);
  };

  const handleGenerateCostEstimation = async () => {
    const estimation = await generateCostEstimation(designId);
    setCostEstimation(estimation);
  };

  return (
    <div>
      <h1>House Planner</h1>

      {/* Bagian 1: Input budget dan tipe rumah untuk mendapatkan desain rumah */}
      <div>
        <h2>Generate House Design</h2>
        <input
          type="text"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="text"
          placeholder="House Type"
          value={houseType}
          onChange={(e) => setHouseType(e.target.value)}
        />
        <button onClick={handleGenerateDesign}>Generate Design</button>
        {designResult && (
          <div>
            <h3>Design Result:</h3>
            <p>ID: {designResult.id}</p>
            <p>House Type: {designResult.house_type}</p>
            <p>Design Description: {designResult.description}</p>
          </div>
        )}
      </div>

      {/* Bagian 2: Input ID desain untuk mendapatkan RAB */}
      <div>
        <h2>Generate Cost Estimation</h2>
        <input
          type="text"
          placeholder="Design ID"
          value={designId}
          onChange={(e) => setDesignId(e.target.value)}
        />
        <button onClick={handleGenerateCostEstimation}>Generate RAB</button>
        {costEstimation && (
          <div>
            <h3>Cost Estimation:</h3>
            <p>Total Cost: {costEstimation?.total_cost}</p>
            <p>Details: {costEstimation?.details}</p>
          </div>
        )}
      </div>
    </div>
  );
}
