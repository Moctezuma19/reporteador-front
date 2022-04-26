import {
    Alert,
    Box, Button, Modal, Paper,
    TextareaAutosize,
    TextField
} from "@mui/material";
import {Add, Delete} from "@mui/icons-material";
import React from "react";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";

const FormIncidenciaPage = () => {

    const {user} = useAuthContext();
    const [message, setMessage] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const formIncidencia_ = {
        titulo: "",
        descripcion: "",
        imagen1: null,
        imagen2: null
    }
    const [formIncidencia, setFormIncidencia] = React.useState({...formIncidencia_});
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);
    const navigate = useNavigate();

    const handleChangeTitulo = (e) => {
        setFormIncidencia({...formIncidencia, titulo: e.target.value});
    }

    const handleChangeDescripcion = (e) => {
        setFormIncidencia({...formIncidencia, descripcion: e.target.value});
    }

    const handleChangeImagen1 = (e) => {
        if (e.target.files[0].size > 1024000) {
            setMessage({text: "El tamaño debe ser menor a 1 MB.", type: "warning"});
            return;
        }
        setFormIncidencia({...formIncidencia, imagen1: e.target.files[0]});
    }

    const handleChangeImagen2 = (e) => {
        if (e.target.files[0].size > 1024000) {
            setMessage({text: "El tamaño debe ser menor a 1 MB.", type: "warning"});
            return;
        }
        setFormIncidencia({...formIncidencia, imagen2: e.target.files[0]});
    }

    const handleSubmitIncidencia = (e) => {
        e.preventDefault();
        if (!formIncidencia.titulo || !formIncidencia.descripcion) {
            setMessage({text: "Todos los campos son requeridos.", type: "warning"})
            return;
        }

        let formData = new FormData();
        formData.append("titulo", formIncidencia.titulo);
        formData.append("descripcion", formIncidencia.descripcion);
        if (formIncidencia.imagen1 !== null) {
            formData.append("imagen1", formIncidencia.imagen1);
        }
        if (formIncidencia.imagen2 !== null) {
            formData.append("imagen2", formIncidencia.imagen2);
        }
        formData.append("imagen1Hash", null);
        formData.append("imagen2Hash", null);
        formData.append("idUsuario", user.idUsuario);
        incidenciaServicio.crea(formData /*{
            ...formIncidencia, idUsuario: user.idUsuario
        }*/).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                navigate(`/r/incidencia?id=${data.idIncidencia}`);
                setMessage({text: "La incidencia se ha creado con éxito.", type: "success"});
            } else {
                setMessage({text: "No se pudo crear la incidencia", type: "error"});
            }
        }).catch((error) => {
            setMessage({text: "Error interno del servidor", type: "error"});
            console.log("error: " + error);
        });
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

    return (<Paper elevation={3} style={{borderRadius: 16}}>

        <div style={{textAlign: "left", padding: 22}}>
            {message !== null && <Alert style={{marginBottom: 5}} severity={message.type} onClose={(e) => {
                setMessage(null);
            }}>
                {message.text}
            </Alert>}
            <form onSubmit={handleSubmitIncidencia}>
                <Box>
                    <TextField label="Titulo" name="titulo" value={formIncidencia.titulo}
                               onChange={handleChangeTitulo} variant="standard"/>
                </Box>
                <br/>
                <Box>
                    <TextareaAutosize placeholder={"Introduce la descripción del problema."}
                                      value={formIncidencia.descripcion}
                                      onChange={handleChangeDescripcion}
                                      maxLength={2048} style={{
                        width: "41.2em",
                        height: "10em",
                        minHeight: "10em",
                        maxHeight: "10em",
                        borderRadius: 8
                    }}/>

                </Box>
                <Box style={{display: "flex", marginTop: 10}}>
                    {formIncidencia.imagen1 === null && <label htmlFor="contained-button-file">
                        <input accept="image/*" id="contained-button-file" type="file"
                               style={{display: "none"}} onChange={handleChangeImagen1}/>
                        <Button variant={"contained"} className="add-imagen" style={{marginRight: 10}}
                                component="span">
                            <Add/>
                        </Button>
                    </label>}
                    {formIncidencia.imagen1 !== null &&
                        <img alt="imagen1" className="blur-imagen" style={{marginRight: 12, cursor: "pointer"}}
                             src={URL.createObjectURL(formIncidencia.imagen1)} onClick={(e) => {
                            setSelectedImage(1);
                        }}/>
                    }

                    {formIncidencia.imagen2 === null && <label htmlFor="contained-button-file-2">
                        <input accept="image/*" id="contained-button-file-2" type="file"
                               style={{display: "none"}} onChange={handleChangeImagen2}/>
                        <Button variant={"contained"} className="add-imagen" component="span">
                            <Add/>
                        </Button>
                    </label>}
                    {formIncidencia.imagen2 !== null &&
                        <img alt="imagen2" className="blur-imagen" style={{cursor: "pointer"}}
                             src={URL.createObjectURL(formIncidencia.imagen2)} onClick={(e) => {
                            setSelectedImage(2);
                        }}/>
                    }
                </Box>
                <Box style={{marginTop: -39, float: "right"}}>
                    <Button type={"submit"} variant={"contained"}
                            color={"success"}> Enviar </Button>
                </Box>
            </form>
        </div>
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
                     src={URL.createObjectURL(selectedImage === 1 ? formIncidencia.imagen1 : formIncidencia.imagen2)}/>
                <Button type="button" variant="contained" color="success"
                        style={{textTransform: "capitalize", marginTop: 10}} onClick={(e) => {
                    if (selectedImage === 1) {
                        setFormIncidencia({...formIncidencia, imagen1: null});
                    } else {
                        setFormIncidencia({...formIncidencia, imagen2: null});
                    }
                    setSelectedImage(0);
                }}><Delete style={{color: "white"}}/> Eliminar</Button>

            </div>

        </Modal>}
    </Paper>);

}

export default FormIncidenciaPage;