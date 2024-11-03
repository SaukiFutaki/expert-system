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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { firstCondition } from "@/schema/condition";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { fredoka } from "./font";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

type ConditionForm1Props = {
  onNext: () => void;
};

export default function ConditionForm1({ onNext }: ConditionForm1Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof firstCondition>>({
    resolver: zodResolver(firstCondition),
    defaultValues: {
      tipeRumah: "32",
    },
  });

  const onSubmit = async (values: z.infer<typeof firstCondition>) => {
    startTransition(() => {
      // submitFormStep1(values);
      onNext();
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] md:w-[600px] lg:w-[700px] p-6 shadow-lg rounded-lg bg-white dark:bg-black">
        <CardHeader className="pb-4">
          <h2
            className={`text-2xl font-bold text-center ${fredoka.className} text-emerald-600`}
          >
            Pilih Tipe Rumah
          </h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="tipeRumah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      1. Pilih tipe rumah
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="32"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="32" id="t32" />
                          <Label htmlFor="t32">Tipe 32</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="44" id="t44" />
                          <Label htmlFor="t44">Tipe 44</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="21" id="t21" />
                          <Label htmlFor="t21">Tipe 21</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="36" id="t36" />
                          <Label htmlFor="t36">Tipe 36</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-6">
                <div className="cursor-not-allowed">
                  <Button disabled onClick={router.back} className="w-28 ">
                    Back
                  </Button>
                </div>
           
                  <Button type="submit" className="w-28">
                    {isPending ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      "Next"
                    )}
                  </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
