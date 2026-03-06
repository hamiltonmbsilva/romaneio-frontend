import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DashboardPage } from "../../modules/dashboard/DashboardPage"
import { MainLayout } from "../../shared/layout/MainLayout"

export function Router(){

  return(

    <BrowserRouter>

      <MainLayout>

        <Routes>

          <Route path="/" element={<DashboardPage/>}/>

        </Routes>

      </MainLayout>

    </BrowserRouter>

  )

}