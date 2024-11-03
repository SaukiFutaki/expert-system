"use server"

import { createClientServer } from "../supabase/server"

export async function getDataConstruction(){
  const supabase = await createClientServer()

  const {data : authData} = await supabase.auth.getUser()
  const userId = authData.user?.id


  const { data, error } = await supabase
  .from('construction_analysis') // Sesuaikan nama tabel jika berbeda
  .select('id, user_id, tipeRumah, jenisLantai, jenisAtap, jenisMaterial, prompt_result, created_at')
  .eq('user_id', userId)


  return data
}