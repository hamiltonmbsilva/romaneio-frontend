import { api } from "../../../shared/services/api"

export async function registrarSaida(data:any){

 const response = await api.post("/veiculo-km/saida",data)

 return response.data

}

export async function registrarRetorno(id:string,kmRetorno:number){

 const response = await api.put(`/veiculo-km/retorno/${id}`,{
   kmRetorno
 })

 return response.data

}

export async function listarHistorico(veiculoId:string){

 const response = await api.get(`/veiculo-km/${veiculoId}`)

 return response.data

}