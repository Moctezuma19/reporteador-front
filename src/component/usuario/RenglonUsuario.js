import React from 'react';
import {Box, Button, Modal, TableCell, TableRow, Tooltip} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import UsuarioServicio from "../../services/UsuarioServicio";
import {useNavigate} from "react-router-dom";

const RenglonUsuario = ({idUsuario, handleElimina, style}) => {

    const usuario_ = {
        correo: "cargando...",
        nombre: "cargando...",
        apellido: "cargando...",
        rol: {
            nombre: "cargando..."
        }
    }
    const [usuario, setUsuario] = React.useState(usuario_);
    const [showModal, setShowModal] = React.useState(false);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);
    const navigate = useNavigate();

    React.useEffect(() => {
        usuarioServicio.obten(idUsuario).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                setUsuario(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, []);
    return (<TableRow>
        <TableCell style={{color: "#717675"}}>
            {usuario?.correo}
        </TableCell>
        <TableCell style={{color: "#717675"}}>
            {usuario?.nombre}
        </TableCell>
        <TableCell style={{color: "#717675"}}>
            {usuario?.apellido}
        </TableCell>
        <TableCell style={{color: "#717675"}}>
            {usuario?.rol.nombre.toUpperCase()}
        </TableCell>
        <TableCell>
            <div style={{display: "flex"}}>
                <Tooltip title={"Editar"}>
                    <Edit className={"icon-users"} style={{height: 20}}
                          onClick={(e) => {
                              navigate(`/r/usuario?id=${idUsuario}`);
                              window.location.reload();
                          }}/>
                </Tooltip>

                {usuario.rol.idRol !== 1 &&
                    <Tooltip title={"Eliminar"}>
                        <Delete className={"icon-users"} style={{height: 20}}
                                onClick={(e) => {
                                        setShowModal(true);
                                }}/>
                    </Tooltip>
                }
            </div>
            {showModal && <Modal
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
                        {usuario?.nombre + " " + usuario?.apellido + ` (${usuario?.correo})`}
                    </p>
                    <div style={{float: "left"}}>
                        <Button variant={"contained"} color={"success"} type={"button"}
                                onClick={(e) => {
                                    handleElimina(idUsuario);
                                }}> Eliminar </Button> <span> </span>
                        <Button variant={"contained"} color={"success"} type={"button"}
                                onClick={(e) => {
                                    setShowModal(false);
                                }}> Cancelar </Button>
                    </div>
                </Box>
            </Modal>}
        </TableCell>
    </TableRow>)
};

export default RenglonUsuario;