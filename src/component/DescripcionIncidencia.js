import React from 'react';
import {Box, Divider, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {Close, NewReleases} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {fecha} from "../util/Util";
import IncidenciaServicio from "../services/IncidenciaServicio";

const DescripcionIncidencia = ({incidencia, setIncidencia, respuestas}) => {
    const {user} = useAuthContext();
    const [descripcion, setDescripcion] = React.useState("");
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const getNombre = (idUsuario) => {
        if (incidencia.usuario.idUsuario === idUsuario) {
            return incidencia.usuario.nombre + " " + incidencia.usuario.apellido;
        }
        return incidencia.asignacion.usuario.nombre + " " + incidencia.asignacion.usuario.nombre;
    }

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
                {incidencia.asignacion !== null ? incidencia.asignacion?.usuario?.nombre + " " + incidencia.asignacion?.usuario?.apellido : "Sin asignar"}
            </div>
            }

        </Box>
        <Box>
            <b>Estado: </b>
            {incidencia.estado === 0 ? <span className="exito-estado">abierto</span> :
                incidencia.estado === 1 ? <span className="proceso-estado">en proceso</span> :
                    incidencia.estado === 2 ? <span className="cerrado-estado">cerrado</span> :
                        incidencia.estado === 3 ? <span className="advertencia-estado">pendiente por el usuario</span> :
                            incidencia.estado === 4 ?
                                <span className="advertencia-estado">Pendiente por el proveedor</span> :
                                <span className="advertencia-estado">Pendiente</span>
            }
        </Box>
        <Box>
            <b>Descripción: </b>
            {descripcion}
        </Box>
        {respuestas?.length > 0 && respuestas?.map((r, k) =>
            (<React.Fragment key={`r-${k}`}>
                <Box style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
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