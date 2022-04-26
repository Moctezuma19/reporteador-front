import React from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem, Modal,
    Paper,
    Select,
    Typography
} from "@mui/material";
import UsuarioServicio from "../../services/UsuarioServicio";
import IncidenciaServicio from "../../services/IncidenciaServicio";
import {Close, Download} from "@mui/icons-material";
import ImagenServicio from "../../services/ImagenServicio";
import {useNavigate} from "react-router-dom";
import {INCIDENCIA_DEFAULT} from "../../util/Constants";

const AsignacionIncidencia = ({idIncidencia}) => {

    const [incidencia, setIncidencia] = React.useState(INCIDENCIA_DEFAULT);
    const [ingenieros, setIngenieros] = React.useState([]);
    const [idIngeniero, setIdIngeniero] = React.useState(0);
    const [message, setMessage] = React.useState(null);
    const [imagen1, setImagen1] = React.useState(null);
    const [imagen2, setImagen2] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);
    const imagenServicio = React.useMemo(() => new ImagenServicio(), []);
    const navigate = useNavigate();

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

    const handleSubmit = () => {
        if (idIngeniero === 0) {
            setMessage({text: "Tienes que elegir a un ingeniero de servicio.", type: "warning"});
            return;
        }
        incidenciaServicio.asigna(idIngeniero, incidencia.idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                navigate(`/r/incidencia?id=${incidencia.idIncidencia}`);
                //setMessage({text: "Se ha asignado la incidencia con éxito.", type: "success"});
            } else {
                setMessage({text: "No se pudo asignar la incidencia.", type: "error"});
            }
        }).catch((error) => {
            setMessage({text: "Error interno del servidor.", type: "error"});
            console.log("error: " + error);
        });

    }

    React.useEffect(() => {
        usuarioServicio.obtenIngenieros().then(({data}) => {
            if (typeof data !== "undefined" && data !== null && typeof data !== "string") {
                setIngenieros(data);
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }, []);

    React.useEffect(() => {
        if (idIncidencia === 0) {
            return;
        }
        incidenciaServicio.obten(idIncidencia).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                setIncidencia(data);
                if (data.imagen1 !== null) {
                    imagenServicio.obtenImagen(data.imagen1).then(({data}) => {
                        if (typeof data !== "undefined" && data !== null) {
                            setImagen1(data);
                        }
                    }).catch((error) => {
                        console.log("error: " + error);
                    });
                }
                if (data.imagen2 !== null) {
                    imagenServicio.obtenImagen(data.imagen2).then(({data}) => {
                        if (typeof data !== "undefined" && data !== null) {
                            setImagen2(data);
                        }
                    }).catch((error) => {
                        console.log("error: " + error);
                    });
                }
            }
        }).catch((error) => {
            console.log("error: " + error);
        })
    }, [idIncidencia]);

    return (<Paper style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
        <Box>
            <Typography variant={"h6"}>
                {incidencia.titulo}
            </Typography>
        </Box>
        <br/>
        {message !== null && <Alert style={{marginBottom: 5}} severity={message.type} onClose={(e) => {
            setMessage(null);
        }}>
            {message.text}
        </Alert>}
        <Box>
            <b>Autor: </b>
            {incidencia.usuario?.nombre + " " + incidencia.usuario?.apellido}
        </Box>
        <Box>
            <b>Descripción: </b>
            <p>{incidencia.descripcion}</p>
        </Box>
        <Box>
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
        <Box>
            <FormControl variant={"standard"} sx={{m: 1, minWidth: "20em"}}>
                <InputLabel>Asignar ingeniero de servicio</InputLabel>
                <Select color="success" label={"Ingeniero de servicio"} value={idIngeniero} onChange={(e) => {
                    setIdIngeniero(e.target.value);
                }}>
                    <MenuItem value={0}>
                        --- Ninguno ---
                    </MenuItem>
                    {ingenieros.length > 0 && ingenieros.map((i, k) => {
                        return (<MenuItem value={i.idUsuario} key={"i-" + k}>
                            {i.nombre + " " + i.apellido}
                        </MenuItem>);
                    })}
                </Select>
            </FormControl>
        </Box>
        <Box style={{textAlign: "right"}}>
            <Button type={"button"} variant={"contained"} color={"success"} onClick={(e) => {
                handleSubmit();
            }}> Asignar </Button>
        </Box>
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
};

export default AsignacionIncidencia;