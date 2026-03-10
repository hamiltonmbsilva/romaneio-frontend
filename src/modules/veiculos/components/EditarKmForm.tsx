import { useState } from "react"
import { atualizarKm } from "../services/veiculoKmService"

export function EditarKmForm({registro,onSuccess}){

 const [kmSaida,setKmSaida] = useState(registro.kmSaida)
 const [kmRetorno,setKmRetorno] = useState(registro.kmRetorno ?? "")

 async function salvar(e){

  e.preventDefault()

  await atualizarKm({
   id: registro.id,
   kmSaida: Number(kmSaida),
   kmRetorno: kmRetorno ? Number(kmRetorno) : null
  })

  onSuccess()

 }

 return(

  <form className="form-km" onSubmit={salvar}>

   <h3>Editar KM</h3>

   <input
    value={kmSaida}
    onChange={e=>setKmSaida(e.target.value)}
    placeholder="KM saída"
   />

   <input
    value={kmRetorno}
    onChange={e=>setKmRetorno(e.target.value)}
    placeholder="KM retorno"
   />

   <button type="submit">

    Salvar

   </button>

  </form>

 )

}