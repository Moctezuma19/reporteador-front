import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Input,
    InputAdornment,
    FormControlLabel,
    Checkbox
} from "@mui/material";
import {Search} from "@mui/icons-material";

const FiltrosUsuarios = ({filtro, setFiltros}) => {

    const handleChangeCorreo = (e) => {
        setFiltros({...filtro, correo: e.target.value});
    }

    const handleChangeNombre = (e) => {
        setFiltros({...filtro, nombre: e.target.value});
    }

    const handleChangeEsIngeniero = (e) => {
        setFiltros({...filtro, esIngeniero: !filtro.esIngeniero});
    }

    const handleChangeEsUsuario = (e) => {
        setFiltros({...filtro, esUsuario: !filtro.esUsuario});
    }
    return (<Paper elevation={3} style={{borderRadius: 16}}>
        <Box style={{textAlign: "left", padding: 33}}>
            <b>Filtros</b>
            <div>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Correo electrónico</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={filtro.correo}
                        onChange={handleChangeCorreo}
                        endAdornment={<InputAdornment position={"end"}><Search/></InputAdornment>}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount2">Nombre</InputLabel>
                    <Input
                        id="standard-adornment-amount2"
                        value={filtro.nombre}
                        onChange={handleChangeNombre}
                        endAdornment={<InputAdornment position={"end"}><Search/></InputAdornment>}
                    />
                </FormControl>
            </div>
            <div>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <b>Rol</b>
                    <div style={{display: "flex"}}>
                        <FormControlLabel control={<Checkbox checked={filtro.esAdministrador} onClick={handleChangeEsIngeniero}/>} label="Administrador"/>
                        <FormControlLabel control={<Checkbox checked={filtro.esIngeniero} onClick={handleChangeEsIngeniero}/>} label="Ingeniero"/>
                        <FormControlLabel control={<Checkbox checked={filtro.esUsuario}/>} onClick={handleChangeEsUsuario} label="Usuario"/>
                    </div>
                </FormControl>

            </div>
        </Box>
    </Paper>)
};

export default FiltrosUsuarios;