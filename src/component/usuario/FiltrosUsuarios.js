import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Input,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material";
import {Search} from "@mui/icons-material";
import UsuarioServicio from "../../services/UsuarioServicio";

const FiltrosUsuarios = ({setUsuarios}) => {
    const [filtro, setFiltro] = React.useState({
        correo: "",
        nombre: "",
        esIngeniero: true,
        esUsuario: true,
        esAdministrador: true
    });
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);

    const handleChangeCorreo = (e) => {
        setFiltro({...filtro, correo: e.target.value});
    }

    const handleChangeNombre = (e) => {
        setFiltro({...filtro, nombre: e.target.value});
    }

    const handleChangeEsAdministrador = (e) => {
        setFiltro({...filtro, esAdministrador: !filtro.esAdministrador});
    }

    const handleChangeEsIngeniero = (e) => {
        setFiltro({...filtro, esIngeniero: !filtro.esIngeniero});
    }

    const handleChangeEsUsuario = (e) => {
        setFiltro({...filtro, esUsuario: !filtro.esUsuario});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = {correo: filtro.correo, nombre: filtro.nombre};
        let idRoles = [];
        if (filtro.esIngeniero) {
            idRoles.push(2);
        }
        if (filtro.esAdministrador) {
            idRoles.push(1)
        }
        if (filtro.esUsuario) {
            idRoles.push(3);
        }
        obj.idRoles = [...idRoles];
        usuarioServicio.filtra(obj).then(({data}) => {
            setUsuarios(data);
        }).catch((error) => {
            console.log("error: " + error);
        });
    }


    return (<Paper elevation={3} style={{borderRadius: 16}}>
        <Box style={{textAlign: "left", padding: 33}}>
            <form onSubmit={handleSubmit}>
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
                            <FormControlLabel
                                control={<Checkbox checked={filtro.esAdministrador} onClick={handleChangeEsAdministrador}/>}
                                label="Administrador"/>
                            <FormControlLabel
                                control={<Checkbox checked={filtro.esIngeniero} onClick={handleChangeEsIngeniero}/>}
                                label="Ingeniero"/>
                            <FormControlLabel control={<Checkbox checked={filtro.esUsuario}/>}
                                              onClick={handleChangeEsUsuario} label="Usuario"/>
                        </div>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                        <Button variant="contained" type="submit" color="success"> Filtrar </Button>
                    </FormControl>
                </div>
            </form>
        </Box>
    </Paper>)
};

export default FiltrosUsuarios;