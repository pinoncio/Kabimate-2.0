import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alerta(mensaje, icono, foco = '', ancho = '600px') {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono,
        width: ancho,  // El ancho es dinámico y puede ser personalizado al momento de invocar la función
        customClass: {
            popup: 'custom-swal-popup',  // Clase personalizada para el contenedor
            title: 'custom-swal-title',  // Clase personalizada para el título
            content: 'alert-content'     // Clase personalizada para el contenido
        },
        focusConfirm: foco ? true : false,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
    });
}
