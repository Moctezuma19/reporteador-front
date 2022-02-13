import {Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@mui/material";
import {Delete, Settings} from "@mui/icons-material";
import React from "react";

const ListaUsuarios = ({usuarios}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    React.useEffect(() => {
        console.log("listUsuarios", usuarios)
    }, [])
    return (<Paper elevation={3}>
        <Table size={"medium"}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <b>Usuario (correo electrónico)</b>
                    </TableCell>
                    <TableCell>
                        <b>Nombre</b>
                    </TableCell>
                    <TableCell>
                        <b>Apellido</b>
                    </TableCell>
                    <TableCell>
                        <b>Rol</b>
                    </TableCell>
                    <TableCell>
                        <b>Acciones</b>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {usuarios.map((u, k) => {
                    return (<TableRow key={`tr-${k}`}>
                        <TableCell style={{color: "#717675"}}>
                            {u.correo}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {u.nombre}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {u.apellido}
                        </TableCell>
                        <TableCell style={{color: "#717675"}}>
                            {u.rol.nombre.toUpperCase()}
                        </TableCell>
                        <TableCell>
                            <div style={{display: "flex"}}>
                                <Settings/>
                                {u.rol.idRol !== 1 && <Delete/>}
                            </div>
                        </TableCell>
                    </TableRow>)

                })}
            </TableBody>

        </Table>
        <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={usuarios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>)

};

export default ListaUsuarios;