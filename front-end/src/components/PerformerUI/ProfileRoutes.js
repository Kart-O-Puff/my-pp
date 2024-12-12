import { Routes, Route, Outlet } from "react-router-dom"
import { Profile } from '../../pages/Profile'
import { CreateProfile } from './CreateProfile'
import DashboardLayoutPerformer from './DashboardLayoutPerformer'
import { EditProfile } from "./EditProfile"

export function ProfileRoutes() {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route index element = {<DashboardLayoutPerformer/>} />
                <Route path = 'view' element = {<DashboardLayoutPerformer/>} />
                <Route path = 'edit' element = {<EditProfile/>} />
                <Route path = 'create' element = {<CreateProfile/>} />
                <Route path = ':id' element = {<Profile/>} />
            </Route>
        </Routes>
    )
}