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

const PrincipalPage = () => {

    const {logout} = useAuthContext();
    const navigate = useNavigate();

    const [seleccionado, setSeleccionado] = React.useState(1);


    return (
        <div>
            <AppBar style={{backgroundColor: "rgb(130,190,181)"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={Icono} alt={"logo"} width={30} height={36}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            Reporteador
                        </Typography>
                        <Box>
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionado(1);
                            }}>
                                {/*<FactCheck/>*/}
                                <span>
                                    Incidencias
                                </span>
                            </Button>
                        </Box>
                        <Box>
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionado(2);
                            }}>
                                <span>
                                    Usuarios
                                </span>
                            </Button>
                        </Box>
                        <Box>
                            <Button color={"inherit"} onClick={(e) => {
                                setSeleccionado((3))
                            }}>
                                {/*<Settings/>*/}
                                <span>
                                    Configuración
                                </span>
                            </Button>
                        </Box>
                        <Box>
                            <Button color={"inherit"} onClick={(e) => {
                                logout();
                                navigate("/");
                            }}>
                                <span>
                                    Salir
                                </span>
                            </Button>
                        </Box>
                    </Toolbar>

                </Container>
            </AppBar>
            <Grid container spacing={1} style={{marginTop: 80}}>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={10} style={{textAlign: "center"}}>
                    {seleccionado === 2 &&
                    <Usuarios/>
                    }
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PrincipalPage;