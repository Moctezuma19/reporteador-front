import React from 'react';
import EditaUsuario from "../component/usuario/EditaUsuario";

const EdicionUsuarioPage = () => {

    const [idUsuario, setIdUsuario] = React.useState(0);

    React.useEffect(() => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        if (typeof id !== "undefined" && id !== null) {
            setIdUsuario(parseInt(id));
        }
    }, []);

    return (<EditaUsuario idUsuario={idUsuario}/>)
};

export default EdicionUsuarioPage;