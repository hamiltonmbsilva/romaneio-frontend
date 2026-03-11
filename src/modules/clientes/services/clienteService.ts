import { api } from "../../../shared/services/api"

export const listarClientes = async (page:number,search:string) => {

 const response = await api.get("/cliente",{
  params:{
   page,
   search
  }
 })

 return response.data
}

export const criarCliente = async (data:any)=>{
 return api.post("/cliente",data)
}

export const atualizarCliente = async (id:string,data:any)=>{
 return api.patch(`/cliente/${id}`,data)
}

export const deletarCliente = async (id:string)=>{
 return api.delete(`/cliente/${id}`)
}