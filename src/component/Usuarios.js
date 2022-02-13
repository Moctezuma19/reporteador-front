import React from 'react';
import UsuarioServicio from "../services/UsuarioServicio";
import {
    Alert,
    Box,
    CircularProgress,
    Tabs,
    Tab, Paper, Grid
} from "@mui/material";
import {Delete, PeopleAlt, Settings} from "@mui/icons-material";
import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./FormUsuario";

const Usuarios = () => {
    const [seleccion, setSeleccion] = React.useState(0);
    const [usuarios, setUsuarios] = React.useState([]);
    const [showLoader, setShowLoader] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);

    const handleChangeSeleccion = (event, newValue) => {
        setSeleccion(newValue);
    }


    React.useEffect(() => {
        usuarioServicio.obtenTodos().then(({data}) => {
            console.log("usuarios", data)
            if (typeof data !== "undefined" && data !== null && data.length > 0) {
                setUsuarios(data);
            } else {
                setMessage({
                    text: "No se encuentraron usuarios.",
                    type: "warning"
                });
            }
            setShowLoader(false);
        }).catch((error) => {
            setMessage({
                text: "Error interno del servidor.",
                type: "error"
            });
            setShowLoader(false);
            console.log("error: " + error)
        })
    }, []);

    const agregaUsuario = (nuevo) => {
        let usuarios_ = [...usuarios, nuevo];
        console.log("nuevo usuario", usuarios_)
        setUsuarios(usuarios_);
    }


    return (<Box>
        <div style={{display: "flex", paddingTop: 1}}>
            <PeopleAlt fontSize={"large"}/>
            <h1> Usuarios </h1>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {showLoader &&
                <CircularProgress color={"success"}/>
                }
                {!showLoader && message !== null &&
                <Alert severity={message.type} onClose={() => {
                    setMessage(null);
                }}>
                    {message.text}
                </Alert>
                }
                {usuarios.length > 0 ?
                    <ListaUsuarios usuarios={usuarios}/> :
                    <h6>Sin usuarios.</h6>
                }
            </Grid>
            <Grid item xs={4}>
                <FormUsuario agregaUsuario={agregaUsuario}/>
            </Grid>

        </Grid>

    </Box>)
};

export default Usuarios;