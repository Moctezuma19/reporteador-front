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
import {Delete, Edit, EditOff} from "@mui/icons-material";
import React from "react";
import UsuarioServicio from "../services/UsuarioServicio";

const ListaUsuarios = ({usuarios, setUsuario, edita, eliminaUsuario, setMessage}) => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [showModal, setShowModal] = React.useState(false);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                                <Tooltip title={"Editar"}>
                                    <Edit className={!edita ? "icon-users" : "icon-users-none"} onClick={(e) => {
                                        if (!edita) {
                                            setUsuario(u);
                                        }
                                    }}/>
                                </Tooltip>

                                {u.rol.idRol !== 1 &&
                                <Tooltip title={"Eliminar"}>
                                    <Delete className={!edita ? "icon-users" : "icon-users-none"} onClick={(e) => {
                                        if (!edita) {
                                            setShowModal(true);
                                        }

                                    }}/>
                                </Tooltip>
                                }
                            </div>
                            <Modal
                                open={showModal}
                                onClose={() => {
                                    setShowModal(false);
                                }}
                                aria-labelledby="parent-modal-title"
                                aria-describedby="parent-modal-description"
                            >
                                <Box sx={{...style, width: 600}}>
                                    <h4 id="parent-modal-title">¿Seguro que deseas eliminar al siguiente usuario?</h4>
                                    <p id="parent-modal-description">
                                        {u.nombre + " " + u.apellido + `(${u.correo})`}
                                    </p>
                                    <div style={{float: "left"}}>
                                        <Button variant={"contained"} color={"success"} type={"button"}
                                                onClick={(e) => {
                                                    handleElimina(u.idUsuario);
                                                }}> Eliminar </Button> <span> </span>
                                        <Button variant={"contained"} color={"success"} type={"button"}
                                                onClick={(e) => {
                                                    setShowModal(false);
                                                }}> Cancelar </Button>
                                    </div>
                                </Box>
                            </Modal>
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