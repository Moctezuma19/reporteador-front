import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Button,
    Grid, Paper,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import React from "react";
import IncidenciaServicio from "../services/IncidenciaServicio";
import {useAuthContext} from "../context/AuthenticationContext";

const FormIncidencia = ({agregaIncidencia}) => {

    const {user} = useAuthContext();
    const formIncidencia_ = {
        titulo: "",
        descripcion: ""
    }
    const [formIncidencia, setFormIncidencia] = React.useState({...formIncidencia_});

    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const handleChangeTitulo = (e) => {
        setFormIncidencia({...formIncidencia, titulo: e.target.value});
    }

    const handleChangeDescripcion = (e) => {
        setFormIncidencia({...formIncidencia, descripcion: e.target.value});
    }

    const handleSubmitIncidencia = (e) => {
        if (!formIncidencia.titulo || !formIncidencia.descripcion) {
            return;
        }

        incidenciaServicio.crea({...formIncidencia, idUsuario: user.idUsuario}).then(({data}) => {
            if (typeof data !== "undefined" && data !== null) {
                agregaIncidencia(data);
                console.log("exito");
            }
        }).catch((error) => {
            console.log("error: " + error);
        });
    }

    return (<Paper elevation={3} style={{borderRadius: 16}}>
        <Accordion style={{borderRadius: 16}}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <Typography variant={"h6"}>Nueva incidencia</Typography>
            </AccordionSummary>
            <AccordionDetails style={{textAlign: "left"}}>
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
                            width: "41.5em",
                            height: "10em",
                            minHeight: "10em",
                            maxHeight: "10em"
                        }}/>
                    </Box>
                    <Box style={{marginTop: 10, float: "right"}}>
                        <Button type={"submit"} variant={"contained"}
                                color={"success"}> Enviar </Button>

                    </Box>
                </form>
            </AccordionDetails>
        </Accordion>
    </Paper>);

}

export default FormIncidencia;