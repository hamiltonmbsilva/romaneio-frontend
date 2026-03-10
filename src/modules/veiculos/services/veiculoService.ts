import { api } from "../../../shared/services/api"
import type { Veiculo } from "../../../shared/types/Veiculo"

export async function listarVeiculos():Promise<Veiculo[]> {

  const response = await api.get("/veiculo")

  return response.data

}

export async function criarVeiculo(data:Omit<Veiculo,"id">){

  try{
    
    const response = await api.post("/veiculo",data)

    return response.data

  }catch(error:any){

    console.error("ERRO API:",error.response?.data)

    throw error

  }

}

export async function deletarVeiculo(id:string){

  const response = await api.delete(`/veiculo/${id}`)

  return response.data

}

export async function atualizarVeiculo(id:string,data:any){

  const response = await api.put(`/veiculo/${id}`,data)

  return response.data

}

export async function alterarStatus(id:string){

  const response = await api.put(`/veiculo/${id}/status`)

  return response.data

}