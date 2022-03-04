import React from 'react';
import UsuarioServicio from "../services/UsuarioServicio";
import {
    Alert,
    Box,
    CircularProgress, Grid
} from "@mui/material";
import ListaUsuarios from "./ListaUsuarios";
import FormUsuario from "./FormUsuario";
import EditaUsuario from "./EditaUsuario";

const Usuarios = () => {
    const [usuario, setUsuario] = React.useState(null);
    const [usuarios, setUsuarios] = React.useState([]);
    const [showLoader, setShowLoader] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);


    React.useEffect(() => {
        usuarioServicio.obtenTodos().then(({data}) => {
            if (typeof data !== "undefined" && data !== null && data.length > 0) {
                setUsuarios(data);
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
                {usuarios.length > 0 ?
                    <ListaUsuarios usuarios={usuarios} setUsuario={setUsuario} edita={usuario !== null}
                                   setMessage={setMessage} eliminaUsuario={eliminaUsuario}/> :
                    <h6>Sin usuarios.</h6>
                }
            </Grid>
            <Grid item xs={4}>
                {usuario !== null ?
                    <EditaUsuario editaUsuario={editaUsuario} usuario_={usuario} cierra={cierraEdita}/>
                    :
                    <FormUsuario agregaUsuario={agregaUsuario}/>
                }
            </Grid>

        </Grid>

    </Box>)
};

export default Usuarios;