import React from 'react';
import '../Styles/Home.css';

const Home = () => {
    return (
        <div className="home-wrapper">
            <h1 className="home-title">Bienvenido a Kabimate</h1>
            <p className="home-subtitle">La herramienta ideal para practicar la administración de Hotel ficticio y de cabañas.</p>

            {/* Descripción general */}
            <section className="description">
                <h2>¿Qué es Kabimate?</h2>
                <p><strong>Kabimate</strong> es un software de administración simulada, diseñado especialmente para estudiantes que desean practicar y aprender sobre la gestión de Hotel ficticio y cabañas.</p>
                <p>Con nuestra plataforma, podrás administrar tanto <strong>Hotel ficticio</strong> como <strong>cabañas</strong>, eligiendo la vista que mejor se adapte a tus necesidades mediante los botones en el encabezado.</p>
                <p>Para una mejor experiencia de usuario, simplemente selecciona entre los botones de <strong>Hotel ficticio</strong> o <strong>Cabañas</strong> en la parte superior de la página. Esto cambiará la vista y funcionalidades de la plataforma según tu elección.</p>
            </section>

            {/* Instrucciones de uso */}
            <section className="instructions">
                <h2>¿Cómo empezar?</h2>
                <p>Al ingresar a la plataforma, podrás:</p>
                <ul>
                    <li>Seleccionar entre las opciones de <strong>Hotel ficticio</strong> o <strong>Cabañas</strong> en la parte superior de la página para decidir qué tipo de alojamiento deseas administrar y practicar.</li>
                    <li>Gestionar reservas tanto de Hotel ficticio como de Cabañas.</li>
                    <li>Acceder a tu historial de reservas y administrarlas fácilmente.</li>
                    <li>Administrar los detalles del Hotel ficticio y cabañas que gestionas, como precios, disponibilidad y servicios.</li>
                </ul>
            </section>

            {/* Beneficios de Usar Kabimate */}
            <section className="benefits">
                <h2>Beneficios de Usar Kabimate</h2>
                <ul>
                    <li><strong>Fácil de Usar:</strong> Una interfaz intuitiva que te permite gestionar tu Hotel ficticio y cabañas con facilidad.</li>
                    <li><strong>Accesibilidad:</strong> Accede a la plataforma desde cualquier dispositivo con conexión a Internet.</li>
                    <li><strong>Optimización:</strong> Gestiona múltiples reservas simultáneamente sin errores, mejorando la eficiencia.</li>
                    <li><strong>Flexibilidad:</strong> Personaliza los servicios y precios de tus alojamientos según tus necesidades específicas.</li>
                </ul>
            </section>
        </div>
    );
};

export default Home;
