import React from 'react';
import {
    Alert,
    Box,
    Button, FormControl, InputLabel, MenuItem, Modal,
    Paper, Select,
    TextareaAutosize
} from "@mui/material";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";

const FormRespuesta = ({idIncidencia, agregaRespuesta, estado}) => {

    const {user} = useAuthContext();

    const [message, setMessage] = React.useState(null);
    const formRespuesta_ = {
        descripcion: '',
        estado: 0
    }
    const [formRespuesta, setFormRespuesta] = React.useState({...formRespuesta_});
    const [showModal, setShowModal] = React.useState(false);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const handleChangeDescripcion = (e) => {
        setFormRespuesta({...formRespuesta, descripcion: e.target.value});
    }
    const handleChangeEstado = (e) => {
        setFormRespuesta({...formRespuesta, estado: e.target.value});
    }

    const handleSubmitRespuesta = (e) => {
        e.preventDefault();

        if (!formRespuesta.descripcion && (estado === formRespuesta.estado || formRespuesta.estado === 0)) {
            setMessage({text: "Debes de escribir una respuesta.", type: "warning"});
            return;
        }
        if (formRespuesta.estado === 2) {
            setShowModal(true);
            return;
        }
        let ag = formRespuesta.descripcion;
        if (formRespuesta.estado !== estado && formRespuesta.estado !== 0) {
            ag += `#S:${formRespuesta.estado}`;
        }

        let obj = {...formRespuesta, idUsuario: user.idUsuario, idIncidencia: idIncidencia, descripcion: ag};
        incidenciaServicio.responde(obj).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                agregaRespuesta(data, formRespuesta.estado !== 0 ? formRespuesta.estado: estado);
                setFormRespuesta({...formRespuesta_});
            }
        }).catch((error) => {
            console.log("error: " + error);
        });

    }

    const handleCierra = () => {
        let ag = formRespuesta.descripcion;
        if (formRespuesta.estado !== estado) {
            ag += `#S:${formRespuesta.estado}`;
        }
        let obj = {...formRespuesta, idUsuario: user.idUsuario, idIncidencia: idIncidencia, descripcion: ag};
        incidenciaServicio.responde(obj).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                agregaRespuesta(data, 2);
                setShowModal(false);
                setFormRespuesta({...formRespuesta_});
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const estados = [
        {nombre: "en proceso", clase: "proceso-estado"},
        {nombre: "cerrada", clase: "cerrado-estado"},
        {nombre: "pendiente por el usuario", clase: "advertencia-estado"},
        {nombre: "pendiente por el proveedor", clase: "advertencia-estado"},
    ];
    return (<Paper style={{textAlign: "left", padding: "1em", borderRadius: 16}}>
        {message !== null && <Alert severity={message.type} onClose={() => {
            setMessage(null);
        }}>{message.text}</Alert>}
        <form onSubmit={handleSubmitRespuesta}>
            {user.idRol !== 3 && <Box style={{marginBottom: 10}}>
                <FormControl variant={"standard"} sx={{m: 1, minWidth: "20em"}}>
                    <InputLabel>Cambiar estado</InputLabel>
                    <Select color="success" label={"Estado"} value={formRespuesta.estado} onChange={handleChangeEstado}>
                        <MenuItem value={0}>
                            --- Ninguno ---
                        </MenuItem>
                        {estados.length > 0 && estados.map((est, k) => {
                            if (est.nombre === "cerrada" && user.idRol === 3) {
                                return
                            }
                            return (<MenuItem value={k + 1} key={"e-" + k}>
                                <span className={est.clase}>{est.nombre}</span>
                            </MenuItem>);
                        })}
                    </Select>
                </FormControl>
            </Box>}
            <Box>
                <TextareaAutosize placeholder={"Introduce la respuesta."}
                                  value={formRespuesta.descripcion}
                                  onChange={handleChangeDescripcion}
                                  maxLength={2048} style={{
                    width: "50.4em",
                    height: "10em",
                    minHeight: "10em",
                    maxHeight: "10em",
                    borderRadius: 8
                }}/>
            </Box>
            <Box style={{marginTop: 10, float: "right"}}>
                <Button type={"submit"} variant={"contained"}
                        color={"success"}> Enviar </Button>

            </Box>
        </form>
        <Modal
            open={showModal}
            onClose={() => {
                setShowModal(false);
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box sx={{...style, width: 600}}>
                <h4 id="parent-modal-title">¿Seguro que deseas cerrar la incidencia?</h4>
                <p id="parent-modal-description">
                    Si cierras la incidencia no podrás responder o recibir respuestas de la incidencia.
                </p>
                <div style={{float: "left"}}>
                    <Button style={{marginRight: 10}} variant={"contained"} color={"success"} type={"button"}
                            onClick={(e) => {
                                handleCierra();
                            }}> Sí </Button>
                    <Button variant={"contained"} color={"error"} type={"button"}
                            onClick={(e) => {
                                setShowModal(false);
                            }}> No </Button>
                </div>
            </Box>
        </Modal>
    </Paper>)
};

export default FormRespuesta;