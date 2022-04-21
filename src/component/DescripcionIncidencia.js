import React from 'react';
import {Box, Button, Divider, IconButton, Modal, Paper, Tooltip, Typography} from "@mui/material";
import {Close, Download, ZoomIn} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {fecha} from "../util/Util";
import IncidenciaServicio from "../services/IncidenciaServicio";
import ImagenServicio from "../services/ImagenServicio";
import {useNavigate} from "react-router-dom";

const DescripcionIncidencia = ({incidencia, setIncidencia, respuestas, cerrable = true}) => {
    const {user} = useAuthContext();
    const [descripcion, setDescripcion] = React.useState("");
    const [imagen1, setImagen1] = React.useState(null);
    const [imagen2, setImagen2] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const navigate = useNavigate();
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);
    const imagenServicio = React.useMemo(() => new ImagenServicio(), []);

    const getNombre = (idUsuario) => {
        if (incidencia.usuario.idUsuario === idUsuario) {
            return incidencia.usuario.nombre + " " + incidencia.usuario.apellido;
        }
        return incidencia.asignacion.usuario.nombre + " " + incidencia.asignacion.usuario.nombre;
    }

    const getCambio = (desc) => {
        let edo = parseInt(desc.substring(desc.indexOf("#S:") + 3));
        let desc_ = desc.substring(0, desc.indexOf("#S:"));
        let texto = "Cambió el estado de la incidencia a ";
        switch (edo) {
            case 1:
                return (<div>{texto}<span className="proceso-estado">en proceso</span>. <p>{desc_}</p></div>);
            case 2:
                return (<div>{texto}<span className="cerrado-estado">cerrada</span>. <p>{desc_}</p></div>);
            case 3:
                return (
                    <div>{texto}<span className="advertencia-estado">pendiente por el usuario</span>. <p>{desc_}</p>
                    </div>);
            case 4:
                return (
                    <div>{texto}<span className="advertencia-estado">pendiente por el proveedor</span>. <p>{desc_}</p>
                    </div>);
            default:
                return null;
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        width: 1000,
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        incidenciaServicio.obtenDescripcion(incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                setDescripcion(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
        if (incidencia.imagen1 !== null) {
            imagenServicio.obtenImagen(incidencia.imagen1).then(({data}) => {
                if (typeof data !== "undefined" && data !== null) {
                    setImagen1(data);
                }
            }).catch((error) => {
                console.log("error: " + error);
            });
        }
        if (incidencia.imagen2 !== null) {
            imagenServicio.obtenImagen(incidencia.imagen2).then(({data}) => {
                if (typeof data !== "undefined" && data !== null) {
                    setImagen2(data);
                }
            }).catch((error) => {
                console.log("error: " + error);
            });
        }
    }, [incidencia]);

    return (<Paper style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
        <Box>
            {cerrable && <IconButton style={{float: "right"}} onClick={(e) => {
                setIncidencia(null);
            }}>
                <Close/>
            </IconButton>}
            <Typography variant={"h6"}>
                {incidencia.titulo} {cerrable && <Tooltip title={"Ver individualmente"}><IconButton onClick={(e) => {
                navigate(`/principal?id=${incidencia.idIncidencia}`)
                window.location.reload();
            }}>
                <ZoomIn/>
            </IconButton></Tooltip>}
            </Typography>
        </Box>
        <br/>
        <Box>
            <div>
                <b>Creación: </b>
                {fecha(incidencia.creacion)}
            </div>
            <div>
                <b>Actualización: </b>
                {fecha(incidencia.actualizacion)}
            </div>
        </Box>
        <Box>
            {user.idRol !== 3 && <div>
                <b>Autor: </b>
                {incidencia.usuario.nombre + " " + incidencia.usuario.apellido}
            </div>
            }
            {user.idRol !== 2 && <div>
                <b>Ingeniero de servicio: </b>
                {incidencia.asignacion !== null ? incidencia.asignacion?.usuario?.nombre + " " + incidencia.asignacion?.usuario?.apellido : "Sin asignar"}
            </div>
            }

        </Box>
        <Box>
            <b>Estado: </b>
            {incidencia.estado === 0 ? <span className="exito-estado">abierta</span> :
                incidencia.estado === 1 ? <span className="proceso-estado">en proceso</span> :
                    incidencia.estado === 2 ? <span className="cerrado-estado">cerrada</span> :
                        incidencia.estado === 3 ? <span className="advertencia-estado">pendiente por el usuario</span> :
                            incidencia.estado === 4 ?
                                <span className="advertencia-estado">pendiente por el proveedor</span> :
                                <span className="advertencia-estado">pendiente</span>
            }
        </Box>
        <Box>
            <b>Descripción: </b>
            <p>{descripcion}</p>
        </Box>
        <Box style={{marginBottom: 10}}>
            <div style={{display: "flex"}}>
                {imagen1 !== null &&
                    <img alt="imagen-incidencia" className="blur-imagen" style={{marginTop: 10, cursor: "pointer"}}
                         src={`data:image/jpeg;base64, ${imagen1}`}
                         onClick={(e) => {
                             setSelectedImage(1);
                         }}
                    />}

                {imagen2 !== null &&
                    <img alt="imagen-incidencia" className="blur-imagen"
                         style={{marginLeft: 10, marginTop: 10, cursor: "pointer"}}
                         src={`data:image/jpeg;base64, ${imagen2}`}
                         onClick={(e) => {
                             setSelectedImage(2);
                         }}
                    />}
            </div>
        </Box>
        {respuestas?.length > 0 && respuestas?.map((r, k) =>
            (<React.Fragment key={`r-${k}`}>
                <Divider/>
                <Box style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
                    <Box>
                        <b> {r.idUsuario === user.idUsuario ? "Tú" : getNombre(r.idUsuario)}</b>
                        <p style={{color: "rgb(113, 118, 117)"}}>{fecha(r.actualizacion)}</p>
                    </Box>
                    <Box>
                        {r.descripcion.indexOf("#S:") !== -1 ? getCambio(r.descripcion) : r.descripcion}
                    </Box>
                </Box>
            </React.Fragment>))}

        {selectedImage !== 0 && <Modal
            open={selectedImage !== 0}
            onClose={(e) => {
                setSelectedImage(0);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div style={style}>
                <img alt="imagen3" style={{width: "200%", height: "200%"}}
                     src={`data:image/data;base64, ${selectedImage === 1 ? imagen1 : imagen2}`}/>
                <Button type="button" variant="contained" color="success"
                        style={{textTransform: "capitalize", marginTop: 10}} onClick={(e) => {

                    const link = document.createElement('a');
                    link.href = `data:image/data;base64, ${selectedImage === 1 ? imagen1 : imagen2}`;
                    link.setAttribute(
                        'download',
                        `imagen-incidencia-${incidencia.idIncidencia}-${selectedImage}.jpg`,
                    );
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                }}>Descargar <Download/></Button>

            </div>

        </Modal>}
    </Paper>);
}

export default DescripcionIncidencia;