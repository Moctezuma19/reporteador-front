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

    obtenIngenieros() {
        return http.get(baseUrl + "/usuario/ingenieros");
    }

    filtra(data) {
        return http.post(baseUrl + "/usuario/filtra", data);
    }
}

export default UsuarioServicio;