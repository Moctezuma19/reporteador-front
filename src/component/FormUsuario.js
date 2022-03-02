import React from 'react';
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel, MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import {
    Edit,
    Group,
    Key,
    Refresh,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import UsuarioServicio from "../services/UsuarioServicio";

const FormUsuario = ({agregaUsuario}) => {
    const usuario_ = {
        nombre: "",
        apellido: "",
        correo: "",
        password: "",
        password_repeat: "",
        idRol: 3
    }
    const [message, setMessage] = React.useState(null)
    const [usuario, setUsuario] = React.useState({...usuario_});
    const [viewPassword, setViewPassword] = React.useState(false);
    const usuarioServicio = React.useMemo(() => new UsuarioServicio(), []);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usuario.nombre ||
            !usuario.apellido ||
            !usuario.correo ||
            !usuario.password ||
            !usuario.password_repeat) {
            setMessage({texto: "Todos los campos son necesarios.", type: "warning"});
            return;
        }
        if (usuario.password.length < 10) {
            setMessage({texto: "La contraseña debe tener 10 caracteres", type: "warning"})
            return;
        }

        if (usuario.password !== usuario.password_repeat) {
            setMessage({texto: "Las contraseñas deben coincidir", type: "warning"});
        }

        let obj = {...usuario, token: "", idUsuario:0};
        delete obj["password_repeat"];
        console.log("exito", obj);

        usuarioServicio.registra(obj).then((response) => {
            console.log("data", response)
            let data = response.data;
            if (typeof data !== "undefined" && data !== null && typeof data !== "string") {
                setMessage({texto: "El usuario se registro con éxito.", type: "success"});
                agregaUsuario(data);
                setTimeout(() => {
                    setUsuario({...usuario_});
                }, 2000)
            } else {
                setMessage({texto: "El correo ya esta registrado, intenta con otro.", type: "warning"});
            }
        }).catch((error) => {
            setMessage({texto: "No se pudo registrar al usuario, error interno del servidor.", type: "error"});
            console.log("error: " + error);
        });

    }
    const handleChangeCampo = (campo, valor) => {
        let obj = {...usuario};
        obj[campo] = valor;
        setUsuario(obj);
    }

    const generateRandomPassword = () => {
        let p = Math.random().toString(36).substring(2, 12);
        setUsuario({...usuario, password: p, password_repeat: p});
    }

    const boxStyle = {display: 'flex', alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10}

    return (<Paper elevation={3}>
            <form onSubmit={handleSubmit} style={{paddingTop: 15, paddingBottom: 15}}>
                <Box>
                    <h2>Nuevo usuario</h2>
                </Box>
                {message !== null &&
                <Box sx={{marginTop: 3, paddingLeft: 10, paddingRight: 10}}>
                    <Alert severity={message.type} onClose={() => {
                        setMessage(null);
                    }}>
                        {message.texto}
                    </Alert>
                </Box>}
                <Box sx={boxStyle}>
                    <Edit sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField fullWidth label="Nombre" name="firstname" variant="standard" value={usuario.nombre}
                               onChange={(e) => {
                                   handleChangeCampo("nombre", e.target.value);
                               }}/>
                </Box>
                <Box sx={boxStyle}>
                    <Edit sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField fullWidth label="Apellido" name="lastname" variant="standard" value={usuario.apellido}
                               onChange={(e) => {
                                   handleChangeCampo("apellido", e.target.value);
                               }}/>
                </Box>
                <Box sx={boxStyle}>
                    <Edit sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField fullWidth label="Usuario (correo electrónico)" name="email" variant="standard"
                               value={usuario.correo}
                               type="email"
                               onChange={(e) => {
                                   handleChangeCampo("correo", e.target.value);
                               }}/>
                </Box>
                <Box sx={boxStyle}>
                    <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField fullWidth label="Contraseña" name="password" type={!viewPassword ? "password" : "text"}
                               variant="standard" value={usuario.password}
                               onChange={(e) => {
                                   if (e.target.value.length < 10) {
                                       setMessage({texto: "La contraseña debe tener 10 caracteres.", type: "warning"})
                                   } else {
                                       if (message.texto === "La contraseña debe tener 10 caracteres.") {
                                           setMessage(null);
                                       }
                                   }
                                   if (e.target.value.length <= 10) {

                                       handleChangeCampo("password", e.target.value);
                                   }
                               }}/>
                    <Button type="button" variant={"contained"} color={"success"} onClick={(e) => {
                        generateRandomPassword();
                    }} style={{height: "2em", marginLeft: 5, marginRight: 5}}>
                        <Refresh/>
                    </Button>
                    <Button type="button" variant={"contained"} color={"success"} onClick={(e) => {
                        setViewPassword(!viewPassword);
                    }} style={{height: "2em", marginLeft: 5}}>
                        {!viewPassword ? <Visibility/> : <VisibilityOff/>}
                    </Button>
                </Box>
                <Box sx={boxStyle}>
                    <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField fullWidth label="Confirma contraseña" name="password_r"
                               type={!viewPassword ? "password" : "text"}
                               variant="standard" value={usuario.password_repeat}
                               onChange={(e) => {
                                   if (e.target.value.length <= 10) {
                                       handleChangeCampo("password_repeat", e.target.value);
                                   }
                                   if (e.target.value !== usuario.password) {
                                       setMessage({texto: "Las contraseñas deben coincidir.", type: "warning"})
                                   } else {
                                       if (message?.texto === "Las contraseñas deben coincidir.") {
                                           setMessage(null);
                                       }
                                   }
                               }}/>
                </Box>
                <Box sx={boxStyle}>
                    <Group sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <FormControl variant={"standard"} sx={{m: 1, minWidth: 120}}>
                        <InputLabel>Rol</InputLabel>
                        <Select label={"Rol"} value={usuario.idRol} onChange={(e) => {
                            handleChangeCampo("idRol", e.target.value);
                        }}>
                            <MenuItem value={2}>
                                Ingeniero
                            </MenuItem>
                            <MenuItem value={3}>
                                Usuario
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{paddingLeft: 10, paddingRight: 10, marginTop: 5}}>
                    <Button variant="contained" color="success" type="submit"> Registrar </Button>
                </Box>
            </form>

        </Paper>

    );
};

export default FormUsuario;