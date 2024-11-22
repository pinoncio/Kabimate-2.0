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

        
        cy.get('.modal-header .h5').should('contain.text', 'Crear cabaña'); 

        cy.get('#capacidad').type('4'); 
        cy.get('#cantidad_piezas').type('2'); 
        cy.get('#precio_por_noche').type('50000'); 
        cy.get('#ubicacion').type('Playa del Sol, Sector 4'); 
        cy.get('#servicios_incluidos').type('WiFi, TV, Piscina');
        cy.get('#descripcion_cabania').type('Cabaña moderna con vista al mar'); 


        cy.get('.btn.btn-success').click();


        cy.get('.swal2-title.custom-swal-title') 
            .should('be.visible') 
            .and('contain.text', 'La cabaña se ha creado correctamente');
        
            cy.get('.swal2-confirm') 
            .should('be.visible') 
            .click(); 

        cy.get('.swal2-title.custom-swal-title').should('not.exist');

        
    })
})


