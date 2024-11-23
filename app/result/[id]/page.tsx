import { getResultByIdUser } from "@/lib/action";
import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: IProps) {
  const { id } = await params;
  const data = await getResultByIdUser(id);
  console.log(data);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Hasil Analisis</CardTitle>
        </CardHeader>
        <CardContent>
          {data ? (
            <div className="prose prose-green max-w-none dark:prose-invert">
              <p>
                <strong>Tipe Rumah:</strong> {data[0].tipeRumah ?? "Tidak ada"}
              </p>
              <p>
                <strong>Jenis Lantai:</strong> {data[0].jenisLantai}
              </p>
              <p>
                <strong>Jenis Atap:</strong> {data[0].jenisAtap}
              </p>
              <p>
                <strong>Jenis Material:</strong> {data[0].jenisMaterial}
              </p>
              <p>
                <strong>Hasil Analisis:</strong> {data[0].prompt_result}
              </p>
              <p>
                <strong>Waktu:</strong> {data[0].created_at}
              </p>
            </div>
          ) : (
            <p>Data tidak ditemukan</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
