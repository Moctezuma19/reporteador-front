import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class UsuarioServicio {
    obtenTodos() {
        return http.get(baseUrl + "/usuario/todos");
    }

    registra(data) {
        return http.put(baseUrl + "/usuario/registra", data);
    }

    actualiza(data) {
        return http.post(baseUrl + "/usuario/actualiza", data);
    }

    elimina(idUsuario) {
        return http.get(baseUrl + `/usuario/elimina/${idUsuario}`);
    }
}

export default UsuarioServicio;