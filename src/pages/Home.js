import React from 'react';
import '../Styles/Home.css'; 
import uno from '../Images/uno.jpg'; 
import dos from '../Images/dos.jpg'; 
import tres from '../Images/tres.jpg'; 
import cuatro from '../Images/cuatro.jpg'; 


const Home = () => {
    return (
      <div>
        <div className="home-wrapper">
          <h1 className="home-title">Bienvenido a Kabimate</h1>
          <p className="home-subtitle">Descubre lo que tenemos para ofrecerte.</p>
  
          {/* Formulario de búsqueda */}
          <form className="search-form">
            <input type="text" placeholder="Región, Ciudad" className="search-input" />
            <input type="date" className="search-input" />
            <input type="date" className="search-input" />
            <input type="number" placeholder="Número de personas" className="search-input" />
            <button type="submit" className="search-button">Buscar</button>
          </form>
  
          {/* Contenedores para mostrar hoteles o cabañas */}
          <div className="container-grid">
            {Array.from({ length: 9 }).map((_, index) => (
              <div className="container" key={index}>
                <div className="image-wrapper"> {/* Nuevo contenedor para la imagen */}
                  <img 
                    src={index === 0 ? uno : 
                         index === 1 ? dos : 
                         index === 2 ? tres : 
                         index === 3 ? cuatro : 
                         `path/to/your/image${index + 1}.jpg`} // Usa las imágenes en sus respectivos índices
                    alt={`Imagen ${index + 1}`} 
                    className="container-image" 
                  />
                </div>
                <p className="container-description">Descripción de la habitación o cabaña</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Home;