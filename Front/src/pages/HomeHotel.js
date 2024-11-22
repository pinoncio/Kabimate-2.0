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

    if (filtroEstado) {
      filtered = filtered.filter((habitacion) => {
        const estadoNombre = estados[habitacion.ID_ESTADO_HABITACION];
        return (
          estadoNombre &&
          estadoNombre.toLowerCase() === filtroEstado.toLowerCase()
        );
      });
    }

    if (busqueda) {
      filtered = filtered.filter(
        (habitacion) =>
          habitacion.DESCRIPCION_HABITACION.toLowerCase().includes(
            busqueda.toLowerCase()
          ) || habitacion.NUMERO_HABITACION.toString().includes(busqueda)
      );
    }

    setFilteredHabitaciones(filtered);
  }, [filtroEstado, busqueda, habitaciones, estados]);

  const handleFiltroEstado = (estado) => {
    setFiltroEstado(estado);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const clearFiltroEstado = () => {
    setFiltroEstado("");
  };

  const getCardContainerColor = (estado) => {
    switch (estado) {
      case "Disponible":
        return "#e8f5e9";
      case "Ocupado":
        return "#ffebee";
      case "En Mantención":
        return "#fffde7";
      default:
        return "#f5f5f5";
    }
  };

  return (
    <div className="home-habitacion-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar habitación..."
          value={busqueda}
          onChange={handleBusqueda}
          className="search-input"
        />
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
            onClick={() => handleFiltroEstado("En Mantención")}
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
                  <div className="habitacion-card-header">
                    <h3>
                      <strong>Habitación:</strong>{" "}
                      {habitacion.NUMERO_HABITACION}
                    </h3>
                  </div>
                  <div className="habitacion-card-body">
                    <p>
                      <strong>Ubicación: </strong>
                      {pisoNombre || "Sin Piso"}
                    </p>
                    <p>
                      <strong>Tipo:</strong> {tipoNombre || "Sin Tipo"}
                    </p>
                    <p>
                      <strong>Servicios incluidos:</strong>{" "}
                      {habitacion.SERVICIOS_INCLUIDOS}
                    </p>
                    <p>
                      <strong>Descripción:</strong>{" "}
                      {habitacion.DESCRIPCION_HABITACION}
                    </p>
                    <p>
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
