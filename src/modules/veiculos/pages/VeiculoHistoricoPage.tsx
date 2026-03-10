import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid,
 ResponsiveContainer
} from "recharts"
import { useEffect, useState } from "react"
import { listarHistorico } from "../services/veiculoKmService"
import { Modal } from "../../../shared/components/Modal"
import { RegistrarSaidaForm } from "../components/RegistrarSaidaForm"
import { RegistrarRetornoForm } from "../components/RegistrarRetornoForm"
import "../historico.css"
import { useParams } from "react-router-dom"
import { EditarKmForm } from "../components/EditarKmForm"


export function VeiculoHistoricoPage(){
  

const { id: veiculoId } = useParams()
 

 const [historico,setHistorico] = useState<any[]>([])
 const [modalSaida,setModalSaida] = useState(false)
 const [modalRetorno,setModalRetorno] = useState<any>(null)
 const [modalEditar,setModalEditar] = useState<any>(null)

 const [pagina,setPagina] = useState(1)
 const itensPorPagina = 5

 const inicio = (pagina - 1) * itensPorPagina
 const fim = inicio + itensPorPagina

 const historicoPaginado = historico.slice(inicio,fim)

 const totalPaginas = Math.ceil(historico.length / itensPorPagina)
 

  async function carregar(){

    if(!veiculoId) return

    const data = await listarHistorico(veiculoId)

    setHistorico(data)

  }

  function editarRegistro(registro:any){

    setModalEditar(registro)

  }

  const dadosGrafico = historico
  .filter(h => h.kmRodado)
  .map((h,index) => ({

    viagem: index + 1,
    km: h.kmRodado

  }))

 useEffect(()=>{

 carregar()

},[veiculoId])

    const ultimoRegistro = historico[0]

    const kmAtual = ultimoRegistro
    ? ultimoRegistro.kmRetorno ?? ultimoRegistro.kmSaida
    : 0

    const ultimaSaida = historico[0]?.dataSaida

    const ultimoRetorno = historico.find(h => h.kmRetorno)?.dataRetorno

    const totalViagens = historico.length   

    const kmTotal = historico.reduce((acc,h)=>{
      return acc + (h.kmRodado ?? 0)
    },0)

     const mediaKm = totalViagens
    ? Math.round(kmTotal / totalViagens)
    : 0

    const viagemAberta = historico.some(h => h.kmRetorno === null)

    const precisaManutencao = kmTotal >= 5000


 return(

      <div className="historico-container">

      <div className="historico-header">

        <h2>Histórico de KM</h2>

        {!viagemAberta && (
          <button
            className="btn-saida"
            onClick={() => setModalSaida(true)}
          >
            Registrar Saída
          </button>
        )}

      </div>

      <div className="dashboard-km">

        <div className="card">

      <h4>Última Saída</h4>

      <p>
        {ultimaSaida
        ? new Date(ultimaSaida).toLocaleDateString()
        : "-"}
      </p>

      </div>

      <div className="card">

      <h4>Último Retorno</h4>

      <p>
        {ultimoRetorno
        ? new Date(ultimoRetorno).toLocaleDateString()
        : "-"}
      </p>

      </div>

      <div className="card">

        <h4>KM Atual</h4>
        <p>{kmAtual}</p>

      </div>

      <div className="card">

        <h4>Total de Viagens</h4>
        <p>{totalViagens}</p>

      </div>

      <div className="card">

        <h4>Média KM / Viagem</h4>

      <p>{mediaKm}</p>

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
          <th>Data Saída</th>
          <th>Data Retorno</th>
          <th>Ações</th>
        </tr>

        </thead>

        <tbody>

        {historicoPaginado.map(h =>(

          <tr key={h.id}>

            <td>{h.kmSaida}</td>

            <td>{h.kmRetorno ?? "-"}</td>

            <td>{h.kmRodado ?? "-"}</td>

            <td>
              {new Date(h.dataSaida).toLocaleDateString()}
            </td>

            <td>
              {h.dataRetorno
                ? new Date(h.dataRetorno).toLocaleDateString()
                : "-"
              }
            </td>

            <td className="acoes-tabela">

            {h.kmRetorno === null && (

              <button
              className="btn-retorno"
              onClick={()=>setModalRetorno(h)}
              >
              Registrar Retorno
              </button>

            )}

            <button
              className="btn-editar"
              onClick={()=>editarRegistro(h)}
            >
              Editar
            </button>

            </td>

          </tr>

        ))}

        </tbody>

      </table>

      <div className="paginacao">

        <button
        disabled={pagina === 1}
        onClick={()=>setPagina(pagina - 1)}
        >
        Anterior
        </button>

        <span>
        Página {pagina} de {totalPaginas}
        </span>

        <button
        disabled={pagina === totalPaginas}
        onClick={()=>setPagina(pagina + 1)}
        >
        Próxima
        </button>

      </div>


      <div className="grafico">

        <h3>KM por viagem</h3>

        <ResponsiveContainer width="100%" height={300}>

        <LineChart data={dadosGrafico}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="viagem" />

          <YAxis />

          <Tooltip />

          <Line
          type="monotone"
          dataKey="km"
          stroke="#007FFF"
          strokeWidth={3}
          />

        </LineChart>

        </ResponsiveContainer>

        </div>

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

      {precisaManutencao && (

        <div className="alerta-manutencao">

          ⚠ Veículo precisa de manutenção

        </div>

        )}

        {modalEditar && (

        <Modal onClose={()=>setModalEditar(null)}>

          <EditarKmForm
            registro={modalEditar}
            onSuccess={()=>{
              setModalEditar(null)
              carregar()
            }}
          />

        </Modal>

        )}

  </div>

 )

}