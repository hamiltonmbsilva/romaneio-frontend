import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardPage } from "../../modules/dashboard/DashboardPage"
import { MainLayout } from "../../shared/layout/MainLayout"
import { VeiculosPage } from "../../modules/veiculos/VeiculosPage"

export function Router(){

  return(

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/veiculos" element={<VeiculosPage/>}/>

        </Routes>

      </MainLayout>

    </BrowserRouter>

  )

}