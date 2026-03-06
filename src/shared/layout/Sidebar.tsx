import { Link } from "react-router-dom"
import "./sidebar.css"

export function Sidebar(){

  return(

    <aside className="sidebar">

      <h2 className="logo">
        LOGÍSTICA
      </h2>

      <nav>

        <Link to="/">Dashboard</Link>

        <Link to="/veiculos">
          Veículos
        </Link>

        <Link to="/clientes">
          Clientes
        </Link>

        <Link to="/romaneios">
          Romaneios
        </Link>

        <Link to="/entregas">
          Entregas
        </Link>

      </nav>

    </aside>

  )

}