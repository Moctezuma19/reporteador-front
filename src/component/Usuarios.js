import React from 'react';
import UsuarioServicio from "../services/UsuarioServicio";
import {
    Alert,
    Box,
    CircularProgress, Grid, Stack
} from "@mui/material";
import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./FormUsuario";
import EditaUsuario from "./EditaUsuario";
import FiltrosUsuarios from "./FiltrosUsuarios";

const Usuarios = () => {
    const [usuario, setUsuario] = React.useState(null);
    const [usuarios, setUsuarios] = React.useState([]);
    const [usuariosFiltro, setUsuariosFiltro] = React.useState([]);
    const [showLoader, setShowLoader] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const [filtro, setFiltro] = React.useState({
        correo: "",
        nombre: "",
        esIngeniero: true,
        esUsuario: true,
        esAdministrador: true
    });
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);


    React.useEffect(() => {
        usuarioServicio.obtenTodos().then(({data}) => {
            if (typeof data !== "undefined" && data !== null && data.length > 0) {
                setUsuarios(data);
                setUsuariosFiltro(data);
            } else {
                setMessage({
                    text: "No se encontraron usuarios.",
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

    React.useEffect(() => {
        let uf = usuarios.filter(u => u.correo.toLowerCase().includes(filtro.correo.toLowerCase()) &&
            (`${u.nombre} ${u.apellido}`).toLowerCase().includes(filtro.nombre.toLowerCase()) &&
            ((u.rol.idRol === 2 && filtro.esIngeniero) || (u.rol.idRol === 3 && filtro.esUsuario) ||
                (u.rol.idRol === 1 && filtro.esAdministrador))
        );

        setUsuariosFiltro(uf);
    }, [filtro, usuarios]);

    const agregaUsuario = (nuevo) => {
        let usuarios_ = [...usuarios, nuevo];
        setUsuarios(usuarios_);
    }
    const editaUsuario = (u) => {
        let idx = usuarios.findIndex(x => x.idUsuario === u.idUsuario);
        let usuarios_ = [...usuarios];
        usuarios_[idx] = {...u};
        setUsuarios(usuarios_);
    }

    const eliminaUsuario = (id) => {
        setUsuarios(usuarios.filter(x => x.idUsuario !== id));
    }
    const cierraEdita = () => {
        setUsuario(null);
    }


    return (<Box>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {showLoader &&
                <CircularProgress color={"success"}/>
                }
                {!showLoader && message !== null &&
                <Alert severity={message.type} style={{marginBottom: 10}} onClose={() => {
                    setMessage(null);
                }}>
                    {message.text}
                </Alert>
                }
                {usuariosFiltro.length > 0 ?
                    <ListaUsuarios usuarios={usuariosFiltro} setUsuario={setUsuario} edita={usuario !== null}
                                   setMessage={setMessage} eliminaUsuario={eliminaUsuario}/> :
                    <Alert severity={"warning"}>No se encontraron usuarios con los criterios asociados.</Alert>
                }
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <FiltrosUsuarios filtro={filtro} setFiltros={setFiltro}/>
                    {usuario !== null ?
                        <EditaUsuario editaUsuario={editaUsuario} usuario_={usuario} cierra={cierraEdita}/>
                        :
                        <FormUsuario agregaUsuario={agregaUsuario}/>
                    }
                </Stack>

            </Grid>

        </Grid>

    </Box>)
};

export default Usuarios;