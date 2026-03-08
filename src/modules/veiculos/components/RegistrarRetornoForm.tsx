import { useForm } from "react-hook-form"
import { registrarRetorno } from "../services/veiculoKmService"

export function RegistrarRetornoForm({registro,onSuccess}:any){

 const {register,handleSubmit} = useForm()

 async function onSubmit(data:any){

  await registrarRetorno(
   registro.id,
   Number(data.kmRetorno)
  )

  onSuccess()

 }

 return(

  <form onSubmit={handleSubmit(onSubmit)}>

   <h3>Registrar Retorno</h3>

   <p>KM Saída: {registro.kmSaida}</p>

   <input
    type="number"
    placeholder="KM Retorno"
    {...register("kmRetorno",{required:true})}
   />

   <button type="submit">
    Salvar
   </button>

  </form>

 )

}