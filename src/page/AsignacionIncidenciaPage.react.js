import React from 'react';
import AsignacionIncidencia from "../component/incidencia/AsignacionIncidencia";

const AsignacionIncidenciaPage = () => {
    const [idIncidencia, setIdIncidencia] = React.useState(0);

    React.useEffect(() => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        if (typeof id !== "undefined" && id !== null) {
            setIdIncidencia(parseInt(id));
        }
    }, []);

    return (<AsignacionIncidencia idIncidencia={idIncidencia}/>)
}
export default AsignacionIncidenciaPage;