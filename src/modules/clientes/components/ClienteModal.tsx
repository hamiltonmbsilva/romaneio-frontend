import {
 Modal,
 Box,
 TextField,
 Button,
 Typography,
 Stack
} from "@mui/material"

import { useState, useEffect } from "react"

import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

import {
 criarCliente,
 atualizarCliente
} from "../services/clienteService"

const modalContainer = {
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 height: "100%"
}

const modalBox = {
 width: 700,
 maxWidth: "90%",
 backgroundColor: "#fff",
 borderRadius: 2,
 boxShadow: 24,
 padding: 4
}

export default function ClienteModal({
 open,
 onClose,
 cliente,
 onSuccess
}: any) {

 const [form,setForm] = useState<any>({
  nomeFantasia:"",
  telefone:"",
  contato:"",
  email:"",
  cidade:"",
  estado:"",
  endereco:"",
  cep:"",
  inscricaoEstadual:""
 })

 useEffect(()=>{

    if(cliente){

        setForm({
            nomeFantasia: cliente.nomeFantasia || "",
            telefone: cliente.telefone || "",
            contato: cliente.contato || "",
            email: cliente.email || "",
            cidade: cliente.cidade || "",
            estado: cliente.estado || "",
            endereco: cliente.endereco || "",
            cep: cliente.cep || "",
            inscricaoEstadual: cliente.inscricaoEstadual || ""
            })

            }

},[cliente])

 const salvar = async()=>{

    const dados = {
        ...form,
        ativo:true
    }

    if(!form.nomeFantasia || !form.cidade || !form.estado){
        alert("Preencha os campos obrigatórios")
        return
    } 


 try{

    const dados = {
        nomeFantasia: form.nomeFantasia,
        telefone: form.telefone,
        contato: form.contato,
        email: form.email,
        cidade: form.cidade,
        estado: form.estado,
        endereco: form.endereco,
        cep: form.cep,
        inscricaoEstadual: form.inscricaoEstadual,
        ativo: true
    }

     

  if(cliente){ 

   await atualizarCliente(cliente.id,dados)

  }else{

   await criarCliente(dados)

  }

  onSuccess()
  onClose()

 }catch(error){

  console.error("Erro ao salvar cliente",error)
  alert("Erro ao salvar cliente")

 }

}

 return(

  <Modal
   open={open}
   onClose={onClose}
  >

   <Box sx={modalContainer}>

    <Box sx={modalBox}>

     <Typography variant="h6" mb={3}>
      {cliente ? "Editar Cliente" : "Novo Cliente"}
     </Typography>

     <IconButton  onClick={onClose}>
        <CloseIcon/>
    </IconButton>

     <Stack spacing={2} sx={{ width:"100%" }}>

     <TextField
  label="Nome Fantasia"
  fullWidth
  value={form.nomeFantasia}
  onChange={(e)=>setForm({...form,nomeFantasia:e.target.value})}
 />

 <Stack direction="row" spacing={2}>

  <TextField
   label="Telefone"
   fullWidth
   value={form.telefone || ""}
   onChange={(e)=>setForm({...form,telefone:e.target.value})}
  />

  <TextField
   label="Contato"
   fullWidth
   value={form.contato || ""}
   onChange={(e)=>setForm({...form,contato:e.target.value})}
  />

 </Stack>

 <TextField
  label="Email"
  fullWidth
  value={form.email || ""}
  onChange={(e)=>setForm({...form,email:e.target.value})}
 />

 <Stack direction="row" spacing={2}>

  <TextField
   label="Cidade"
   fullWidth
   value={form.cidade || ""}
   onChange={(e)=>setForm({...form,cidade:e.target.value})}
  />

  <TextField
   label="Estado"
   fullWidth
   value={form.estado || ""}
   onChange={(e)=>setForm({...form,estado:e.target.value})}
  />

 </Stack>

 <TextField
  label="Endereço"
  fullWidth
  value={form.endereco || ""}
  onChange={(e)=>setForm({...form,endereco:e.target.value})}
 />

 <Stack direction="row" spacing={2}>

  <TextField
   label="CEP"
   fullWidth
   value={form.cep || ""}
   onChange={(e)=>setForm({...form,cep:e.target.value})}
  />

  <TextField
   label="Inscrição Estadual"
   fullWidth
   value={form.inscricaoEstadual || ""}
   onChange={(e)=>setForm({...form,inscricaoEstadual:e.target.value})}
  />

 </Stack>
 

 <Button
  variant="contained"
  size="large"
  onClick={salvar}
 >
  Salvar Cliente
 </Button>

     </Stack>

    </Box>

   </Box>

  </Modal>

 )
}