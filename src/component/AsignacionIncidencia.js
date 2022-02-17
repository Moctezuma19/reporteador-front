import React from 'react';
import {AccordionDetails, Box, Button, Paper, TextareaAutosize, TextField, Typography} from "@mui/material";

const AsignacionIncidencia = ({incidencia}) => {
    return (<Paper>
        <Box>
            <Typography variant={"h6"}>
                {incidencia.titulo}
            </Typography>
        </Box>
        <br/>
        <Box>
            {incidencia.descripcion}
        </Box>
    </Paper>);
};

export default AsignacionIncidencia;