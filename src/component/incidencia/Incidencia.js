import React from 'react';
import {useAuthContext} from "../../context/AuthenticationContext";
import IncidenciaServicio from "../../services/IncidenciaServicio";
import {Stack} from "@mui/material";
import DescripcionIncidencia from "./DescripcionIncidencia";
import FormRespuesta from "./FormRespuesta";

const Incidencia = ({idIncidencia}) => {
    const {user} = useAuthContext();
    const [respuestas, setRespuestas] = React.useState([]);
    const [incidencia, setIncidencia] = React.useState(null);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const agregaRespuesta = (nuevo, estado) => {
        let nIncidencia = {...incidencia, estado: estado};
        setIncidencia(nIncidencia);
        setRespuestas([...respuestas, nuevo]);
    }


    React.useEffect(() => {
        incidenciaServicio.obten(idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && typeof data !== "string" && data !== null) {
                setIncidencia(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        })

    }, [idIncidencia]);

    React.useEffect(() => {
        incidenciaServicio.obtenRespuestas(idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && typeof data !== "string" && data !== null) {
                setRespuestas(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });

    }, [incidencia])
    return (<Stack spacing={2}>
        {incidencia !== null &&
            <DescripcionIncidencia incidencia={incidencia} setIncidencia={setIncidencia} respuestas={respuestas} cerrable={false}/>
        }
        {incidencia !== null && incidencia.estado !== 2 && user.idRol !== 1 &&
            <FormRespuesta idIncidencia={incidencia.idIncidencia} agregaRespuesta={agregaRespuesta}
                           estado={incidencia.estado} setIncidencia={setIncidencia}/>}
    </Stack>);

};

export default Incidencia;