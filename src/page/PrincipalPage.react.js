import * as React from 'react';
import {
    Grid,
    Box,
    AppBar,
    Container, Toolbar, Typography, Button
} from "@mui/material";
import "../css/Principal.css";
import Icono from "../images/Icono.png";
import Usuarios from "../component/Usuarios";
import {useAuthContext} from "../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";
import Incidencia from "../component/Incidencia";
import {Ballot, Group, Logout} from "@mui/icons-material";

const PrincipalPage = () => {

    const {user, logout} = useAuthContext();
    const navigate = useNavigate();

    const [seleccionado, setSeleccionado] = React.useState(1);
    console.log("user", user);

    /*
    * <img src={Icono} alt={"logo"} width={30} height={36}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            Reporteador
                        </Typography>
    * */
    const selectedStyle = {
        backgroundColor: "white",
        color: "black",
        boxShadow: "rgba(145, 158, 171, 0.16) -2px 4px 6px 0px"
    }
    return (
        <div>
            <AppBar style={{backgroundColor: "white", boxShadow: "rgba(145, 158, 171, 0.16) 0px 8px 16px 0px"}}>
                <Container maxWidth="xl" style={{padding: "8px 0px"}}>
                    <div className="barra">
                        <div className="barra-hijo">
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionado(1);
                            }} startIcon={<Ballot/>} style={seleccionado === 1 ? selectedStyle : {}}>
                                Incidencias
                            </Button>
                            {user.idRol === 1 &&
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionado(2);
                            }} startIcon={<Group/>}
                                    style={seleccionado === 2 ? {...selectedStyle, marginLeft: 5, marginRight: 5} : { marginLeft: 5, marginRight: 5}}>
                                Usuarios
                            </Button>}
                            {/*<Button color={"inherit"} onClick={(e) => {
                                setSeleccionado((3))
                            }}>
                                Configuración
                            </Button>*/}
                            <Button color={"inherit"} onClick={(e) => {
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
                    {seleccionado === 1 && <Incidencia/>}
                    {seleccionado === 2 && <Usuarios/>}
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrincipalPage;