import { useState,useEffect } from "react"
import { criarCliente, atualizarCliente } from "../services/clienteService"

export default function ClienteForm({cliente,onSuccess}:any){

 const [form,setForm] = useState<any>({
  nomeFantasia:"",
  cidade:"",
  telefone:"",
  ativo:true
 })

 useEffect(()=>{
  if(cliente){
   setForm(cliente)
  }
 },[cliente])

 const salvar = async (e:any)=>{
  e.preventDefault()

  if(cliente){
   await atualizarCliente(cliente.id,form)
  }else{
   await criarCliente(form)
  }

  setForm({
   nomeFantasia:"",
   cidade:"",
   telefone:"",
   ativo:true
  })

  onSuccess()
 }

 return(

  <form onSubmit={salvar} style={{marginBottom:20}}>

   <input
    placeholder="Nome"
    value={form.nomeFantasia}
    onChange={(e)=>setForm({...form,nomeFantasia:e.target.value})}
   />

   <input
    placeholder="Cidade"
    value={form.cidade}
    onChange={(e)=>setForm({...form,cidade:e.target.value})}
   />

   <input
    placeholder="Telefone"
    value={form.telefone}
    onChange={(e)=>setForm({...form,telefone:e.target.value})}
   />

   <button type="submit">
    {cliente ? "Atualizar":"Cadastrar"}
   </button>

  </form>

 )
}