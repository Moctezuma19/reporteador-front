import React from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography
} from "@mui/material";
import UsuarioServicio from "../services/UsuarioServicio";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {Close} from "@mui/icons-material";

const AsignacionIncidencia = ({incidencia, setIncidencia, editaIncidencia}) => {

    const [ingenieros, setIngenieros] = React.useState([]);
    const [idIngeniero, setIdIngeniero] = React.useState(0);
    const [message, setMessage] = React.useState(null);
    const [descripcion, setDescripcion] = React.useState("");
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);

    const handleSubmit = () => {
        if (idIngeniero === 0) {
            setMessage({text: "Tienes que elegir a un ingeniero de servicio.", type: "warning"});
            return;
        }
        incidenciaServicio.asigna(idIngeniero, incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                editaIncidencia(data);
                //setMessage({text: "Se ha asignado la incidencia con éxito.", type: "success"});
            } else {
                setMessage({text: "No se pudo asignar la incidencia.", type: "error"});
            }
        }).catch((error) => {
            setMessage({text: "Error interno del servidor.", type: "error"});
            console.log("error: " + error);
        });

    }

    React.useEffect(() => {
        usuarioServicio.obtenIngenieros().then(({data}) => {
            if (typeof data !== "undefined" && data !== null && typeof data !== "string") {
                setIngenieros(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, []);

    React.useEffect(() => {
        incidenciaServicio.obtenDescripcion(incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                setDescripcion(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, [incidencia]);


    return (<Paper style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
        <Box>
            <IconButton style={{float: "right"}} onClick={(e) => {
                setIncidencia(null);
            }}>
                <Close/>
            </IconButton>

            <Typography variant={"h6"}>
                {incidencia.titulo}
            </Typography>
        </Box>
        <br/>
        {message !== null && <Alert style={{marginBottom: 5}} severity={message.type} onClose={(e) => {
            setMessage(null);
        }}>
            {message.text}
        </Alert>}
        <Box>
            <b>Autor: </b>
            {incidencia.usuario.nombre + " " + incidencia.usuario.apellido}
        </Box>
        <Box>
            <b>Descripción: </b>
            {descripcion}
        </Box>
        <Box>
            <FormControl variant={"standard"} sx={{m: 1, minWidth: "20em"}}>
                <InputLabel>Asignar ingeniero de servicio</InputLabel>
                <Select color="success" label={"Ingeniero de servicio"} value={idIngeniero} onChange={(e) => {
                    setIdIngeniero(e.target.value);
                }}>
                    <MenuItem value={0}>
                        --- Ninguno ---
                    </MenuItem>
                    {ingenieros.length > 0 && ingenieros.map((i, k) => {
                        return (<MenuItem value={i.idUsuario} key={"i-" + k}>
                            {i.nombre + " " + i.apellido}
                        </MenuItem>);
                    })}
                </Select>
            </FormControl>
        </Box>
        <Box style={{textAlign: "right"}}>
            <Button type={"button"} variant={"contained"} color={"success"} onClick={(e) => {
                handleSubmit();
            }}> Asignar </Button>
        </Box>
    </Paper>);
};

export default AsignacionIncidencia;