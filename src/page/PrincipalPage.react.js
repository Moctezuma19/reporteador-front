import * as React from 'react';
import {
    Grid,
    AppBar,
    Container, Button
} from "@mui/material";
import "../css/Principal.css";
import {useAuthContext} from "../context/AuthenticationContext";
import {useNavigate, Outlet} from "react-router-dom";
import {AddBox, Ballot, Group, Logout, PersonAdd} from "@mui/icons-material";

const PrincipalPage = () => {

    const {user, seleccionada, logout, setSeleccionada} = useAuthContext();
    const navigate = useNavigate();

    const selectedStyle = {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(145, 158, 171, 0.16) -2px 4px 6px 0px",
        fontWeight: "bold"
    }

    return (
        <div>
            <AppBar style={{backgroundColor: "white", boxShadow: "rgba(145, 158, 171, 0.16) 0px 8px 16px 0px"}}>
                <Container maxWidth="xl" style={{padding: "8px 0px"}}>
                    <div className="barra">
                        <div className="barra-hijo">
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionada(1);
                                navigate("/r/incidencias");
                            }} startIcon={<Ballot/>}
                                    style={seleccionada === 1 ? {...selectedStyle, marginRight: 5} : {marginRight: 5}}>
                                Incidencias
                            </Button>
                            {user.idRol === 3 &&
                                <Button color={"inherit"} onClick={(e) => {
                                    setSeleccionada(2);
                                    navigate("/r/reporta")
                                }} startIcon={<AddBox/>}
                                        style={seleccionada === 2 ? {...selectedStyle, marginRight: 5} : {marginRight: 5}}>
                                    Incidencia
                                </Button>}
                            {user.idRol === 1 &&
                                <Button color={"inherit"} onClick={(e) => {
                                    setSeleccionada(3);
                                    navigate("/r/usuarios")
                                }} startIcon={<Group/>}
                                        style={seleccionada === 3 ? {...selectedStyle} : {}}>
                                    Usuarios
                                </Button>}
                            {user.idRol === 1 &&
                                <Button color={"inherit"} onClick={(e) => {
                                    setSeleccionada(4);
                                    navigate("/r/crea");
                                }} startIcon={<PersonAdd/>}
                                        style={seleccionada === 4 ? {
                                            ...selectedStyle,
                                            marginLeft: 5
                                        } : {marginLeft: 5}}>
                                    Usuario
                                </Button>}
                            <Button color={"inherit"} style={{marginLeft: 5}} onClick={(e) => {
                                logout();
                                navigate("/");
                            }} startIcon={<Logout/>}>
                                Salir
                            </Button>
                        </div>
                    </div>
                </Container>
            </AppBar>
            <Grid container spacing={1} style={{marginTop: 80}}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10} style={{textAlign: "center"}}>
                    <Outlet/>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrincipalPage;