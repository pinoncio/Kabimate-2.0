import React, { useState, useEffect } from "react";
import { getHabitaciones } from "../services/Habitacion";
import { getEstado } from "../services/Estados";
import { getPiso } from "../services/Pisos";
import { getTipo } from "../services/TipoHabitacion";
import "../Styles/HomeHabitacion.css";

export default function HomeHabitacion() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [capacidadMin, setCapacidadMin] = useState("");
  const [capacidadMax, setCapacidadMax] = useState("");
  const [filteredHabitaciones, setFilteredHabitaciones] = useState([]);
  const [estados, setEstados] = useState({});
  const [pisos, setPisos] = useState({});
  const [tipos, setTipos] = useState({});
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const data = await getHabitaciones(idUsuario);
        setHabitaciones(data);
        setFilteredHabitaciones(data);
      } catch (error) {
        console.error("Error al obtener las habitaciones", error);
      }
    };
    fetchHabitaciones();
  }, [idUsuario]);

  useEffect(() => {
    const fetchEstadosPisosTipos = async () => {
      try {
        const estadosData = {};
        const pisosData = {};
        const tiposData = {};

        for (let habitacion of habitaciones) {
          // Obtener estado
          if (!estadosData[habitacion.ID_ESTADO_HABITACION]) {
            const estado = await getEstado(habitacion.ID_ESTADO_HABITACION);
            estadosData[habitacion.ID_ESTADO_HABITACION] = estado.NOMBRE_ESTADO;
          }
          // Obtener piso
          if (!pisosData[habitacion.ID_PISO_HABITACION]) {
            const piso = await getPiso(habitacion.ID_PISO_HABITACION);
            pisosData[habitacion.ID_PISO_HABITACION] = piso.NOMBRE_PISO;
          }
          // Obtener tipo de habitación
          if (!tiposData[habitacion.ID_TIPO_HABITACION_HABITACION]) {
            const tipo = await getTipo(
              habitacion.ID_TIPO_HABITACION_HABITACION
            );
            tiposData[habitacion.ID_TIPO_HABITACION_HABITACION] =
              tipo.NOMBRE_TIPO_HABITACION;
          }
        }

        setEstados(estadosData);
        setPisos(pisosData);
        setTipos(tiposData);
      } catch (error) {
        console.error("Error al obtener datos foráneos", error);
      }
    };

    if (habitaciones.length > 0) {
      fetchEstadosPisosTipos();
    }
  }, [habitaciones]);

  useEffect(() => {
    let filtered = habitaciones;

    // Filtrar por estado
    if (filtroEstado) {
      filtered = filtered.filter(
        (habitacion) =>
          estados[habitacion.ID_ESTADO_HABITACION] === filtroEstado
      );
    }

    // Filtrar por precio mínimo y máximo
    if (precioMin) {
      filtered = filtered.filter(
        (habitacion) => habitacion.PRECIO_POR_NOCHE >= precioMin
      );
    }
    if (precioMax) {
      filtered = filtered.filter(
        (habitacion) => habitacion.PRECIO_POR_NOCHE <= precioMax
      );
    }

    // Filtrar por capacidad mínima y máxima
    if (capacidadMin) {
      filtered = filtered.filter(
        (habitacion) => habitacion.CAPACIDAD >= capacidadMin
      );
    }
    if (capacidadMax) {
      filtered = filtered.filter(
        (habitacion) => habitacion.CAPACIDAD <= capacidadMax
      );
    }

    // Filtrar por búsqueda
    if (busqueda) {
      filtered = filtered.filter(
        (habitacion) =>
          habitacion.DESCRIPCION_HABITACION.toLowerCase().includes(
            busqueda.toLowerCase()
          ) || habitacion.NUMERO_HABITACION.toString().includes(busqueda)
      );
    }

    setFilteredHabitaciones(filtered);
  }, [
    filtroEstado,
    busqueda,
    habitaciones,
    estados,
    precioMin,
    precioMax,
    capacidadMin,
    capacidadMax,
  ]);

  const handleFiltroEstado = (estado) => {
    setFiltroEstado(estado);
  };

  /*
  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

 
  const handlePrecioMin = (e) => {
    setPrecioMin(e.target.value);
  };

  const handlePrecioMax = (e) => {
    setPrecioMax(e.target.value);
  };

  const handleCapacidadMin = (e) => {
    setCapacidadMin(e.target.value);
  };

  const handleCapacidadMax = (e) => {
    setCapacidadMax(e.target.value);
  };
*/
  const clearFiltroEstado = () => {
    setFiltroEstado("");
  };

  const getCardContainerColor = (estado) => {
    switch (estado) {
      case "Disponible":
        return "#e8f5e9";
      case "Ocupado":
        return "#ffebee";
      case "Mantenimiento":
        return "#fffde7";
      default:
        return "#f5f5f5";
    }
  };

  return (
    <div className="home-habitacion-container">
      <div className="filters">
        <div className="input-filters">
          <select
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="form-control"
          >
            <option value="">Precio mínimo</option>
            <option value="1000">1,000 CLP</option>
            <option value="5000">5,000 CLP</option>
            <option value="10000">10,000 CLP</option>
            <option value="15000">15,000 CLP</option>
            <option value="20000">20,000 CLP</option>
            <option value="25000">25,000 CLP</option>
            <option value="30000">30,000 CLP</option>
            <option value="35000">35,000 CLP</option>
            <option value="40000">40,000 CLP</option>
            <option value="45000">45,000 CLP</option>
            <option value="50000">50,000 CLP</option>
          </select>

          <select
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="form-control"
          >
            <option value="">Precio máximo</option>
            <option value="1000">1,000 CLP</option>
            <option value="5000">5,000 CLP</option>
            <option value="10000">10,000 CLP</option>
            <option value="20000">20,000 CLP</option>
            <option value="30000">30,000 CLP</option>
            <option value="40000">40,000 CLP</option>
            <option value="50000">50,000 CLP</option>
            <option value="75000">75,000 CLP</option>
            <option value="100000">100,000 CLP</option>
            <option value="150000">150,000 CLP</option>
            <option value="200000">200,000 CLP</option>
          </select>

          <select
            value={capacidadMin}
            onChange={(e) => setCapacidadMin(e.target.value)}
            className="form-control"
          >
            <option value="">Capacidad mínima</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6">6 personas</option>
            <option value="7">7 personas</option>
            <option value="8">8 personas</option>
            <option value="9">9 personas</option>
            <option value="10">10 personas</option>
          </select>

          <select
            value={capacidadMax}
            onChange={(e) => setCapacidadMax(e.target.value)}
            className="form-control"
          >
            <option value="">Capacidad máxima</option>
            <option value="4">4 personas</option>
            <option value="5">5 personas</option>
            <option value="6">6 personas</option>
            <option value="7">7 personas</option>
            <option value="8">8 personas</option>
            <option value="9">9 personas</option>
            <option value="10">10 personas</option>
            <option value="12">12 personas</option>
            <option value="14">14 personas</option>
            <option value="16">16 personas</option>
          </select>
        </div>
        <div className="button-filters">
          <button
            onClick={() => handleFiltroEstado("Disponible")}
            className="filter-button disponible"
          >
            Disponible
          </button>
          <button
            onClick={() => handleFiltroEstado("Ocupado")}
            className="filter-button ocupado"
          >
            Ocupado
          </button>
          <button
            onClick={() => handleFiltroEstado("Mantenimiento")}
            className="filter-button mantenimiento"
          >
            En Mantención
          </button>
          <button onClick={clearFiltroEstado} className="filter-button reset">
            Quitar Filtro
          </button>
        </div>
      </div>

      <div className="habitacion-cards-container">
        {filteredHabitaciones.length > 0 ? (
          filteredHabitaciones.map((habitacion) => {
            const estadoNombre = estados[habitacion.ID_ESTADO_HABITACION];
            const pisoNombre = pisos[habitacion.ID_PISO_HABITACION];
            const tipoNombre = tipos[habitacion.ID_TIPO_HABITACION_HABITACION];

            return (
              <div
                key={habitacion.ID_HABITACION}
                className="habitacion-card-container"
                style={{
                  backgroundColor: getCardContainerColor(estadoNombre),
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="habitacion-card"
                  style={{
                    backgroundColor: "transparent",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="habitacion-card-header"></div>
                  <div className="habitacion-card-body">
                    <div className="hotel-icon"></div>
                    <h5 class="left-align">
                      {habitacion.PRECIO_POR_NOCHE} CLP por noche
                    </h5>
                    <p class="justify-text">
                      <strong>Habitación:</strong>{" "}
                      {habitacion.NUMERO_HABITACION}
                    </p>
                    <p class="justify-text">
                      <strong>Capacidad:</strong> {habitacion.CAPACIDAD}{" "}
                      persona(s)
                    </p>
                    <p class="justify-text">
                      <strong>Ubicación: </strong>
                      {pisoNombre || "Sin Piso"}
                    </p>
                    <p class="justify-text">
                      <strong>Tipo:</strong> {tipoNombre || "Sin Tipo"}
                    </p>
                    <p class="justify-text">
                      <strong>Servicios incluidos:</strong>{" "}
                      {habitacion.SERVICIOS_INCLUIDOS}
                    </p>
                    <p class="justify-text">
                      <strong>Descripción:</strong>{" "}
                      {habitacion.DESCRIPCION_HABITACION}
                    </p>
                    <p class="justify-text">
                      <strong>Estado:</strong> {estadoNombre || "Sin Estado"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No se encontraron habitaciones para este filtro.</p>
        )}
      </div>
    </div>
  );
}
