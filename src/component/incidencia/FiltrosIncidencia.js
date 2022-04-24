import React from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Input,
    InputAdornment,
    Button, MenuItem, OutlinedInput, Select, TextField
} from "@mui/material";
import {Search} from "@mui/icons-material";
import IncidenciaServicio from "../../services/IncidenciaServicio";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import {useAuthContext} from "../../context/AuthenticationContext";

const FiltrosIncidencia = ({setIncidencias, setIncidencia}) => {
    const {user} = useAuthContext();

    const filtro_ = {
        idIncidencia: 0,
        titulo: "",
        creacionInicio: new Date(),
        creacionFinal: new Date(),
    }

    const [filtro, setFiltro] = React.useState(filtro_);
    const [selectedEstados, setSelectedEstados] = React.useState([]);
    const incidenciaServicio = React.useMemo(() => new IncidenciaServicio(), []);

    const estados = [{nombre: "abierta", clase: "exito-estado"},
        {nombre: "en proceso", clase: "proceso-estado"},
        {nombre: "cerrada", clase: "cerrado-estado"},
        {nombre: "pendiente por el usuario", clase: "advertencia-estado"},
        {nombre: "pendiente por el proveedor", clase: "advertencia-estado"},
        {nombre: "pendiente (sin ingeniero de servicio)", clase: "advertencia-estado"}];

    const handleChangeSelectedEstados = (e) => {
        setSelectedEstados(e.target.value);
    }
    const handleChangeCreacionInicio = (e) => {
        setFiltro({...filtro, creacionInicio: e});
    }

    const handleChangeCreacionFinal = (e) => {
        setFiltro({...filtro, creacionFinal: e});
    }

    const handleChangeTitulo = (e) => {
        setFiltro({...filtro, titulo: e.target.value});
    }
    const handleChangeIdIncidencia = (e) => {
        setFiltro({...filtro, idIncidencia: e.target.value});
    }

    const handleRestaurar = (e) => {
        incidenciaServicio.obtenTodas(user.idUsuario).then(({data}) => {
            setIncidencia(null);
            setFiltro(filtro_);
            setIncidencias(data);
        }).catch((error) => {
           console.log("error: " + error);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let d1 = new Date(filtro.creacionInicio);
        d1.setHours(0);
        d1.setMinutes(0);
        d1.setSeconds(0);
        let d2 = new Date(filtro.creacionFinal);
        d1.setHours(0);
        d1.setMinutes(0);
        d1.setSeconds(0);
        let obj = {
            titulo: filtro.titulo,
            creacionInicio: d1.getTime(),
            creacionFinal: d2.getTime(),
            idIncidencia: filtro.idIncidencia
        };
        obj.estados = [...selectedEstados];
        if (obj.estados.length === 0) {
            obj.estados = [0, 1, 2, 3, 4, 5, 6];
        }

        incidenciaServicio.filtra(obj).then(({data}) => {
            setIncidencia(null);
            setIncidencias(data);
        }).catch((error) => {
            console.log("error: " + error);
        });
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const DatePickerInicio = () => {
        return (<LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label="Creación entre"
                inputFormat="dd/MM/yyyy"
                value={filtro.creacionInicio}
                onChange={handleChangeCreacionInicio}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>)
    }

    const DatePickerFinal = () => {
        return (<LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label="y"
                inputFormat="dd/MM/yyyy"
                value={filtro.creacionFinal}
                onChange={handleChangeCreacionFinal}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>)
    }


    return (<Paper elevation={3} style={{borderRadius: 16}}>
        <Box style={{textAlign: "left", padding: 33}}>
            <form className="filtro-incidencias" onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Id de incidencia</InputLabel>
                    <Input
                        type={"number"}
                        min={0}
                        id="standard-adornment-amount"
                        value={filtro.idIncidencia}
                        onChange={handleChangeIdIncidencia}
                        endAdornment={<InputAdornment position={"end"}><Search/></InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Título</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={filtro.titulo}
                        onChange={handleChangeTitulo}
                        endAdornment={<InputAdornment position={"end"}><Search/></InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        displayEmpty
                        value={selectedEstados}
                        onChange={handleChangeSelectedEstados}
                        input={<OutlinedInput color="success"/>}
                        renderValue={(seleccionados) => {
                            if (seleccionados.length === 0) {
                                return <em>Estado</em>;
                            }
                            return (<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {seleccionados.map((estado, k) => {
                                    return (<span key={`e-${k}`}
                                                  className={estados[estado].clase}>{estados[estado].nombre}</span>);
                                })}
                            </Box>);
                        }}

                        MenuProps={MenuProps}
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem disabled value={[]}>
                            <em>Estado</em>
                        </MenuItem>

                        {estados.map((estado, k) => (
                            <MenuItem
                                key={k}
                                value={k}
                            >
                                {estado.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DatePickerInicio/>
                <DatePickerFinal/>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <Button variant="contained" type="submit" color="success"> Filtrar </Button>
                </FormControl>
                <FormControl fullWidth sx={{m: 1}} variant="standard">
                    <Button variant="contained" type="button" color="success" onClick={handleRestaurar}> Restaurar </Button>
                </FormControl>
            </form>
        </Box>
    </Paper>)
};

export default FiltrosIncidencia;