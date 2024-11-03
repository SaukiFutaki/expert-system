import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fredoka } from "./font";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fourthCondition } from "@/schema/condition";
import { FormDescription } from "@/components/ui/form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

type ConditionForm4Props = {
  onPrev: () => void;
  onNext: () => void;
};

export default function ConditionForm4({
  onPrev,
  onNext,
}: ConditionForm4Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof fourthCondition>>({
    resolver: zodResolver(fourthCondition),
    defaultValues: {
      jenisMaterial: "batako",
    },
  });

  const onSubmit = (data: z.infer<typeof fourthCondition>) => {
    startTransition(() => {
      // submitFinalForm(data);
      onNext();
    });
  };
  return (
    <div className="flex items-center justify-center ">
      <Card className="w-[400px] md:w-[600px] lg:w-[700px] p-6 shadow-lg rounded-lg bg-white dark:bg-black">
        <CardHeader className="pb-4">
          <h2
            className={`${fredoka.className} text-emerald-600 text-2xl font-bold text-center`}
          >
            Pilih Jenis Material
          </h2>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="jenisMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      4. Pilih Jenis Material
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue="genteng tanah liat"
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="batako" id="batako" />
                          <label htmlFor="batako" className="text-md">
                            Batako
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="hebel" id="hebel" />
                          <label htmlFor="hebel" className="text-md">
                            Hebel
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="bata merah" id="bata merah" />
                          <label htmlFor="bata merah" className="text-md">
                            Bata Merah
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
                  Submit
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
