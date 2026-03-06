import { Link } from "react-router-dom"
import "./sidebar.css"

export function Sidebar() {
  return (
    <aside className="sidebar">

      <h2 className="logo">Logística</h2>

      <nav>

        <Link to="/">Dashboard</Link>

        <Link to="/romaneios">
          Romaneios
        </Link>

        <Link to="/entregas">
          Entregas
        </Link>

        <Link to="/clientes">
          Clientes
        </Link>

        <Link to="/veiculos">
          Veículos
        </Link>

      </nav>

    </aside>
  )
}