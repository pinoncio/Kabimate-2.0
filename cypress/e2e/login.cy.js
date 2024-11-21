describe('Prueba Inicio de Sesion', () => {
  it('Inicio de sesíon correctamente',() => {
    cy.visit('http://localhost:3000/')
      cy.get('input[name="email"]').type('usuario@pruebas.cl')
      cy.get('input[name="contraseña"]').type('pruebas')
      cy.get('#boton').click()

      cy.url().should('include', 'http://localhost:3000/home')
  })
})