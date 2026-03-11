import { useEffect, useState } from "react"
import { listarClientes, deletarCliente } from "../services/clienteService"
import ClienteTable from "../components/ClienteTable"
import ClienteForm from "../components/ClienteForm"

export default function ClientesPage(){

 const [clientes,setClientes] = useState([])
 const [page,setPage] = useState(1)
 const [search,setSearch] = useState("")
 const [clienteEdit,setClienteEdit] = useState<any>(null)

 const carregar = async ()=>{
  const data = await listarClientes(page,search)
  setClientes(data)
 }

 useEffect(()=>{
  carregar()
 },[page,search])

 const remover = async (id:string)=>{
  if(confirm("Deseja deletar cliente?")){
   await deletarCliente(id)
   carregar()
  }
 }

 return(

  <div style={{padding:20}}>

   <h2>Clientes</h2>

   <ClienteForm
    cliente={clienteEdit}
    onSuccess={()=>{
     setClienteEdit(null)
     carregar()
    }}
   />

   <input
    placeholder="Buscar cliente..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    style={{marginBottom:10}}
   />

   <ClienteTable
    clientes={clientes}
    onEdit={(c:any)=>setClienteEdit(c)}
    onDelete={remover}
   />

   <div style={{marginTop:20}}>
    <button onClick={()=>setPage(page-1)}>Anterior</button>
    <span style={{margin:"0 10px"}}>Página {page}</span>
    <button onClick={()=>setPage(page+1)}>Próxima</button>
   </div>

  </div>

 )
}