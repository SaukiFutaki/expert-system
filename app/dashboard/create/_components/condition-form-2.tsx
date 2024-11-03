"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { secondCondition } from "@/schema/condition";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fredoka } from "./font/index";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

type ConditionForm2Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function ConditionForm2({
  onPrev,
  onNext,
}: ConditionForm2Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof secondCondition>>({
    resolver: zodResolver(secondCondition),
    defaultValues: {
      jenisLantai: "keramik",
    },
  });

  const onSubmit = (data: z.infer<typeof secondCondition>) => {
    startTransition(() => {
      // submitFormStep2(data);
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
            Pilih Jenis Lantai
          </h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jenisLantai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      2. Pilih jenis lantai
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="keramik"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="keramik" id="keramik" />
                          <label htmlFor="keramik" className="text-md">
                            Keramik
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="tanah" id="tanah" />
                          <label htmlFor="tanah" className="text-md">
                            Tanah
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="granit" id="granit" />
                          <label htmlFor="granit" className="text-md">
                            Granit
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="marmer" id="marmer" />
                          <label htmlFor="marmer" className="text-md">
                            Marmer
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="plester" id="plester" />
                          <label htmlFor="plester" className="text-md">
                            Plester
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Previous and Next Buttons */}
              <div className="flex justify-between pt-6">
              <div className="cursor-not-allowed">
                  <Button disabled onClick={router.back} className="w-28 ">
                    Back
                  </Button>
                </div>
                {isPending ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-28">
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
