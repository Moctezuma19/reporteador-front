import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import "tabler-react/dist/Tabler.css";
import LoginPage from "./page/LoginPage.react";
import PrincipalPage from "./page/PrincipalPage.react";
import * as React from "react";

function App() {
    return (<Router>
        <Routes>
            <Route exact path={"/"} element={<LoginPage/>}/>
            <Route exact path={"/principal"} element={<PrincipalPage/>}/>
        </Routes>
    </Router>);
}

export default App;
