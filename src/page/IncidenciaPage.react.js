import React from 'react';
import Incidencia from "../component/incidencia/Incidencia";

const IncidenciaPage = () => {

    const [idIncidencia, setIdIncidencia] = React.useState(0);

    React.useEffect(() => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        if (typeof id !== "undefined" && id !== null) {
            setIdIncidencia(parseInt(id));
            console.log("id", id)
        }
    }, []);

    return (<Incidencia idIncidencia={idIncidencia}/>);
}

export default IncidenciaPage;