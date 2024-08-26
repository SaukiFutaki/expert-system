"use client";
import ButtonCozy from "@/components/ori/button-cozy";
import { createDiagnosa } from "@/lib/action";
import { useRouter } from "next/navigation";
import Header from "./components/header";
export default  function Page() {
  const router = useRouter();


  const handleCreate = () => {
    createDiagnosa().then((res) => {
      router.push(`/buat/${res}`);
    });
  }
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <Header />
      <div className="mt-8 space-x-4">
        <ButtonCozy className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
          Buat..., Buat apa ? Diagnosa ?
        </ButtonCozy>

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          buat
        </button>
        <ButtonCozy className="px-4 p y-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          History
        </ButtonCozy>
      
      </div>

    </div>
  );
}
