import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow, Tooltip
} from "@mui/material";
import {NewReleases, ZoomIn} from "@mui/icons-material";
import React from "react";
import {useAuthContext} from "../context/AuthenticationContext";

const ListaIncidencias = ({incidencias, setSelectedIncidencia}) => {
    const {user} = useAuthContext();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const fecha = (n) => {
        if (n === null) {
            return "-";
        }
        let d = new Date(n);
        return `${d.getDate() < 10 ? d.getDate() + "0" : d.getDate()}-`
            + `${d.getMonth() + 1 < 10 ? (d.getMonth() + 1) + "0" : d.getMonth() + 1}-${d.getFullYear()}`
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (<Paper elevation={3}>
        <Table size={"medium"}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <b>#</b>
                    </TableCell>
                    <TableCell>
                        <b>Titulo</b>
                    </TableCell>
                    {user.idRol !== 3 && <TableCell>
                        <b>Autor</b>
                    </TableCell>}
                    <TableCell>
                        <b>Creacion</b>
                    </TableCell>
                    <TableCell>
                        <b>Actualización</b>
                    </TableCell>
                    <TableCell>
                        <b>Cierre</b>
                    </TableCell>
                    {user.idRol !== 2 && <TableCell>
                        <b>Ingeniero</b>
                    </TableCell>}
                    <TableCell>
                        <b>Estado</b>
                    </TableCell>
                    <TableCell>
                        <b>Acciones</b>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {incidencias.map((incidencia, k) => {
                    return (<TableRow key={`tr-${k}`}>
                        <TableCell style={{color: "#717675"}}>
                            {incidencia.idIncidencia}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {incidencia.titulo.length > 15 ?
                                (<Tooltip title={incidencia.titulo}><span>{incidencia.titulo.substr(0, 15) +
                                "..."}</span></Tooltip>) : <span>{incidencia.titulo}</span>}
                        </TableCell>
                        {user.idRol !== 3 && <TableCell style={{color: "#717675"}}>
                            null
                        </TableCell>}
                        <TableCell style={{color: "#717675"}}>
                            {fecha(incidencia.creacion)}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {fecha(incidencia.actualizacion)}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {fecha(incidencia.cierre)}
                        </TableCell>
                        {user.idRol !== 2 && <TableCell style={{color: "#717675"}}>
                            null
                        </TableCell>}
                        <TableCell style={{color: "#717675"}}>
                            {incidencia.estado === 0 ?
                                <div><span>Abierto</span> <Tooltip
                                    title={user.idRol === 1 ? "Sin ingeniero de servicio asignado" : "Pendiente de asignar"}><NewReleases
                                    color={"success"}/></Tooltip></div> :
                                incidencia.estado === 1 ?
                                    "En proceso" :
                                    incidencia.estado === 2 ?
                                        "Cerrado" :
                                        incidencia.estado === 3 ?
                                            "Pendiente por el usuario" :
                                            "Pendiente por el proveedor"

                            }
                        </TableCell>
                        <TableCell>
                            <div style={{display: "flex"}}>
                                <Tooltip title={"Ver a detalle"}>
                                    <ZoomIn className={"icon-users"} onClick={(e) => {
                                        setSelectedIncidencia(incidencia);
                                    }}/>
                                </Tooltip>

                            </div>
                        </TableCell>
                    </TableRow>)

                })}
            </TableBody>

        </Table>
        <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={incidencias.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>);
};

export default ListaIncidencias;