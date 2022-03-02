import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import "tabler-react/dist/Tabler.css";
import LoginPage from "./page/LoginPage.react";
import PrincipalPage from "./page/PrincipalPage.react";
import React from "react";
import {useAuthContext} from "./context/AuthenticationContext";
import Page404 from "./page/404Page";

function App() {
    const {user} = useAuthContext();

    const protectedRoute = (Component) => {
        return user?.token ? <Component/> : <Navigate to={"/"}/>;
    }

    return (<Router>
        <Routes>
            <Route path={"/"} element={<LoginPage/>}/>
            <Route path={"/principal"} element={protectedRoute(PrincipalPage)}/>
            <Route path={"*"} element={<Page404/>}/>
        </Routes>
    </Router>);
}

export default App;
