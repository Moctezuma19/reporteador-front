import * as React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Alert
} from "@mui/material";

import "../css/Login.css";
import {AccountCircle, Key} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const {loginUser} = useAuthContext();
    const navigate = useNavigate();
    const [message, setMessage] = React.useState(null);
    const [password, setPassword] = React.useState("");
    const [usuario, setUsuario] = React.useState("");
    //const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario || !password) {
            setMessage({texto: "Todos los campos son requeridos.", type: "warning"})
            return;
        }
        try {
            let data = await loginUser({correo: usuario, password: password});
            console.log("data", data)
            if (data === null) {
                setMessage({texto: "El usuario o contraseña son incorrectos.", type: "warning"})
            } else {
               navigate("/principal")
            }
        } catch (error) {
            setMessage({texto: "Error interno del servidor", type: "error"})
        }

    }

    return (<Grid container>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
                <Card className="card-login">
                    <CardContent style={{textAlign: "center"}}>
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <h2>Bienvenido</h2>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10}}>
                                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField fullWidth label="Usuario" name="username" variant="standard" value={usuario}
                                           type="email"
                                           onChange={(e) => {
                                               setUsuario(e.target.value);
                                           }}/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10}}>
                                <Key sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField fullWidth label="Contraseña" name="password" type="password"
                                           variant="standard" value={password}
                                           onChange={(e) => {
                                               if (e.target.value.length <= 10) {
                                                   setPassword(e.target.value);
                                               }
                                           }}/>
                            </Box>
                            <Box sx={{paddingLeft: 10, paddingRight: 10, marginTop: 5}}>
                                <Button variant="contained" color="success" type="submit"> Iniciar sesión </Button>
                            </Box>
                            {message !== null &&
                            <Box sx={{marginTop: 3}}><Alert severity={"warning"} onClose={() => {
                                setMessage(null);
                            }}>
                                {message.texto}
                            </Alert>
                            </Box>}
                        </form>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>
    );
};

export default LoginPage;