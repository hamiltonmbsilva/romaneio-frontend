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

export const criarCliente = async(data:any)=>{

 const res = await api.post("/cliente",data)

 return res.data

}

export const atualizarCliente = async (id:string,data:any)=>{

 const response = await api.patch(`/cliente/${id}`,data)

 console.log("ClienteService",response)

 return response.data

}

export const deletarCliente = async (id:string)=>{

    console.log("Deletar primeira parte ", id)
    
 return api.delete(`/cliente/${id}`)
    
}