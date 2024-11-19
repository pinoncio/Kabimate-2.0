import React, { useState, useEffect } from 'react';
import { getCabanas } from '../services/Cabania';  
import { getEstado } from '../services/Estados'; 
import '../Styles/HomeCabana.css';

export default function HomeCabana() {
  const [cabanas, setCabanas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filteredCabanas, setFilteredCabanas] = useState([]);
  const [estados, setEstados] = useState({});
  const idUsuario = localStorage.getItem('idUsuario');

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

    if (filtroEstado) {
      filtered = filtered.filter(cabana => {
        const estadoNombre = estados[cabana.ID_ESTADO_CABANIA];
        return estadoNombre && estadoNombre.toLowerCase() === filtroEstado.toLowerCase();
      });
    }

    if (busqueda) {
      filtered = filtered.filter(cabana =>
        cabana.DESCRIPCION_CABANIA.toLowerCase().includes(busqueda.toLowerCase()) ||
        cabana.UBICACION.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setFilteredCabanas(filtered);
  }, [filtroEstado, busqueda, cabanas, estados]);

  const handleFiltroEstado = (estado) => {
    setFiltroEstado(estado);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const clearFiltroEstado = () => {
    setFiltroEstado('');
  };

  const getCardContainerColor = (estado) => {
    switch (estado) {
      case 'Disponible':
        return '#e8f5e9';
      case 'Ocupado':
        return '#ffebee';
      case 'En Mantención':
        return '#fffde7';
      default:
        return '#f5f5f5';
    }
  };

  return (
    <div className="home-cabana-container">
      {/* Filtros */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar cabaña..."
          value={busqueda}
          onChange={handleBusqueda}
          className="search-input"
        />
        <div className="button-filters">
          <button
            onClick={() => handleFiltroEstado('Disponible')}
            className="filter-button disponible"
          >
            Disponible
          </button>
          <button
            onClick={() => handleFiltroEstado('Ocupado')}
            className="filter-button ocupado"
          >
            Ocupado
          </button>
          <button
            onClick={() => handleFiltroEstado('En Mantención')}
            className="filter-button mantenimiento"
          >
            En Mantención
          </button>
          <button
            onClick={clearFiltroEstado}
            className="filter-button reset"
          >
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
                  padding: '20px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                }}
              >
                <div
                  className="cabana-card"
                  style={{
                    backgroundColor: 'transparent',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="cabana-card-header">
                    <h3>{cabana.PRECIO_POR_NOCHE}</h3>
                    <p>{cabana.CAPACIDAD} personas</p>
                  </div>
                  <div className="cabana-card-body">
                    <p><strong>Cantidad de piezas:</strong> {cabana.CANTIDAD_PIEZAS}</p>
                    <p><strong>Ubicación:</strong> {cabana.UBICACION}</p>
                    <p><strong>Servicios incluidos:</strong> {cabana.SERVICIOS_INCLUIDOS}</p>
                    <p><strong>Descripción:</strong> {cabana.DESCRIPCION_CABANIA}</p>
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
