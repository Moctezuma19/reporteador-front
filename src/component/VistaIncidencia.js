import {Box, Paper, Typography} from "@mui/material";
import React from "react";

const VistaIncidencia = ({incidencia}) => {
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

export default VistaIncidencia;