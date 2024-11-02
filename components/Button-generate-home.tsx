"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
export default function ButtonGenerateHome() {
  return (
    <div>
      <Link href={"/dashboard"}>
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-2 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center font-medium tracking-tight text-transparent "
        >
          Generate
        </motion.button>
      </Link>
    </div>
  );
}
