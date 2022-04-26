import React from 'react';
import IncidenciaServicio from "../../services/IncidenciaServicio";
import {TableCell, TableRow, Tooltip} from "@mui/material";
import {fecha} from "../../util/Util";
import {Download, NewReleases, ZoomIn} from "@mui/icons-material";
import {useAuthContext} from "../../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";
import {INCIDENCIA_DEFAULT} from "../../util/Constants";

const RenglonIncidencia = ({idIncidencia, setSelectedIncidencia}) => {
    const {user} = useAuthContext();
    const [incidencia, setIncidencia] = React.useState(INCIDENCIA_DEFAULT);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const navigate = useNavigate();

    React.useEffect(() => {
        incidenciaServicio.obten(idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                setIncidencia(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, [idIncidencia]);

    return (<TableRow>
        <TableCell style={{color: "#717675"}}>
            {incidencia.idIncidencia}
        </TableCell>
        <TableCell style={{color: "#717675"}}>
            {incidencia.titulo.length > 15 ?
                (<Tooltip title={incidencia.titulo}><span>{incidencia.titulo.substring(0, 15) +
                    "..."}</span></Tooltip>) : <span>{incidencia.titulo}</span>}
        </TableCell>
        {user.idRol !== 3 && <TableCell style={{color: "#717675"}}>
            {incidencia.usuario !== null ? `${incidencia.usuario.nombre} ${incidencia.usuario.apellido}` : "-"}
        </TableCell>}
        <TableCell style={{color: "#717675"}}>
            {fecha(incidencia.creacion)}
        </TableCell>
        <TableCell style={{color: "#717675"}}>
            {fecha(incidencia.actualizacion)}
        </TableCell>
        {user.idRol !== 2 && <TableCell style={{color: "#717675"}}>
            {incidencia.asignacion !== null ? incidencia.asignacion.usuario.nombre + " " + incidencia.asignacion.usuario.apellido : "-"}
        </TableCell>}
        <TableCell style={{color: "#717675"}}>
            {incidencia.estado === 0 ?
                <div><span className="exito-estado">abierta</span> {incidencia.asignacion === null &&
                    <Tooltip
                        title={user.idRol === 1 ? "Sin ingeniero de servicio asignado" : "Pendiente de asignar"}><NewReleases
                        color={"error"}/></Tooltip>}</div> :
                incidencia.estado === 1 ?
                    <span className="proceso-estado">en proceso</span> :
                    incidencia.estado === 2 ?
                        <span className="cerrado-estado">cerrada</span> :
                        incidencia.estado === 3 ?
                            <span className="advertencia-estado">pendiente por el usuario</span> :
                            incidencia.estado === 4 ?
                                <span className="advertencia-estado">pendiente por el proveedor</span> :
                                <div><span className="advertencia-estado">pendiente</span> <Tooltip
                                    title={user.idRol === 1 ? "Sin ingeniero de servicio asignado" : "Pendiente de asignar"}><NewReleases
                                    color={"error"}/></Tooltip></div>
            }
        </TableCell>
        <TableCell>
            <div style={{display: "flex"}}>
                <Tooltip title={"Ver a detalle"}>
                    <ZoomIn className={"icon-users"} onClick={(e) => {
                        if (user.idRol === 1 && incidencia.asignacion === null) {
                            console.log("pase :(")
                            navigate(`/r/asignacion?id=${idIncidencia}`)
                        } else {
                            console.log("pase :)")
                            navigate(`/r/incidencia?id=${idIncidencia}`);
                        }
                    }}/>
                </Tooltip>
                {user.idRol === 1 && <Tooltip title={"Descargar reporte"}>
                    <Download className={"icon-users"}/>
                </Tooltip>}

            </div>
        </TableCell>
    </TableRow>);
}
export default RenglonIncidencia;