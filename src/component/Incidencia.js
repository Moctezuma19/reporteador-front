import React from 'react';
import {Grid} from "@mui/material";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";
import FormIncidencia from "./FormIncidencia";
import ListaIncidencias from "./ListaIncidencias";
import AsignacionIncidencia from "./AsignacionIncidencia";
import VistaIncidencia from "./VistaIncidencia";

const Incidencia = () => {
    const {user} = useAuthContext();
    const [selectedIncidencia, setSelectedIncidencia] = React.useState(null);
    const [incidencias, setIncidencias] = React.useState([]);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    React.useEffect(() => {
        incidenciaServicio.obtenTodas(user.idUsuario).then(({data}) => {
            if (typeof data !== "undefined" && data !== null && data.length > 0) {
                console.log("data", data);
                setIncidencias(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });

    }, []);

    const agregaIncidencia = (nuevo) => {
        setIncidencias([...incidencias, nuevo]);
    }

    return (<Grid container spacing={2}>
        <Grid item xs={7}>
            {incidencias.length > 0 &&
            <ListaIncidencias incidencias={incidencias} setSelectedIncidencia={setSelectedIncidencia}/>}
        </Grid>
        <Grid item xs={5}>
            {user.idRol !== 1 && <FormIncidencia agregaIncidencia={agregaIncidencia}/>}
            {selectedIncidencia !== null && user.idRol === 1 && selectedIncidencia.estado === 0 &&
            <AsignacionIncidencia incidencia={selectedIncidencia}/>}
            {selectedIncidencia !== null && (user.idRol !== 1 || selectedIncidencia.estado !== 0) &&
            <VistaIncidencia incidencia={selectedIncidencia}/>}
        </Grid>
    </Grid>);
};

export default Incidencia;