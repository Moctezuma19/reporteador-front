import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React from "react";
import {useAuthContext} from "../../context/AuthenticationContext";
import RenglonIncidencia from "./RenglonIncidencia";

const ListaIncidencias = ({incidencias, setSelectedIncidencia}) => {
    const {user} = useAuthContext();
    const [page, setPage] = React.useState(0);
    const [paginaIncidencias, setPaginaIncidencias] = React.useState(incidencias.slice(0, 10));
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setSelectedIncidencia(null);
        setPaginaIncidencias(incidencias.slice(newPage * 10, newPage * 10 + 10));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setPaginaIncidencias(incidencias.slice(page * 10, page * 10 + 10));
    }, [incidencias])

    return (<Paper elevation={3} style={{borderRadius: 16, overflowX: "auto"}}>
        <Table size={"medium"}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <b>#</b>
                    </TableCell>
                    <TableCell>
                        <b>Título</b>
                    </TableCell>
                    {user.idRol !== 3 && <TableCell>
                        <b>Autor</b>
                    </TableCell>}
                    <TableCell>
                        <b>Creación</b>
                    </TableCell>
                    <TableCell>
                        <b>Actualización</b>
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
                {paginaIncidencias.map((idIncidencia, k) => {
                    return (<RenglonIncidencia key={`inc-${k}`} idIncidencia={idIncidencia}
                                               setSelectedIncidencia={setSelectedIncidencia}/>)
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