import {ApiProtected as http} from "../config/axios";
import {baseUrl} from "../util/Constants";

class ImagenServicio {

    obtenImagen(hash) {
        return http.get(baseUrl + `/imagen/obten/${hash}`);

    }

}

export default ImagenServicio;