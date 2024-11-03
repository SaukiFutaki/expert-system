import { createClientServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Request Body:", body);
  const { tipeRumah, jenisLantai, jenisAtap, jenisMaterial, promptResult } =
    body;

  const supabase = await createClientServer();
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    console.error("User authentication error:", authError);
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const { data, error } = await supabase
      .from("construction_analysis")
      .insert([
        {
          user_id: userData.user.id,
          tipeRumah,
          jenisLantai,
          jenisAtap,
          jenisMaterial,
          prompt_result: promptResult,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Error saving data", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Data saved", data });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving data", details: error },
      { status: 500 }
    );
  }
}
