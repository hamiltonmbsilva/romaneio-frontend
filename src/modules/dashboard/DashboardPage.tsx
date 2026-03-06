import "./dashboard.css"

export function DashboardPage(){

  return(

    <div>

      <h2 className="title">
        Dashboard Logístico
      </h2>

      <div className="cards">

        <div className="card">

          <h3>Entregas do Dia</h3>

          <p>25</p>

        </div>

        <div className="card">

          <h3>Entregas Pendentes</h3>

          <p>10</p>

        </div>

        <div className="card">

          <h3>Romaneios Ativos</h3>

          <p>4</p>

        </div>

        <div className="card">

          <h3>Ocupação Veículos</h3>

          <p>72%</p>

        </div>

      </div>

    </div>

  )

}