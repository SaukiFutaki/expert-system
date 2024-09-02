"use server"

import { createClientServer } from "../supabase/server";



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

export async function generateHouseDesign(
  budget: number,
  houseType: string
): Promise<HouseDesign | null> {
  const supabase = await createClientServer();
  const { data, error } = await supabase
    .from("house_designs")
    .select("*")
    .eq("house_type", houseType)
    .lte("budget", budget)
    .single();

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    throw new Error("Failed to fetch house design");
  }

  return data as HouseDesign;
}

export async function generateCostEstimation(
  designId: string
): Promise<CostEstimation | null> {
  
const supabase =  await createClientServer();
  const { data, error } = await supabase
    .from("cost_estimations")
    .select("*")
    .eq("design_id", designId)
    .single(); // Mengambil estimasi biaya untuk desain yang dipilih

  if (error) {
    throw new Error("Failed to fetch cost estimation");
  }

  return data as CostEstimation;
}