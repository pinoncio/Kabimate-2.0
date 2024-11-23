import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alerta(mensaje, icono, foco = "", ancho = "600px") {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono,
    width: ancho, // El ancho es dinámico y puede ser personalizado al momento de invocar la función
    customClass: {
      popup: "custom-swal-popup", 
      title: "custom-swal-title", 
      content: "alert-content", 
    },
    focusConfirm: foco ? true : false,
    showCancelButton: true,
    cancelButtonText: "Cerrar",
  });
}
