import React from 'react';
import {Box, Divider, IconButton, Paper, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {fecha} from "../util/Util";

const DescripcionIncidencia = ({incidencia, setIncidencia, respuestas}) => {
    const {user} = useAuthContext();

    const getNombre = (idUsuario) => {
        if (incidencia.usuario.idUsuario === idUsuario) {
            return incidencia.usuario.nombre + " " + incidencia.usuario.apellido;
        }
        return incidencia.asignacion.usuario.nombre + " " + incidencia.asignacion.usuario.nombre;
    }
    console.log("respuestas", respuestas)

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
            {incidencia.estado === 1 ? <span className="proceso-estado">en proceso</span> :
                incidencia.estado === 2 ? <span className="cerrado-estado">cerrado</span> :
                    incidencia.estado === 3 ? <span className="advertencia-estado">pendiente por el usuario</span> :
                        <span className="advertencia-estado">pendiente por el proveedor</span>
            }
        </Box>
        <Box>
            <b>Descripción: </b>
            {incidencia?.descripcion}
        </Box>
        {respuestas?.length > 0 && respuestas?.map((r, k) =>
            (<React.Fragment>
                <Box key={`r-${k}`} style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
                    <Box>
                        <b> {r.idUsuario === user.idUsuario ? "Tú" : getNombre(r.idUsuario)}</b>
                        <p style={{color: "rgb(113, 118, 117)"}}>{fecha(r.actualizacion)}</p>
                    </Box>
                    <Box>
                        {r.descripcion}
                    </Box>
                </Box>
                {k !== respuestas.length - 1 && <Divider/>}
            </React.Fragment>))}
    </Paper>);
}

export default DescripcionIncidencia;