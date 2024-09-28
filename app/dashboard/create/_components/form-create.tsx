"use client";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

//  ! Schema validation
export const formSchema = z.object({
  timeRumah: z.string().min(2, {
    message: "House type must be selected.",
  }),
  priceRange: z.tuple([z.number(), z.number()]),
  luasTanah: z.number().min(0, {
    message: "Land area must be a positive number.",
  }),
});

export default function FormCreate() {
  const [priceRange, setPriceRange] = useState([0, 200_000_000]);
  const [rabResult, setRabResult] = useState<number | string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeRumah: "sederhana",
      priceRange: [0, 10_000],
        luasTanah: 0,
    },
  });

 


  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    form.setValue("priceRange", [value[0], value[1]]);
  };


  const calculateRab = (luasTanah: number, timeRumah: string, priceRange: number[]) => {
    let biayaPerMeter = 0;

    // Logika biaya per meter sesuai tipe rumah
    switch (timeRumah) {
      case "sederhana":
        biayaPerMeter = 3000000;
        break;
      case "mewah":
        biayaPerMeter = 8000000;
        break;
      case "klasik":
        biayaPerMeter = 5000000;
        break;
      default:
        biayaPerMeter = 0;
    }

    const totalBiaya = luasTanah * biayaPerMeter;

    if (totalBiaya >= priceRange[0] && totalBiaya <= priceRange[1]) {
      return totalBiaya;
    } else {
      return "Biaya tidak sesuai dengan rentang harga yang dipilih.";
    }
  };

  // TODO : Submit form
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    
    const rab = calculateRab(data.luasTanah, data.timeRumah, data.priceRange); // Calculate RAB
    setRabResult(rab);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Land Area Input */}
          <FormField
            control={form.control}
            name="luasTanah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Masukkan luas tanah (m²)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* House Type Radio Group */}
          <FormField
            control={form.control}
            name="timeRumah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. Pilih tipe rumah</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue="sederhana"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sederhana" id="r1" />
                      <Label htmlFor="r1">sederhana</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mewah" id="r2" />
                      <Label htmlFor="r2">mewah</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="klasik" id="r3" />
                      <Label htmlFor="r3">klasik</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Range Slider */}
          <FormField
            control={form.control}
            name="priceRange"
            render={() => (
              <FormItem>
                <FormLabel>3. Pilih rentang harga rumah</FormLabel>
                <FormControl>
                  <PriceSlider
                    priceRange={priceRange}
                    onPriceChange={handlePriceChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
      {rabResult !== null && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Hasil RAB:</h2>
          <p>
            Total Biaya:{" "}
            {typeof rabResult === "number"
              ? `IDR ${new Intl.NumberFormat("id-ID").format(rabResult)}`
              : rabResult}
          </p>
        </div>
      )}
    </div>
  );
}

type PriceSliderProps = {
  priceRange: number[];
  onPriceChange: (value: number[]) => void;
  className?: string;
};

function PriceSlider({
  priceRange,
  onPriceChange,
  className,
}: PriceSliderProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">
        Pilih rentang harga rumah
      </h2>
      <Slider
        defaultValue={priceRange}
        max={1_000_000_000}
        step={1}
        onValueChange={onPriceChange}
        className={cn("", className)}
      />
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Min: {formatPrice(priceRange[0])}
        </div>
        <div className="text-sm font-medium">
          Max: {formatPrice(priceRange[1])}
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Rentang harga : {formatPrice(priceRange[0])} -{" "}
        {formatPrice(priceRange[1])}
      </p>
    </div>
  );
}
