describe('Prueba Inicio de Sesion', () => {
    it('Inicio de sesíon incorrecta correo',() => {
        cy.visit('http://localhost:3000/')
        cy.get('input[name="email"]').type('usuario@pruebas.cl')
        cy.get('input[name="contraseña"]').type('pruebas')
        cy.get('#boton').click()

        cy.wait(1000);

        cy.url().should('include', 'http://localhost:3000/home')

        cy.get('#cabanas').click()
        cy.url().should('include', 'http://localhost:3000/homeC#')
        cy.get('#gcabanas').click()
        cy.wait(1000);
        cy.url().should('include', 'http://localhost:3000/gcabana')
        cy.get('#añadirC').click()

        cy.get('.modal-header').should('be.visible'); 

        
        cy.get('.modal-header .h5').should('contain.text', 'Crear cabaña'); // verificamos que se abra la ventana con crear cabaña

        cy.get('#capacidad').type('4'); // Capacidad de la cabaña
        cy.get('#cantidad_piezas').type('2'); // Cantidad de piezas
        cy.get('#precio_por_noche').type('50000'); // Precio por noche
        cy.get('#ubicacion').type('Playa del Sol, Sector 4'); // Ubicación
        cy.get('#servicios_incluidos').type('WiFi, TV, Piscina'); // Servicios incluidos
        cy.get('#descripcion_cabania').type('Cabaña moderna con vista al mar'); // Descripción


        cy.get('.btn.btn-success').click();

        // Verificar que aparece el cuadro de éxito
        cy.get('.swal2-title.custom-swal-title') // Selecciona el elemento del cuadro de éxito
            .should('be.visible') // Verifica que es visible
            .and('contain.text', 'La cabaña se ha creado correctamente'); // Verifica el texto
        
            cy.get('.swal2-confirm') // Selector del botón OK (SweetAlert2)
            .should('be.visible') // Asegurar que el botón está visible
            .click(); // Clic en el botón

        // Verificar que el cuadro de éxito desapareció
        cy.get('.swal2-title.custom-swal-title').should('not.exist');

        
    })
})


