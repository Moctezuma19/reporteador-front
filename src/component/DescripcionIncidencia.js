import React from 'react';
import {Box, IconButton, Paper, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {fecha} from "../util/Util";

const DescripcionIncidencia = ({incidencia, setIncidencia}) => {
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
            <div>
                <b>Creación: </b>
                {fecha(incidencia.creacion)}
            </div>
            <div>
                <b>Actualización: </b>
                {fecha(incidencia.actualizacion)}
            </div>
        </Box>
        <Box>
            {user.idRol !== 3 && <div>
                <b>Autor: </b>
                {incidencia.usuario.nombre + " " + incidencia.usuario.apellido}
            </div>
            }
            {user.idRol !== 2 && <div>
                <b>Ingeniero de servicio: </b>
                {incidencia.asignacion.usuario.nombre + " " + incidencia.usuario.apellido}
            </div>
            }

        </Box>
        <Box>
            <b>Estado: </b>
            {incidencia.estado === 1 ? "En proceso" :
                incidencia.estado === 2 ? "Cerrado" :
                    incidencia.estado === 3 ? "Pendiente por el usuario" :
                        "Pendiente por el proveedor"
            }
        </Box>
        <Box>
            <b>Descripción: </b>
            {incidencia.descripcion}
        </Box>
    </Paper>);
}

export default DescripcionIncidencia;