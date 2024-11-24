describe('Prueba Inicio de Sesion', () => {
  it('MA-0004: Inicio de sesíon incorrecta correo',() => {
    cy.visit('http://localhost:3000/')
      cy.get('input[name="email"]').type('usuarioincorrecto@pruebas.cl')
      cy.get('input[name="contraseña"]').type('pruebas')
      cy.get('#boton').click()
      cy.wait(1000);
      cy.get('.swal2-title.custom-swal-title').should('contain', 'El email ingresado no es valido')
      cy.get('.swal2-confirm.swal2-styled').should('be.visible').click();
  })

  it('MA-0005: Inicio de sesíon incorrecta contraseña',() => {
    cy.visit('http://localhost:3000/')
      cy.get('input[name="email"]').type('usuario@pruebas.cl')
      cy.get('input[name="contraseña"]').type('contraseñaincorrecta')
      cy.get('#boton').click()
      cy.wait(1000);
      cy.get('.swal2-title.custom-swal-title').should('contain', 'Contraseña Incorrecta')
      cy.get('.swal2-confirm.swal2-styled').should('be.visible').click();
  })

  it('MA-0006: Inicio de sesíon usuario bloqueado',() => {
    cy.visit('http://localhost:3000/')
      cy.get('input[name="email"]').type('usuariobloqueado@pruebas.cl')
      cy.get('input[name="contraseña"]').type('contraseñaincorrecta')
      cy.get('#boton').click()
      cy.wait(1000);
      cy.get('.swal2-title.custom-swal-title').should('contain', 'La cuenta esta bloqueada, porfavor contacta al administrador')
      cy.get('.swal2-confirm.swal2-styled').should('be.visible').click();
  })

  it('MA-0007: Inicio de sesíon correctamente',() => {
    cy.visit('http://localhost:3000/')
      cy.get('input[name="email"]').type('usuario@pruebas.cl')
      cy.get('input[name="contraseña"]').type('pruebas')
      cy.get('#boton').click()
      cy.url().should('include', 'http://localhost:3000/home')
  })
})