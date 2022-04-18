import React from 'react';
import {Alert, Grid} from "@mui/material";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";
import FormIncidencia from "./FormIncidencia";
import ListaIncidencias from "./ListaIncidencias";
import AsignacionIncidencia from "./AsignacionIncidencia";
import VistaIncidencia from "./VistaIncidencia";
import FiltrosIncidencia from "./FiltrosIncidencia";

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
        let inc = {...selectedIncidencia, asignacion: {usuario: usuario}, estado: 1};
        let idx = incidencias.findIndex(i => i.idIncidencia === inc.idIncidencia);
        let incs = [...incidencias];
        incs[idx] = {...inc};
        setIncidencias(incs);
        setSelectedIncidencia(null);
    }

    const editaIncidencia = (nIncidencia) => {
        let inc = {...nIncidencia};
        let idx = incidencias.findIndex(i => i.idIncidencia === inc.idIncidencia);
        let incs = [...incidencias];
        incs[idx] = {...inc};
        setIncidencias(incs);
    }

    return (<Grid container spacing={2}>
        <Grid item xs={9}>
            <Grid container>
                <Grid item xs={12}>
                    {incidencias.length === 0 && <Alert severity="warning">
                        No hay incidencias
                    </Alert>}
                    {incidencias.length > 0 &&
                        <ListaIncidencias incidencias={incidencias} setSelectedIncidencia={setSelectedIncidencia}/>}
                </Grid>
                <Grid item xs={12} style={{marginTop: 20}}>
                    {user.idRol === 3 && selectedIncidencia === null && <FormIncidencia agregaIncidencia={agregaIncidencia}/>}
                    {selectedIncidencia !== null && user.idRol === 1 && selectedIncidencia.estado === 0 && selectedIncidencia.asignacion === null &&
                        <AsignacionIncidencia incidencia={selectedIncidencia} setIncidencia={setSelectedIncidencia}
                                              editaIncidencia={asignaIncidencia}/>}
                    {selectedIncidencia !== null &&  selectedIncidencia.asignacion !== null &&
                        <VistaIncidencia incidencia={selectedIncidencia} setIncidencia={setSelectedIncidencia}
                                         editaIncidencia={editaIncidencia}/>}
                </Grid>
            </Grid>

        </Grid>
        <Grid item xs={3}>
            <FiltrosIncidencia setIncidencias={setIncidencias}/>
        </Grid>
    </Grid>);
};

export default Incidencia;