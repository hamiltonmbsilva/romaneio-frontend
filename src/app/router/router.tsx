import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardPage } from "../../modules/dashboard/DashboardPage"
import { MainLayout } from "../../shared/layout/MainLayout"
import { VeiculosPage } from "../../modules/veiculos/VeiculosPage"
import { VeiculoHistoricoPage } from "../../modules/veiculos/pages/VeiculoHistoricoPage"

export function Router(){

  return(

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/veiculos" element={<VeiculosPage/>}/>
          <Route path="/veiculos/:id/historico" element={<VeiculoHistoricoPage/>}
    />

        </Routes>

      </MainLayout>

    </BrowserRouter>

  )

}