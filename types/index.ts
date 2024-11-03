export interface IFormData {
    tipeRumah: string;
    jenisLantai: string;
    jenisAtap: string;
    jenisMaterial: string;
    
}

export interface IConstructionAnalysis  {
    id?: string;
    tipeRumah?: string;
    jenisLantai?: string;
    jenisAtap?: string;
    jenisMaterial?: string;
    prompt_result?: string;
    createdAt?: string;
  };


  export type ConstructionAnalysis = {
    id: string;
    tipeRumah: string;
    jenisLantai: string;
    jenisAtap: string;
    jenisMaterial: string;
    promptResult: string;
  };