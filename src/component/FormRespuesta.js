import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel, Modal,
    Paper,
    TextareaAutosize,
    TextField
} from "@mui/material";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";

const FormRespuesta = ({idIncidencia, agregaRespuesta}) => {

    const {user} = useAuthContext();
    const formRespuesta_ = {
        descripcion: '',
        cierre: false
    }
    const [formRespuesta, setFormRespuesta] = React.useState({...formRespuesta_});
    const [showModal, setShowModal] = React.useState(false);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const handleChangeDescripcion = (e) => {
        setFormRespuesta({...formRespuesta, descripcion: e.target.value});
    }
    const handleChangeChecked = () => {
        setFormRespuesta({...formRespuesta, cierre: !formRespuesta.cierre});
    }

    const handleSubmitRespuesta = (e) => {
        e.preventDefault();
        if (!formRespuesta.descripcion) {
            return;
        }
        if (formRespuesta.cierre) {
            setShowModal(true);
            return;
        }

        let obj = {...formRespuesta, idUsuario: user.idUsuario, idIncidencia: idIncidencia};
        console.log("respondiendo", obj)
        incidenciaServicio.responde(obj).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                agregaRespuesta(data, false);
                setFormRespuesta({...formRespuesta_});
            }
        }).catch((error) => {
            console.log("error: " + error);
        });

    }

    const handleCierra = () => {
        let obj = {...formRespuesta, idUsuario: user.idUsuario, idIncidencia: idIncidencia};
        incidenciaServicio.responde(obj).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                agregaRespuesta(data, true);
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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (<Paper style={{textAlign: "left", padding: "1em"}}>
        <form onSubmit={handleSubmitRespuesta}>
            <Box>
                <TextareaAutosize placeholder={"Introduce la respuesta."}
                                  value={formRespuesta.descripcion}
                                  onChange={handleChangeDescripcion}
                                  maxLength={2048} style={{
                    width: "41.5em",
                    height: "10em",
                    minHeight: "10em",
                    maxHeight: "10em"
                }}/>
            </Box>
            <Box>
                <FormControlLabel control={<Checkbox checked={formRespuesta.cierre} onChange={(e) => {
                    handleChangeChecked();
                }}/>} label="¿Cerrar?"/>
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
            aria-describedby="parent-modal-description"
        >
            <Box sx={{...style, width: 600}}>
                <h4 id="parent-modal-title">¿Seguro que deseas cerrar la incidencia?</h4>
                <p id="parent-modal-description">
                    Si cierras la incidencia no podrás responder o recibir respuestas de la incidencia.
                </p>
                <div style={{float: "left"}}>
                    <Button variant={"contained"} color={"success"} type={"button"}
                            onClick={(e) => {
                                handleCierra();
                            }}> Cerrar </Button> <span> </span>
                    <Button variant={"contained"} color={"success"} type={"button"}
                            onClick={(e) => {
                                setShowModal(false);
                            }}> Cancelar </Button>
                </div>
            </Box>
        </Modal>
    </Paper>)
};

export default FormRespuesta;