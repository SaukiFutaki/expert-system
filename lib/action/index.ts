"use server";

import { formSchema } from "@/app/dashboard/create/_components/form-create";
import { createClientServer } from "../supabase/server";

import { z } from "zod";
import { redirect } from "next/navigation";

export const submitForm = async (dataF: z.infer<typeof formSchema>) => {
  const supabase = await createClientServer();
  const { data } = await supabase.auth.getUser();
  const user = data?.user?.id;

  if (!user) {
    throw new Error("User not found");
  }
  const { error: landError } = await supabase
    .from("land_area")
    .insert([{ luas_tanah: dataF.luasTanah, user_id: user }]);

  if (landError) {
    console.error("Error saving land area:", landError);
    return;
  }

  // Save timeRumah to house_type table
  const { error: houseTypeError } = await supabase
    .from("house_type")
    .insert([{ type_rumah: dataF.timeRumah, user_id: user }]);

  if (houseTypeError) {
    console.error("Error saving house type:", houseTypeError);
    return;
  }

  const { error: priceRangeError } = await supabase.from("price_range").insert([
    {
      min_price: dataF.priceRange[0],
      max_price: dataF.priceRange[1],
      user_id: user,
    },
  ]);

  if (priceRangeError) {
    console.error("Error saving price range:", priceRangeError);
    return;
  }

  const { error: historyError } = await supabase.from("history").insert([
    {
      user_id: user,
      luas_tanah: dataF.luasTanah,
      type_rumah: dataF.timeRumah,
      min_price: dataF.priceRange[0],
      max_price: dataF.priceRange[1],
    },
  ]);
  if (historyError) {
    console.error("Error saving to history:", historyError);
    return;
  }
  console.log("Data and history saved successfully!");
 
};



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