import {Stack} from "@mui/material";
import React from "react";
import DescripcionIncidencia from "./DescripcionIncidencia";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";
import FormRespuesta from "./FormRespuesta";

const VistaIncidencia = ({incidencia, setIncidencia, editaIncidencia}) => {
    const {user} = useAuthContext();
    const [respuestas, setRespuestas] = React.useState([]);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const agregaRespuesta = (nuevo, estado) => {
        let nIncidencia = {...incidencia, estado: estado};
        setIncidencia(nIncidencia);
        editaIncidencia(nIncidencia);
        setRespuestas([...respuestas, nuevo]);
    }


    React.useEffect(() => {
        incidenciaServicio.obtenRespuestas(incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && typeof data !== "string" && data !== null) {
                setRespuestas(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, [incidencia]);
    return (<Stack spacing={2}>
        <DescripcionIncidencia incidencia={incidencia} setIncidencia={setIncidencia} respuestas={respuestas}/>
        {incidencia.estado !== 2 && user.idRol !== 1 &&
        <FormRespuesta idIncidencia={incidencia.idIncidencia} agregaRespuesta={agregaRespuesta}
                       estado={incidencia.estado} setIncidencia={setIncidencia}/>}
    </Stack>);
};

export default VistaIncidencia;