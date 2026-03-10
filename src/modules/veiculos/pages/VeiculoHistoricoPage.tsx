import { useEffect, useState } from "react"
import { listarHistorico } from "../services/veiculoKmService"
import { Modal } from "../../../shared/components/Modal"
import { RegistrarSaidaForm } from "../components/RegistrarSaidaForm"
import { RegistrarRetornoForm } from "../components/RegistrarRetornoForm"
import "../historico.css"
import { useParams } from "react-router-dom"


export function VeiculoHistoricoPage(){

const { id: veiculoId } = useParams()
 

 const [historico,setHistorico] = useState<any[]>([])
 const [modalSaida,setModalSaida] = useState(false)
 const [modalRetorno,setModalRetorno] = useState<any>(null)

  async function carregar(){

    if(!veiculoId) return

    const data = await listarHistorico(veiculoId)

    setHistorico(data)

  }

 useEffect(()=>{

 carregar()

},[veiculoId])

    const kmAtual = historico.length
      ? historico[0].kmRetorno ?? historico[0].kmSaida
      : 0

    const totalViagens = historico.length

    const kmTotal = historico.reduce((acc,h)=>{
      return acc + (h.kmRodado ?? 0)
    },0)

    const viagemAberta = historico.find(h => !h.kmRetorno)


 return(

  <div className="historico-container">

   <div className="historico-header">

    <h2>Histórico de KM</h2>

    <div className="acoes">

      {!viagemAberta && (

        <button
        className="btn-saida"
        onClick={()=>setModalSaida(true)}
        >
        Registrar Saída
        </button>

      )}

    </div>

   </div>

   <div className="dashboard-km">

  <div className="card">

    <h4>KM Atual</h4>
    <p>{kmAtual}</p>

  </div>

  <div className="card">

    <h4>Total de Viagens</h4>
    <p>{totalViagens}</p>

  </div>

  <div className="card">

    <h4>KM Rodado</h4>
    <p>{kmTotal}</p>

  </div>

  <div className="card">

    <h4>Status</h4>

    {viagemAberta ? (
      <span className="status andamento">
        Em viagem
      </span>
    ):(
      <span className="status parado">
        Disponível
      </span>
    )}

  </div>

  </div>

   <table>

    <thead>

     <tr>
      <th>KM Saída</th>
      <th>KM Retorno</th>
      <th>KM Rodado</th>
      <th>Data</th>
      <th>Ações</th>
     </tr>

    </thead>

    <tbody>

     {historico.map(h =>(

      <tr key={h.id}>

       <td>{h.kmSaida}</td>

       <td>{h.kmRetorno ?? "-"}</td>

       <td>{h.kmRodado ?? "-"}</td>

       <td>
        {new Date(h.dataSaida).toLocaleDateString()}
       </td>

       <td>

        {!h.kmRetorno && (

         <button onClick={()=>setModalRetorno(h)}>
          Registrar Retorno
         </button>

        )}

       </td>

      </tr>

     ))}

    </tbody>

   </table>

   {modalSaida && (

    <Modal onClose={()=>setModalSaida(false)}>

      <RegistrarSaidaForm
       veiculoId={veiculoId}
       onSuccess={()=>{
        setModalSaida(false)
        carregar()
       }}
      />

    </Modal>

   )}

   {modalRetorno && (

    <Modal onClose={()=>setModalRetorno(null)}>

      <RegistrarRetornoForm
       registro={modalRetorno}
       onSuccess={()=>{
        setModalRetorno(null)
        carregar()
       }}
      />

    </Modal>

   )}

  </div>

 )

}