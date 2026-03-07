import { useForm } from "react-hook-form"
import { criarVeiculo, atualizarVeiculo} from "../services/veiculoService"
import "./veiculoForm.css"

type FormData = {
  placa:string
  modelo:string
  ano:number
  capacidadeKg:number
  kmInicial:number
}

export function VeiculoForm({onSuccess,veiculo}:any){

  const {register,handleSubmit,formState:{errors}} = useForm<FormData>({
          defaultValues: veiculo
        })

  async function onSubmit(data:FormData){

      if(veiculo){

        await atualizarVeiculo(veiculo.id,data)

      }else{

        await criarVeiculo(data)

      }

      onSuccess()

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