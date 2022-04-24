import React from 'react';
import UsuarioServicio from "../services/UsuarioServicio";
import {
    Alert,
    Box,
    CircularProgress,
    Grid
} from "@mui/material";
import ListaUsuarios from "../component/usuario/ListaUsuarios";
import FiltrosUsuarios from "../component/usuario/FiltrosUsuarios";

const UsuariosPage = () => {

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

    const eliminaUsuario = (id) => {
        setUsuarios(usuarios.filter(x => x.idUsuario !== id));
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
                    <ListaUsuarios usuarios={usuarios} setMessage={setMessage} eliminaUsuario={eliminaUsuario}/> :
                    <Alert severity={"warning"}>No se encontraron usuarios con los criterios asociados.</Alert>
                }
            </Grid>
            <Grid item xs={4}>
                <FiltrosUsuarios setUsuarios={setUsuarios}/>
            </Grid>

        </Grid>

    </Box>)
};

export default UsuariosPage;