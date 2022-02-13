import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class UsuarioServicio {
    obtenTodos() {
        return http.get(baseUrl + "/usuario/todos");
    }

    registra(data) {
        return http.put(baseUrl + "/usuario/registra", data);
    }
}

export default UsuarioServicio;