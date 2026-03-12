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

import { listarClientes } from "../services/clienteService"

//import { debounce } from "lodash"

export default function ClientesPage(){

 const [clientes,setClientes] = useState<any[]>([])
 const [loading,setLoading] = useState(false)
 const [openModal,setOpenModal] = useState(false)
 const [clienteEdit,setClienteEdit] = useState<any>(null)

 const [search,setSearch] = useState("")
 const [cidade,setCidade] = useState("")
 const [estado,setEstado] = useState("")

 const carregar = async ()=>{

  setLoading(true)

  const data = await listarClientes(1,search)

  setClientes(data)

  setLoading(false)  

 }

 

//  const buscar = debounce((value:string)=>{

//  setSearch(value)

// },500)

 useEffect(()=>{
  carregar()
 },[search])

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
    onEdit={(c:any)=>{
    setClienteEdit(c)
    setOpenModal(true)
    }}
    onDelete={(id:string)=>{
    console.log("deletar",id)
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