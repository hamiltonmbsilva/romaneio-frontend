import { useForm } from "react-hook-form"
import { criarVeiculo } from "../services/veiculoService"

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

    await criarVeiculo(data)

    onSuccess()

  }

  return(

    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        placeholder="Placa"
        {...register("placa",{required:true})}
      />

      {errors.placa && <span>Placa obrigatória</span>}

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