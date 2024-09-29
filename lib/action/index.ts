"use server";

import { formSchema } from "@/app/dashboard/create/_components/form-create";
import { createClientServer } from "../supabase/server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { firstCondition, fourthCondition, secondCondition, thirdCondition } from "@/schema/condition";
import { error } from "console";




export const getHistoryUser = async () => {
  const supabase = await createClientServer();
  
  // Ambil data user yang sedang login
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }

  // Ambil history berdasarkan user_id
  const { data: history, error: historyError } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", user); // Hanya ambil riwayat untuk user yang sedang login

  if (historyError) {
    console.error("Error fetching history:", historyError);
    return null;
  }

  return history;

}



export const createNewHistory = async () => {
  const supabase = await createClientServer();
  // Fetch user session
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Default values for conditions
  const defaultFirstCondition = { user_id: user.id, tipe_rumah: "type 36" };
  const defaultSecondCondition = { user_id: user.id, jenis_lantai: "keramik" };
  const defaultThirdCondition = { user_id: user.id, jenis_atap: "genteng" };
  const defaultFourthCondition = { user_id: user.id, jenis_material: "batako" };

  // Insert default conditions
  const { error: firstError } = await supabase
    .from("first_condition")
    .insert([defaultFirstCondition]);

  const { error: secondError } = await supabase
    .from("second_condition")
    .insert([defaultSecondCondition]);

  const { error: thirdError } = await supabase
    .from("third_condition")
    .insert([defaultThirdCondition]);

  const { error: fourthError } = await supabase
    .from("fourth_condition")
    .insert([defaultFourthCondition]);

  // Handle errors
  if (firstError || secondError || thirdError || fourthError) {
    console.error("Error inserting conditions:", firstError, secondError, thirdError, fourthError);
    return { success: false, message: "Error inserting conditions" };
  }

  // Insert history record with the default conditions
  const { error: historyError } = await supabase
    .from("history")
    .insert([{
      user_id: user.id,
      luas_tanah: 0,
      type_rumah: "type 36",
      min_price: 0,
      max_price: 0
    }]);

  if (historyError) {
    console.error("Error inserting history:", historyError);
    return { success: false, message: "Error inserting history" };
  }

  return { success: true, message: "New history and conditions created successfully" };
};

export const submitFormStep1 = async (dataF: z.infer<typeof firstCondition>) => {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }

  // Save first condition (e.g., house type)
  const { error: firstError } = await supabase
    .from("first_condition")
    .insert([{ tipe_rumah: dataF.tipeRumah, user_id: user }]);

  if (firstError) {
    console.error("Error saving first condition:", firstError);
    return { success: false, message: "Error saving first condition" };
  }

  return { success: true, message: "Step 1 submitted successfully" };
};

export const submitFormStep2 = async (dataF: z.infer<typeof secondCondition>) => {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }

  // Save second condition (e.g., floor type)
  const { error: secondError } = await supabase
    .from("second_condition")
    .insert([{ jenis_lantai: dataF.jenisLantai, user_id: user }]);

  if (secondError) {
    console.error("Error saving second condition:", secondError);
    return { success: false, message: "Error saving second condition" };
  }

  return { success: true, message: "Step 2 submitted successfully" };
};

export const submitFormStep3 = async (dataF: z.infer<typeof thirdCondition>) => {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }

  // Save third condition (e.g., roof type)
  const { error: thirdError } = await supabase
    .from("third_condition")
    .insert([{ jenis_atap: dataF.jenisAtap, user_id: user }]);

  if (thirdError) {
    console.error("Error saving third condition:", thirdError);
    return { success: false, message: "Error saving third condition" };
  }

  return { success: true, message: "Step 3 submitted successfully" };
};

export const submitFinalForm = async (dataF: z.infer<typeof fourthCondition>) => {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }

  // Save fourth condition (e.g., material type)
  const { error: fourthError } = await supabase
    .from("fourth_condition")
    .insert([{ jenis_material: dataF.jenisMaterial, user_id: user }]);

  if (fourthError) {
    console.error("Error saving fourth condition:", fourthError);
    return { success: false, message: "Error saving fourth condition" };
  }

  // Now retrieve all conditions to insert into the final history
  // const { data: firstCondition } = await supabase
  //   .from("first_condition")
  //   .select("*")
  //   .eq("user_id", user)
  //   .single();

  // const { data: secondCondition } = await supabase
  //   .from("second_condition")
  //   .select("*")
  //   .eq("user_id", user)
  //   .single();

  // const { data: thirdCondition } = await supabase
  //   .from("third_condition")
  //   .select("*")
  //   .eq("user_id", user)
  //   .single();

  // const { data: fourthConditionData } = await supabase
  //   .from("fourth_condition")
  //   .select("*")
  //   .eq("user_id", user)
  //   .single();

  // if (!firstCondition || !secondCondition || !thirdCondition || !fourthConditionData) {
  //   console.error("Error retrieving conditions for final submission.",error.name);
  //   return { success: false, message: "Error retrieving conditions" };
  // }

  // Update empty history with all the conditions
  // const { error: historyUpdateError } = await supabase
  //   .from("history")
  //   .update({
    
  //     tipe_rumah: firstCondition.tipe_rumah,
  //     jenis_lantai: secondCondition.jenis_lantai,
  //     jenis_atap: thirdCondition.jenis_atap,
  //     jenis_material: fourthConditionData.jenis_material,
     
  //   })
  //   .eq("user_id", user);

  // if (historyUpdateError) {
  //   console.error("Error updating history:", historyUpdateError);
  //   return { success: false, message: "Error updating history" };
  // }

  return { success: true, message: "Multi-step form submitted and history updated successfully!" };
};