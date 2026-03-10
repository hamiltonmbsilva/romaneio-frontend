import { useState } from "react"
import { registrarRetorno } from "../services/veiculoKmService"

export function RegistrarRetornoForm({ registro, onSuccess }: any){

 const [kmRetorno,setKmRetorno] = useState("")

 async function onSubmit(e:any){
  e.preventDefault()

  await registrarRetorno(registro.id, Number(kmRetorno))

  onSuccess()
 }

 return(

  <form onSubmit={onSubmit} className="form-km">

   <h3>Registrar Retorno</h3>

   <input
    type="number"
    placeholder="KM retorno"
    value={kmRetorno}
    onChange={e=>setKmRetorno(e.target.value)}
   />

   <button type="submit">
    Salvar
   </button>

  </form>

 )
}