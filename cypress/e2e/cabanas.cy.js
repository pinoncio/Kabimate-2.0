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


        
    })
})


