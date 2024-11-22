import React, { useState, useEffect } from "react";
import { getCabanas } from "../services/Cabania";
import { getEstado } from "../services/Estados";
import "../Styles/HomeCabana.css";

export default function HomeCabana() {
  const [cabanas, setCabanas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [capacidadMin, setCapacidadMin] = useState("");
  const [capacidadMax, setCapacidadMax] = useState("");
  const [cantidadPiezasMin, setCantidadPiezasMin] = useState("");
  const [cantidadPiezasMax, setCantidadPiezasMax] = useState("");
  const [ubicacion] = useState("");
  const [filteredCabanas, setFilteredCabanas] = useState([]);
  const [estados, setEstados] = useState({});
  const idUsuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    const fetchCabanas = async () => {
      try {
        const data = await getCabanas(idUsuario);
        setCabanas(data);
        setFilteredCabanas(data);
      } catch (error) {
        console.error("Error al obtener las cabañas", error);
      }
    };
    fetchCabanas();
  }, [idUsuario]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const estadosData = {};
        for (let cabana of cabanas) {
          if (!estadosData[cabana.ID_ESTADO_CABANIA]) {
            const estado = await getEstado(cabana.ID_ESTADO_CABANIA);
            estadosData[cabana.ID_ESTADO_CABANIA] = estado.NOMBRE_ESTADO;
          }
        }
        setEstados(estadosData);
      } catch (error) {
        console.error("Error al obtener los estados", error);
      }
    };

    if (cabanas.length > 0) {
      fetchEstados();
    }
  }, [cabanas]);

  useEffect(() => {
    let filtered = cabanas;

    // Filtrar por estado
    if (filtroEstado) {
      filtered = filtered.filter((cabana) => {
        const estadoNombre = estados[cabana.ID_ESTADO_CABANIA];
        return (
          estadoNombre &&
          estadoNombre.toLowerCase() === filtroEstado.toLowerCase()
        );
      });
    }

    // Filtrar por búsqueda de texto (descripcion o ubicación)
    if (busqueda) {
      filtered = filtered.filter(
        (cabana) =>
          cabana.DESCRIPCION_CABANIA.toLowerCase().includes(
            busqueda.toLowerCase()
          ) || cabana.UBICACION.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por precio
    if (precioMin) {
      filtered = filtered.filter(
        (cabana) => cabana.PRECIO_POR_NOCHE >= precioMin
      );
    }
    if (precioMax) {
      filtered = filtered.filter(
        (cabana) => cabana.PRECIO_POR_NOCHE <= precioMax
      );
    }

    // Filtrar por capacidad
    if (capacidadMin) {
      filtered = filtered.filter((cabana) => cabana.CAPACIDAD >= capacidadMin);
    }
    if (capacidadMax) {
      filtered = filtered.filter((cabana) => cabana.CAPACIDAD <= capacidadMax);
    }

    // Filtrar por cantidad de piezas
    if (cantidadPiezasMin) {
      filtered = filtered.filter(
        (cabana) => cabana.CANTIDAD_PIEZAS >= cantidadPiezasMin
      );
    }
    if (cantidadPiezasMax) {
      filtered = filtered.filter(
        (cabana) => cabana.CANTIDAD_PIEZAS <= cantidadPiezasMax
      );
    }

    // Filtrar por ubicación
    if (ubicacion) {
      filtered = filtered.filter((cabana) =>
        cabana.UBICACION.toLowerCase().includes(ubicacion.toLowerCase())
      );
    }

    setFilteredCabanas(filtered);
  }, [
    filtroEstado,
    busqueda,
    cabanas,
    estados,
    precioMin,
    precioMax,
    capacidadMin,
    capacidadMax,
    cantidadPiezasMin,
    cantidadPiezasMax,
    ubicacion,
  ]);

  const handleFiltroEstado = (estado) => {
    setFiltroEstado(estado);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  /*
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

  const handleCantidadPiezasMin = (e) => {
    setCantidadPiezasMin(e.target.value);
  };

  const handleCantidadPiezasMax = (e) => {
    setCantidadPiezasMax(e.target.value);
  };

  const handleUbicacion = (e) => {
    setUbicacion(e.target.value);
  };*/

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
    <div className="home-cabana-container">
      {/* Filtros */}
      <div className="filters">
        {/* Filtros agrupados */}
        <div className="input-filters">
          <select
            value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
            className="form-control"
          >
            <option value="">Precio mínimo</option>
            <option value="5000">5,000 CLP</option>
            <option value="10000">10,000 CLP</option>
            <option value="20000">20,000 CLP</option>
          </select>
          <select
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className="form-control"
          >
            <option value="">Precio máximo</option>
            <option value="50000">50,000 CLP</option>
            <option value="100000">100,000 CLP</option>
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
            <option value="4">4 personas</option>
          </select>
          <select
            value={capacidadMax}
            onChange={(e) => setCapacidadMax(e.target.value)}
            className="form-control"
          >
            <option value="">Capacidad máxima</option>
            <option value="4">4 personas</option>
            <option value="6">6 personas</option>
            <option value="8">8 personas</option>
          </select>

          <select
            value={cantidadPiezasMin}
            onChange={(e) => setCantidadPiezasMin(e.target.value)}
            className="form-control"
          >
            <option value="">Piezas mínimas</option>
            <option value="1">1 pieza</option>
            <option value="2">2 piezas</option>
          </select>
          <select
            value={cantidadPiezasMax}
            onChange={(e) => setCantidadPiezasMax(e.target.value)}
            className="form-control"
          >
            <option value="">Piezas máximas</option>
            <option value="4">4 piezas</option>
            <option value="6">6 piezas</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por ubicación o descripción"
            value={busqueda}
            onChange={handleBusqueda}
            className="form-control"
          />
        </div>

        {/* Botones de estado */}
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

      {/* Contenedor de cartas */}
      <div className="cabana-cards-container">
        {filteredCabanas.length > 0 ? (
          filteredCabanas.map((cabana) => {
            const estadoNombre = estados[cabana.ID_ESTADO_CABANIA];
            return (
              <div
                key={cabana.ID_CABANIA}
                className="cabana-card-container"
                style={{
                  backgroundColor: getCardContainerColor(estadoNombre),
                  padding: "20px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="cabana-card"
                  style={{
                    backgroundColor: "transparent",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="cabana-card-header"></div>
                  <div className="cabana-card-body">
                    <div className="cabana-icon"></div>
                    <h5 class="left-align">
                      {cabana.PRECIO_POR_NOCHE} CLP por noche
                    </h5>
                    <p class="justify-text">
                      <strong>Capacidad:</strong> {cabana.CAPACIDAD} persona(s)
                    </p>
                    <p class="justify-text">
                      <strong>Cantidad de piezas:</strong>{" "}
                      {cabana.CANTIDAD_PIEZAS}
                    </p>
                    <p class="justify-text">
                      <strong>Ubicación:</strong> {cabana.UBICACION}
                    </p>
                    <p class="justify-text">
                      <strong>Servicios incluidos:</strong>{" "}
                      {cabana.SERVICIOS_INCLUIDOS}
                    </p>
                    <p class="justify-text">
                      <strong>Descripción:</strong> {cabana.DESCRIPCION_CABANIA}
                    </p>
                    <p class="justify-text">
                      <strong>Estado:</strong> {estadoNombre || "No disponible"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No se encontraron cabañas para este filtro.</p>
        )}
      </div>
    </div>
  );
}
