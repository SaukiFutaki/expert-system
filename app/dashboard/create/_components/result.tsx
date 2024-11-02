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



// import { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { AlertTriangle, CheckCircle, Info } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ResultAnalysis = () => {
//   const [analysis] = useState({
//     projectName: "Analisis Konstruksi Rumah",
//     analysisType: "Analisis Teknis",
//     costEstimate: 250000000,
//     budgetUtilization: 0.82,
//     materialScore: 0.75,
//     structuralScore: 0.90,
//     additionalNotes: "Perhatikan kebutuhan maintenance berkala untuk material yang dipilih."
//   });

//   const getBudgetColor = (utilization: number) => {
//     if (utilization < 0.5) return "bg-red-500";
//     if (utilization < 0.75) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getScoreIcon = (score: number) => {
//     if (score < 0.5) return <AlertTriangle className="h-5 w-5 text-red-500" />;
//     if (score < 0.75) return <Info className="h-5 w-5 text-yellow-500" />;
//     return <CheckCircle className="h-5 w-5 text-green-500" />;
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-3xl shadow-lg">
//         <CardHeader className="space-y-1">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-2xl font-bold">{analysis.projectName}</CardTitle>
//             <Badge variant="outline" className="ml-2">
//               {analysis.analysisType}
//             </Badge>
//           </div>
//           <CardDescription>
//             Hasil Analisis Teknis dan Rekomendasi
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {/* Estimasi Biaya */}
//           <div className="space-y-2">
//             <h3 className="font-semibold">Estimasi Biaya Proyek</h3>
//             <p className="text-lg font-medium">
//               Rp {analysis.costEstimate.toLocaleString()} IDR
//             </p>
//           </div>

//           {/* Skor Material */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="font-medium">Kesesuaian Material</span>
//               <span>{(analysis.materialScore * 100).toFixed(0)}%</span>
//             </div>
//             <Progress 
//               value={analysis.materialScore * 100} 
//               className={getBudgetColor(analysis.materialScore)}
//             />
//             <div className="flex items-center space-x-2">
//               {getScoreIcon(analysis.materialScore)}
//               <span className="text-sm text-gray-600">
//                 {analysis.materialScore >= 0.75 
//                   ? "Material yang dipilih sangat sesuai dengan spesifikasi"
//                   : analysis.materialScore >= 0.5
//                   ? "Beberapa penyesuaian material mungkin diperlukan"
//                   : "Perlu peninjauan ulang pemilihan material"}
//               </span>
//             </div>
//           </div>

//           {/* Skor Struktural */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="font-medium">Analisis Struktural</span>
//               <span>{(analysis.structuralScore * 100).toFixed(0)}%</span>
//             </div>
//             <Progress 
//               value={analysis.structuralScore * 100} 
//               className={getBudgetColor(analysis.structuralScore)}
//             />
//             <div className="flex items-center space-x-2">
//               {getScoreIcon(analysis.structuralScore)}
//               <span className="text-sm text-gray-600">
//                 {analysis.structuralScore >= 0.75 
//                   ? "Struktur bangunan optimal dan aman"
//                   : analysis.structuralScore >= 0.5
//                   ? "Beberapa penyesuaian struktur disarankan"
//                   : "Perlu peninjauan ulang desain struktural"}
//               </span>
//             </div>
//           </div>

//           {/* Penggunaan Anggaran */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="font-medium">Efisiensi Anggaran</span>
//               <span>{(analysis.budgetUtilization * 100).toFixed(0)}%</span>
//             </div>
//             <Progress 
//               value={analysis.budgetUtilization * 100} 
//               className={getBudgetColor(analysis.budgetUtilization)}
//             />
//             <div className="flex items-center space-x-2">
//               {getScoreIcon(analysis.budgetUtilization)}
//               <span className="text-sm text-gray-600">
//                 {analysis.budgetUtilization >= 0.75 
//                   ? "Penggunaan anggaran optimal"
//                   : analysis.budgetUtilization >= 0.5
//                   ? "Penggunaan anggaran cukup efisien"
//                   : "Perlu optimalisasi penggunaan anggaran"}
//               </span>
//             </div>
//           </div>
//         </CardContent>

//         <CardFooter className="flex flex-col space-y-4">
//           <p className="text-sm text-gray-600 italic">
//             {analysis.additionalNotes}
//           </p>
//           <div className="flex flex-col w-full space-y-2">
//             <Button className="w-full" variant="outline" disabled>
//               Download Laporan Lengkap
//             </Button>
//             <Button className="w-full" onClick={() => window.history.back()}>
//               Kembali
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ResultAnalysis;