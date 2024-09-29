import { WavyBackground } from "@/components/ui/wavy-background";
import { Chicle } from "next/font/google";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WavyBackground>
     {children}
    </WavyBackground>
  );
}
