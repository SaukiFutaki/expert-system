"use client";
import React from "react";
import { motion } from "framer-motion";
import { CiSquareQuestion } from "react-icons/ci";
export default function InfoMark({ className }: { className: string }) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 1.5,
          ease: "easeInOut",
        }}
     
      >
        <CiSquareQuestion  className="text-md"/> 
      </motion.div>
    </div>
  );
}
