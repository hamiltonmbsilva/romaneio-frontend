import { useEffect, useState } from "react"
import { listarHistorico } from "../services/veiculoKmService"

export function VeiculoHistoricoPage({veiculoId}:any){

  const [historico,setHistorico] = useState<any[]>([])

  async function carregar(){

    const data = await listarHistorico(veiculoId)

    setHistorico(data)

  }

  useEffect(()=>{

    carregar()

  },[])

  return(

    <div>

      <h2>Histórico de KM</h2>

      <table>

        <thead>

          <tr>
            <th>KM Saída</th>
            <th>KM Retorno</th>
            <th>KM Rodado</th>
            <th>Data Saída</th>
          </tr>

        </thead>

        <tbody>

          {historico.map(h =>(

            <tr key={h.id}>

              <td>{h.kmSaida}</td>
              <td>{h.kmRetorno}</td>
              <td>{h.kmRodado}</td>
              <td>{new Date(h.dataSaida).toLocaleDateString()}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}