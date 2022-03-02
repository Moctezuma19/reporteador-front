import {Box, Paper, Stack} from "@mui/material";
import React from "react";
import DescripcionIncidencia from "./DescripcionIncidencia";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";
import FormRespuesta from "./FormRespuesta";
import {fecha} from "../util/Util";

const VistaIncidencia = ({incidencia, setIncidencia, editaIncidencia}) => {
    const {user} = useAuthContext();
    const [respuestas, setRespuestas] = React.useState([]);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const agregaRespuesta = (nuevo, cierre) => {
        if (cierre) {
            setIncidencia({...incidencia, estado: 2});
            editaIncidencia();
        }
        setRespuestas([...respuestas, nuevo]);
    }

    const getNombre = (idUsuario) => {
        if (incidencia.usuario.idUsuario === idUsuario) {
            return incidencia.usuario.nombre + " " + incidencia.usuario.apellido;
        }
        return incidencia.asignacion.usuario.nombre + " " + incidencia.asignacion.usuario.nombre;
    }
    React.useEffect(() => {
        incidenciaServicio.obtenRespuestas(incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && typeof data !== "string" && data !== null) {
                setRespuestas(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, []);
    return (<Stack spacing={2}>
        <DescripcionIncidencia incidencia={incidencia} setIncidencia={setIncidencia}/>
        {respuestas.length > 0 && respuestas.map((r, k) =>
            (<Paper key={`r-${k}`} style={{textAlign: "left", padding: "1em"}}>
                <Box>
                    <b>Fecha: </b>
                    {fecha(r.actualizacion)}
                </Box>
                <Box>
                    <b>Responde: </b>
                    {r.idUsuario === user.idUsuario ? "Tú" : getNombre(r.idUsuario)}
                </Box>
                <Box>
                    {r.descripcion}
                </Box>
            </Paper>))}
        {incidencia.estado !== 2 && user.idRol !== 1 &&
        <FormRespuesta idIncidencia={incidencia.idIncidencia} agregaRespuesta={agregaRespuesta}/>}
    </Stack>);
};

export default VistaIncidencia;