"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, RectangleHorizontal, Blocks, House, } from "lucide-react";

import { IFormData } from "@/types";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { generatePrompt } from "../lib";

const formSchema = z.object({
  tipeRumah: z.string().nonempty("Tipe Rumah is required"),
  jenisLantai: z.string().nonempty("Jenis Lantai is required"),
  jenisAtap: z.string().nonempty("Jenis Atap is required"),
  jenisMaterial: z.string().nonempty("Jenis Material is required"),
});

export default function FormAi() {
  const [formData, setFormData] = React.useState<IFormData>({
    tipeRumah: "",
    jenisLantai: "",
    jenisAtap: "",
    jenisMaterial: "",
  });

  const { messages, handleSubmit, handleInputChange, input } = useChat({
    api: "/api/genai",
    body: {
        tipeRumah: formData.tipeRumah,
        jenisLantai: formData.jenisLantai,
        jenisAtap: formData.jenisAtap,
        jenisMaterial: formData.jenisMaterial,
      },
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (!formData.tipeRumah || !formData.jenisLantai || !formData.jenisAtap || !formData.jenisMaterial) {
      alert("Mohon lengkapi semua field");
      return;
    }

    const prompt = generatePrompt(formData, input);
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
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Tipe Rumah */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <House className="h-4 w-4" />
          Tipe Rumah
        </label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, tipeRumah: value }))
          }
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
        <label className="text-sm font-medium">Jenis Lantai</label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, jenisLantai: value }))
          }
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
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, jenisAtap: value }))
          }
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
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, jenisMaterial: value }))
          }
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

      {/* Additional Prompt Input */}
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Tambahkan pertanyaan atau konteks tambahan di sini"
        className="w-full p-2 border rounded"
      />

      <Button type="submit" className="w-full" >
        Analisis Konstruksi
      </Button>

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
            <ReactMarkdown className="markdown-body">{m.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </form>
  );
}
