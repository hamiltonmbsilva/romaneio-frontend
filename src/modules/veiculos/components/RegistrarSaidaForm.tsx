import { useForm } from "react-hook-form"
import { registrarSaida } from "../services/veiculoKmService"

export function RegistrarSaidaForm({veiculoId,onSuccess}:any){

 const {register,handleSubmit} = useForm()

 async function onSubmit(data:any){

    console.log("ENVIANDO SAIDA:",data)

    await registrarSaida({
    veiculoId,
    kmSaida:Number(data.kmSaida)
    })

  onSuccess()

 }

 return(

  <form className="form-km" onSubmit={handleSubmit(onSubmit)}>

   <h3>Registrar Saída do Veículo</h3>

   <label>KM Atual do Veículo</label>

   <input
    type="number"
    placeholder="Ex: 120000"
    {...register("kmSaida",{required:true})}
   />

   <button type="submit">
    Salvar Saída
   </button>

  </form>

 )

}