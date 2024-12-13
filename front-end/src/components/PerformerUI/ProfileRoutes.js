import { Routes, Route, Outlet } from "react-router-dom"
import DashboardLayoutPerformer from './DashboardLayoutPerformer'

export function ProfileRoutes() {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route index element = {<DashboardLayoutPerformer/>} />
            </Route>
        </Routes>
    )
}