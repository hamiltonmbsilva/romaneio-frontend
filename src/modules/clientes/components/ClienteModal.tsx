import {
 Modal,
 Box,
 TextField,
 Button
} from "@mui/material"

import { useState,useEffect } from "react"

import {
 criarCliente,
 atualizarCliente
} from "../services/clienteService"

const style = { 

 position:"absolute",
 top:"50%",
 left:"50%",
 transform:"translate(-50%,-50%)",

 width:600,
 maxHeight:"80vh",

 overflow:"auto",

 background:"#fff",

 padding:30,
 borderRadius:10


}

export default function ClienteModal({open,onClose,cliente,onSuccess}:any){

 const [form,setForm] = useState<any>({
  nomeFantasia:"",
  cidade:"",
  endereco:"",
  telefone:""
 })

 useEffect(()=>{

  if(cliente){

   setForm(cliente)

  }

 },[cliente])

 const salvar = async()=>{

        if(cliente){

            await atualizarCliente(cliente.id,form)

        }else{

            await criarCliente(form)

        }

        onSuccess()

        onClose()

 }


 return(

 <Modal open={open} onClose={onClose}>

  <Box sx={style}>

   <h2>{cliente ? "Editar Cliente":"Novo Cliente"}</h2>

   <TextField
    label="Nome"
    fullWidth
    margin="normal"
    value={form.nomeFantasia}
    onChange={(e)=>setForm({...form,nomeFantasia:e.target.value})}
   />

   <TextField
    label="Cidade"
    fullWidth
    margin="normal"
    value={form.cidade}
    onChange={(e)=>setForm({...form,cidade:e.target.value})}
   />

   <TextField
    label="Endereço"
    fullWidth
    margin="normal"
    value={form.endereco}
    onChange={(e)=>setForm({...form,endereco:e.target.value})}
   />

   <TextField
    label="Telefone"
    fullWidth
    margin="normal"
    value={form.telefone}
    onChange={(e)=>setForm({...form,telefone:e.target.value})}
   />

   <Button
    variant="contained"
    onClick={salvar}
    style={{marginTop:20}}
   >
    Salvar
   </Button>

  </Box>

 </Modal>

 )
}