import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class ReporteServicio {
    obten(idIncidencia) {
        return http.get(baseUrl + `/reporte/obten/${idIncidencia}`);
    }
}

export default ReporteServicio;

