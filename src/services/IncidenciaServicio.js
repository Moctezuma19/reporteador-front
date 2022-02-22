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
}

export default IncidenciaServicio;