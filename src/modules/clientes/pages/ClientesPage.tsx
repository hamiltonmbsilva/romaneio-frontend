import { useEffect, useState } from "react"
import {
 Container,
 Typography,
 Button,
 CircularProgress
} from "@mui/material"

import ClienteTable from "../components/ClienteTable"
import ClienteModal from "../components/ClienteModal"
import FiltroClientes from "../components/FiltroClientes"

import { listarClientes, deletarCliente } from "../services/clienteService"
//import { debounce } from "lodash"

export default function ClientesPage(){

 const [clientes,setClientes] = useState<any[]>([])
 const [loading,setLoading] = useState(false)
 const [openModal,setOpenModal] = useState(false)
 const [clienteEdit,setClienteEdit] = useState<any>(null)

 const [search,setSearch] = useState("")
 const [cidade,setCidade] = useState("")
 const [estado,setEstado] = useState("")

 const [page,setPage] = useState(0)
 const [total,setTotal] = useState(0)

 const carregar = async ()=>{

  setLoading(true)

  const result = await listarClientes(page+1,search)

 setClientes(result.data)
 setTotal(result.total)

 setLoading(false) 

 }


 const removerCliente = async (id:string) => {

 const confirmar = window.confirm("Deseja realmente excluir este cliente?")

 if(!confirmar) return

 try{

  await deletarCliente(id)

  carregar() // recarrega a tabela

 }catch(error){

  console.error("Erro ao deletar cliente",error)
  alert("Erro ao deletar cliente")

 }

}

 

//  const buscar = debounce((value:string)=>{

//  setSearch(value)

// },500)

 useEffect(()=>{
  carregar()
 },[search,page])

 return(

 <Container>

  <Typography variant="h4" marginBottom={3}>
   Clientes
  </Typography>
  

  <FiltroClientes
   search={search}
   setSearch={setSearch}
   cidade={cidade}
   setCidade={setCidade}
   estado={estado}
   setEstado={setEstado}
  />

  <Button
   variant="contained"
   onClick={()=>setOpenModal(true)}
   style={{marginBottom:20}}
  >
   Novo Cliente
  </Button>

  {loading ? (
   <CircularProgress/>
  ) : (

   <ClienteTable
    clientes={clientes}
    loading={loading}
    page={page}
    total={total}
    onPageChange={setPage}
    onEdit={(c:any)=>{
      setClienteEdit(c)
      setOpenModal(true)
    }}
    onDelete={(id:string)=>{
      removerCliente(id)      
    }}
    />

  )}

  <ClienteModal
   open={openModal}
   onClose={()=>{

    setOpenModal(false)
    setClienteEdit(null)

   }}
   cliente={clienteEdit}
   onSuccess={carregar}
  />

 </Container>

 )
}