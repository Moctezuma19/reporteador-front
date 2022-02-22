import {Box, IconButton, Paper, Typography} from "@mui/material";
import React from "react";
import {Close} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";

const VistaIncidencia = ({incidencia, setIncidencia}) => {
    const {user} = useAuthContext();
    return (<Paper style={{textAlign: "left", padding: "1em"}}>
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
        <Box>
            {(user.idRol === 2 || user.idRol === 1) && <div>
                <b>Autor: </b>
                {incidencia.usuario.nombre + " " + incidencia.usuario.apellido}
            </div>
            }
            {(user.idRol === 3 || user.idRol === 1) && <div>
                <b>Ingeniero de servicio: </b>
                {incidencia.asignacion.usuario.nombre + " " + incidencia.usuario.apellido}
            </div>
            }

        </Box>
        <Box>
            <b>Descripción: </b>
            {incidencia.descripcion}
        </Box>
    </Paper>);
};

export default VistaIncidencia;