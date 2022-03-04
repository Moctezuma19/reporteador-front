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
                setIncidencias(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });

    }, []);

    const agregaIncidencia = (nuevo) => {
        setIncidencias([...incidencias, nuevo]);
    }

    const asignaIncidencia = (usuario) => {
        let inc = {...selectedIncidencia, asignacion : {usuario: usuario}, estado: 1};
        let idx = incidencias.findIndex(i => i.idIncidencia === inc.idIncidencia);
        let incs = [...incidencias];
        incs[idx] = {...inc};
        setIncidencias(incs);
        setSelectedIncidencia(null);
    }

    const editaIncidencia = () => {
        let inc = {...selectedIncidencia, estado: 2};
        let idx = incidencias.findIndex(i => i.idIncidencia === inc.idIncidencia);
        let incs = [...incidencias];
        incs[idx] = {...inc};
        setIncidencias(incs);
        setSelectedIncidencia(null);
    }

    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            {incidencias.length > 0 &&
            <ListaIncidencias incidencias={incidencias} setSelectedIncidencia={setSelectedIncidencia}/>}
        </Grid>
        <Grid item xs={6}>
            {user.idRol === 3 && selectedIncidencia === null && <FormIncidencia agregaIncidencia={agregaIncidencia}/>}
            {selectedIncidencia !== null && user.idRol === 1 && selectedIncidencia.estado === 0 &&
            <AsignacionIncidencia incidencia={selectedIncidencia} setIncidencia={setSelectedIncidencia} editaIncidencia={asignaIncidencia}/>}
            {selectedIncidencia !== null && (user.idRol !== 1 || selectedIncidencia.estado !== 0) &&
            <VistaIncidencia incidencia={selectedIncidencia} setIncidencia={setSelectedIncidencia} editaIncidencia={editaIncidencia}/>}
        </Grid>
    </Grid>);
};

export default Incidencia;