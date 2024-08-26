"use server"

import { createClientServer } from "../supabase/server";



const conditions  = {
    soil_condition: 'pasir',
    structural_load: 'tinggi',
}

const result = "use reinforced concrete pile foundation";

export async function createDiagnosa() {
    const supabase = await createClientServer();
    const { data, error } = await supabase
    .from("history")
    .insert([
      {
        user_id: "user-id", // Replace with actual user ID
        soil_condition: conditions.soil_condition,
        structural_load: conditions.structural_load,
        recommendation_result: result,
      },
    ])
    .select();

    if (error) {
        console.error("Error creating diagnosis:", error);
        return;
      }
    
      // Assuming the ID is returned in the data object
      const newId = data?.[0]?.id;

        console.log("Diagnosis created with ID:", newId);
}