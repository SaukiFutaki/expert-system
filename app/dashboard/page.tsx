import Header from "./components/header";
import ButtonCozy from "@/components/ori/button-cozy";
export default async function Page() {
  return (
<div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Header />
      <div className="mt-8 space-y-4">
        <ButtonCozy className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Buat..., Buat apa ? 
        </ButtonCozy>
        <ButtonCozy className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          History
        </ButtonCozy>
      </div>
    </div>
  );
}
