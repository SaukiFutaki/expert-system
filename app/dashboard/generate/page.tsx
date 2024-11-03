import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormAi from "./_components/formAi";

export default async function Page() {
  return (
    <div className="">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sistem Pakar Analisis Konstruksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormAi />
        </CardContent>
      </Card>
    </div>
  );
}
