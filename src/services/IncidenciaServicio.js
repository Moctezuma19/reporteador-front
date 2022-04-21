import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class IncidenciaServicio {
    crea(data) {
        return http.put(baseUrl + "/incidencia/crea", data);
    }

    obten(idIncidencia) {
        return http.get(baseUrl + `/incidencia/${idIncidencia}`);
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

    filtra(data) {
        return http.post(baseUrl + "/incidencia/filtra", data);
    }
}

export default IncidenciaServicio;