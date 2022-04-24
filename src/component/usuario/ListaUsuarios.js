import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import React from "react";
import UsuarioServicio from "../../services/UsuarioServicio";
import RenglonUsuario from "./RenglonUsuario";

const ListaUsuarios = ({usuarios, eliminaUsuario, setMessage}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [paginaUsuarios, setPaginaUsuarios] = React.useState(usuarios.slice(0, 10));
    const [showModal, setShowModal] = React.useState(false);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setPaginaUsuarios(usuarios.slice(newPage * 10, newPage * 10 + 10));
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setPaginaUsuarios(usuarios.slice(page * 10, page * 10 + 10));
    }, [usuarios])

    const handleElimina = (id) => {
        usuarioServicio.elimina(id).then(({data}) => {
            if (data) {
                eliminaUsuario(id);
                setMessage({text: "El usuario se elimino correctamente.", type: "success"});
            } else {
                setMessage({text: "No se pudo elimnar al usuario.", type: "error"});
            }
            setShowModal(false);
        }).catch((error) => {
            setMessage({text: "No se pudo elimnar al usuario.", type: "error"});
            setShowModal(false);
            console.log("error: " + error);
        });
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (<Paper elevation={3} style={{borderRadius: 16}}>
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
                {paginaUsuarios.map((idUsuario, k) =>
                    (<RenglonUsuario key={`u-${k}`} idUsuario={idUsuario} handleElimina={handleElimina} style={style}/>)
                )}
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