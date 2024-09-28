"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { secondCondition, thirdCondition } from "@/schema/condition";
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
import { fredoka } from "./font";
import { Separator } from "@/components/ui/separator";
import { submitFormStep3 } from "@/lib/action";
import { useRouter } from "next/navigation";

type ConditionForm2Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function ConditionForm3({
  onPrev,
  onNext,
}: ConditionForm2Props) {
    const router = useRouter()
  const form = useForm<z.infer<typeof thirdCondition>>({
    resolver: zodResolver(thirdCondition),
    defaultValues: {
      jenisAtap: "genteng tanah liat",
    },
  });

  const onSubmit = (data: z.infer<typeof thirdCondition>) => {
    console.log(data);
    submitFormStep3(data);
    onNext();
  };

  return (
    <div className="flex items-center justify-center ">
      <Card className="w-[400px] md:w-[600px] lg:w-[700px] p-6 shadow-lg rounded-lg bg-white">
        <CardHeader className="pb-4">
          <h2
            className={`${fredoka.className} text-emerald-600 text-2xl font-bold text-center`}
          >
            Pilih Jenis Atap
          </h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jenisAtap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      3. Pilih jenis atap
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="genteng tanah liat"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="genteng tanah liat"
                            id="genteng tanah liat"
                          />
                          <label
                            htmlFor="genteng tanah liat"
                            className="text-md"
                          >
                            Genteng Tanah Liat
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="esbes" id="esbes" />
                          <label htmlFor="esbes" className="text-md">
                            Esbes
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="seng" id="seng" />
                          <label htmlFor="seng" className="text-md">
                            Seng
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
                <Button type="submit" className="w-28">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
