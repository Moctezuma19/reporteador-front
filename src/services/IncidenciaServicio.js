import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class IncidenciaServicio {
    crea(data) {
        return http.put(baseUrl + "/incidencia/crea", data);
    }

    obtenTodas(idUsuario) {
        return http.get(baseUrl + `/incidencia/todas/${idUsuario}`);
    }

    asigna(idUsuario, idIncidencia) {
        return http.get(baseUrl + `/incidencia/asigna/${idUsuario}?id=${idIncidencia}`);
    }

    obtenRespuestas(idIncidencia) {
        return http.get(baseUrl + `/incidencia/respuestas/${idIncidencia}`);
    }

    responde(data) {
        return http.put(baseUrl + `/incidencia/responde`, data);
    }

    obtenDescripcion(idIncidencia) {
        return http.get(baseUrl + `/incidencia/descripcion/${idIncidencia}`);
    }
}

export default IncidenciaServicio;