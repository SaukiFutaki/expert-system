"use client";

import React from 'react';
import { useChat } from 'ai/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, RectangleHorizontal, Blocks } from "lucide-react";

export default function CivilExpertForm() {
  const [formData, setFormData] = React.useState({
    tipeRumah: '',
    jenisLantai: '',
    jenisAtap: '',
    jenisMaterial: ''
  });

  const { messages, handleSubmit, handleInputChange, input } = useChat({
    api: "api/genai",
  });

  const generatePrompt = (data:any) => {
    return `Anda adalah seorang ahli teknik sipil berpengalaman dengan keahlian khusus dalam konstruksi rumah tinggal. Berikan analisis profesional dan rekomendasi berdasarkan spesifikasi rumah berikut:

SPESIFIKASI BANGUNAN:
- Tipe Rumah: ${data.tipeRumah} (meter persegi)
- Jenis Lantai: ${data.jenisLantai}
- Jenis Atap: ${data.jenisAtap}
- Material Dinding: ${data.jenisMaterial}

Berikan analisis mendetail yang mencakup:

1. ANALISIS KESESUAIAN:
- Evaluasi kesesuaian kombinasi material yang dipilih
- Analisis kecocokan material dengan ukuran dan tipe rumah
- Pertimbangan iklim dan kondisi lingkungan secara umum

2. KEKUATAN & DURABILITAS:
- Estimasi umur material
- Ketahanan terhadap cuaca dan kondisi lingkungan
- Potensi masalah struktural yang perlu diwaspadai

3. PEMELIHARAAN:
- Rekomendasi perawatan rutin
- Perkiraan interval pemeliharaan
- Tips pencegahan kerusakan

4. BIAYA:
- Perkiraan rentang biaya material (rendah-tinggi)
- Estimasi biaya pemeliharaan tahunan
- Potensi penghematan atau pembengkakan biaya

5. REKOMENDASI:
- Saran perbaikan atau alternatif material (jika ada)
- Tips implementasi dan konstruksi
- Modifikasi yang disarankan untuk optimalisasi

6. PERINGATAN & CATATAN KHUSUS:
- Potensi masalah yang perlu diwaspadai
- Hal-hal kritis yang membutuhkan perhatian khusus
- Batasan dan limitasi desain`;
  };

  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!formData.tipeRumah || !formData.jenisLantai || !formData.jenisAtap || !formData.jenisMaterial) {
      alert('Mohon lengkapi semua field');
      return;
    }

    const prompt = generatePrompt(formData);
    console.log("Generated prompt:", prompt);

    try {
      await handleSubmit(e, {
        data: { prompt },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sistem Pakar Analisis Konstruksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Tipe Rumah */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Tipe Rumah
              </label>
              <Select
                onValueChange={(value) => setFormData(prev => ({ ...prev, tipeRumah: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe rumah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21">Tipe 21</SelectItem>
                  <SelectItem value="32">Tipe 32</SelectItem>
                  <SelectItem value="36">Tipe 36</SelectItem>
                  <SelectItem value="44">Tipe 44</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jenis Lantai */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                Jenis Lantai
              </label>
              <Select
                onValueChange={(value) => setFormData(prev => ({ ...prev, jenisLantai: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis lantai" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keramik">Keramik</SelectItem>
                  <SelectItem value="tanah">Tanah</SelectItem>
                  <SelectItem value="granit">Granit</SelectItem>
                  <SelectItem value="marmer">Marmer</SelectItem>
                  <SelectItem value="plester">Plester</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jenis Atap */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <RectangleHorizontal className="h-4 w-4" />
                Jenis Atap
              </label>
              <Select
                onValueChange={(value) => setFormData(prev => ({ ...prev, jenisAtap: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis atap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genteng tanah liat">Genteng Tanah Liat</SelectItem>
                  <SelectItem value="asbes">Asbes</SelectItem>
                  <SelectItem value="seng">Seng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jenis Material */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Blocks className="h-4 w-4" />
                Jenis Material
              </label>
              <Select
                onValueChange={(value) => setFormData(prev => ({ ...prev, jenisMaterial: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batako">Batako</SelectItem>
                  <SelectItem value="hebel">Hebel</SelectItem>
                  <SelectItem value="bata merah">Bata Merah</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Input Field for Additional Prompts */}
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Tambahkan pertanyaan atau konteks tambahan di sini"
              className="w-full p-2 border rounded"
            />

            <Button type="submit" className="w-full">
              Analisis Konstruksi
            </Button>
          </form>

          {/* Messages Display */}
          <div className="mt-6 space-y-4">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  m.role === "user"
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10"
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {m.role === "user" ? "Permintaan Analisis" : "Hasil Analisis"}
                </p>
                <div className="text-sm whitespace-pre-wrap">{m.content}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
