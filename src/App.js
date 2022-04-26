import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import "tabler-react/dist/Tabler.css";
import LoginPage from "./page/LoginPage.react";
import PrincipalPage from "./page/PrincipalPage.react";
import React from "react";
import {useAuthContext} from "./context/AuthenticationContext";
import Page404 from "./page/404Page";
import Page403 from "./page/403Page";
import EdicionUsuarioPage from "./page/EdicionUsuarioPage.react";
import IncidenciaPage from "./page/IncidenciaPage.react";
import IncidenciasPage from "./page/IncidenciasPage.react";
import UsuariosPage from "./page/UsuariosPage.react";
import FormUsuarioPage from "./page/FormUsuarioPage";

import "./css/Principal.css";
import FormIncidenciaPage from "./page/FormIncidenciaPage.react";
import AsignacionIncidenciaPage from "./page/AsignacionIncidenciaPage.react";

function App() {
    const {user} = useAuthContext();

    const protectedRoute = (Component, admin) => {
        if (!user?.token) {
            return (<Navigate to={"/"}/>);
        }
        if (!admin || (admin && user.idRol === 1)) {
            return (<Component/>);
        }
        return (<Navigate to={"/acceso-prohibido"}/>);
    }

    return (<Router>
        <Routes>
            <Route path={"/"} element={<LoginPage/>}/>
            <Route path={"/r"} element={protectedRoute(PrincipalPage)}>
                <Route path={"/r/principal"} element={protectedRoute(PrincipalPage)}/>
                <Route path={"/r/usuario"} element={protectedRoute(EdicionUsuarioPage)}/>
                <Route path={"/r/incidencia"} element={protectedRoute(IncidenciaPage)}/>
                <Route path={"/r/incidencias"} element={protectedRoute(IncidenciasPage)}/>
                <Route path={"/r/usuarios"} element={protectedRoute(UsuariosPage)}/>
                <Route path={"/r/crea"} element={protectedRoute(FormUsuarioPage)}/>
                <Route path={"/r/reporta"} element={protectedRoute(FormIncidenciaPage)}/>
                <Route path={"/r/asignacion"} element={protectedRoute(AsignacionIncidenciaPage)}/>
            </Route>

            <Route path={"/acceso-prohibido"} element={<Page403/>}/>
            <Route path={"*"} element={<Page404/>}/>
        </Routes>
    </Router>);
}

export default App;
