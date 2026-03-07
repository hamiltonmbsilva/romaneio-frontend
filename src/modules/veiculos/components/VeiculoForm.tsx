import { useForm } from "react-hook-form"
import { criarVeiculo } from "../services/veiculoService"
import "./veiculoForm.css"

type FormData = {
  placa:string
  modelo:string
  ano:number
  capacidadeKg:number
  kmInicial:number
}

export function VeiculoForm({onSuccess}:any){

  const {register,handleSubmit,formState:{errors}} = useForm<FormData>()

  async function onSubmit(data:FormData){

    try{

            await criarVeiculo(data)

            onSuccess()

        }catch(error){

            console.error(error)

            alert("Erro ao salvar veículo")

    } 

  }

  return(

    <form className="veiculo-form" onSubmit={handleSubmit(onSubmit)}>

      <input
        placeholder="Placa"
        {...register("placa",{required:true})}
      />

      {errors.placa && <span className="error">Placa obrigatória</span>}

      <input
        placeholder="Modelo"
        {...register("modelo",{required:true})}
      />

      <input
        type="number"
        placeholder="Ano"
        {...register("ano",{required:true,valueAsNumber:true})}
      />

      <input
        type="number"
        placeholder="Capacidade KG"
        {...register("capacidadeKg",{required:true,valueAsNumber:true})}
      />

      <input
        type="number"
        placeholder="KM Inicial"
        {...register("kmInicial",{required:true,valueAsNumber:true})}
      />

      <button type="submit">

        Salvar

      </button>

    </form>

  )

}