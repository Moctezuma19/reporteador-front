import * as React from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Alert, FormControlLabel, Checkbox, Container, CssBaseline, Avatar, Typography, createTheme
} from "@mui/material";

import "../css/Login.css";
import {LockOutlined} from "@mui/icons-material";
import {useAuthContext} from "../context/AuthenticationContext";
import {useNavigate} from 'react-router-dom';
import {ThemeProvider} from "@emotion/react";

const theme = createTheme();
const LoginPage = () => {
    const {loginUser} = useAuthContext();
    const navigate = useNavigate();
    const [message, setMessage] = React.useState(null);
    const [password, setPassword] = React.useState("");
    const [usuario, setUsuario] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario || !password) {
            setMessage({texto: "Todos los campos son requeridos.", type: "warning"})
            return;
        }

        if (!usuario.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setMessage({texto: "El correo no es válido.", type: "warning"});
            return;
        }
        try {
            let data = await loginUser({correo: usuario, password: password});
            if (data === null) {
                setMessage({texto: "El usuario o contraseña son incorrectos.", type: "warning"})
            } else {
                navigate("/r/incidencias");
            }
        } catch (error) {
            setMessage({texto: "Error interno del servidor", type: "error"})
        }

    }

    return (<Grid container>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'success'}}>
                                <LockOutlined/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Bienvenido
                            </Typography>
                            {message !== null &&
                            <Box sx={{marginTop: 3, width: "100%"}}><Alert severity={"warning"} onClose={() => {
                                setMessage(null);
                            }}>
                                {message.texto}
                            </Alert>
                            </Box>}
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    autoFocus
                                    color="success"
                                    value={usuario}
                                    onChange={(e) => {
                                        setUsuario(e.target.value);
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    color="success"
                                    value={password}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 10) {
                                            setPassword(e.target.value);
                                        }
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="success"/>}
                                    label="Recordarme"
                                />
                                <Button
                                    type="submit"
                                    color={"success"}
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Grid>
            <Grid item xs={4}>
            </Grid>
        </Grid>
    );
};

export default LoginPage;