import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ResultCardProps {
  projectName: string;
  analysisType: string;
  costEstimate: number;
  budgetUtilization: number;
  additionalNotes?: string;
}

export default function Result({
  projectName = "Proyek Pembangunan Rumah",
  analysisType = "Cost Analysis",
  costEstimate = 50000000,
  budgetUtilization = 0.75,
  additionalNotes = "Ensure to account for contingency costs.",
}: ResultCardProps) {
  const router = useRouter();
  const getBudgetColor = (utilization: number) => {
    if (utilization < 0.5) return "bg-destructive";
    if (utilization < 0.75) return "bg-warning";
    return "bg-success";
  };

  const getBudgetIcon = (utilization: number) => {
    if (utilization < 0.5)
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    if (utilization < 0.75) return <Info className="h-5 w-5 text-warning" />;
    return <CheckCircle className="h-5 w-5 text-success" />;
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[400px] md:w-[600px] lg:w-[700px] p-6 shadow-lg rounded-lg bg-white dark:bg-black">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{projectName}</CardTitle>
            <Badge variant="outline">{analysisType}</Badge>
          </div>
          <CardDescription>Hasil Analisis RAB Proyek</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground underline">
            Estimated total project cost: Rp {costEstimate.toLocaleString()} IDR
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Penggunaan Anggaran</span>
              <span className="text-sm font-medium">
                {(budgetUtilization * 100).toFixed(0)}%
              </span>
            </div>
            <Progress
              value={budgetUtilization * 100}
              className={getBudgetColor(budgetUtilization)}
            />
          </div>
          <div className="flex items-start space-x-2">
            {getBudgetIcon(budgetUtilization)}
            <p className="text-sm">
              {budgetUtilization < 0.5
                ? "Anggaran di bawah optimal: Pertimbangkan peninjauan alokasi sumber daya"
                : budgetUtilization < 0.75
                ? "Penggunaan Moderat: Beberapa penyesuaian mungkin diperlukan"
                : "Penggunaan Optimal: Sesuai dengan anggaran yang direncanakan"}
            </p>
          </div>
        </CardContent>
        {additionalNotes && (
          <CardFooter>
            <p className="text-sm text-muted-foreground">{additionalNotes}</p>
          </CardFooter>
        )}
        <Button disabled className="w-full mt-4">Download Laporan</Button>
        <Button onClick={ () => router.back()}  className="w-full mt-2">Kembali</Button>
      </Card>
    </div>
  );
}
