import { useEffect,useState } from "react"
import { listarVeiculos,deletarVeiculo } from "./services/veiculoService"
import type { Veiculo } from "../../shared/types/Veiculo"          
import "./veiculos.css"
import { VeiculoForm } from "./components/VeiculoForm"
import { Modal } from "../../shared/components/Modal"



export function VeiculosPage(){

  const [veiculos,setVeiculos] = useState<Veiculo[]>([])
  const [open,setOpen] = useState(false)


  async function carregarVeiculos(){

    const data = await listarVeiculos()

    setVeiculos(data)

  }

  async function excluir(id:string){

    await deletarVeiculo(id)

    carregarVeiculos()

  }

  useEffect(()=>{

    carregarVeiculos()

  },[])

  return(

  <div className="veiculos-container">

    <div className="veiculos-header">

      <h2>Veículos</h2>

      <button onClick={()=>setOpen(true)}>
        Novo Veículo
      </button>

    </div>

    {open && (

      <Modal onClose={()=>setOpen(false)}>

        <VeiculoForm onSuccess={()=>{
          setOpen(false)
          carregarVeiculos()
        }}/>

      </Modal>

    )}

    <div className="table-container">

      <table>

        <thead>

          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>Capacidade</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {veiculos.map(v=>(

            <tr key={v.id}>

              <td>{v.placa}</td>
              <td>{v.modelo}</td>
              <td>{v.ano}</td>
              <td>{v.capacidadeKg} kg</td>

              <td>

                <button onClick={()=>excluir(v.id)}>
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

)

}