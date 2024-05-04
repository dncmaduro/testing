describe('Login and Chat', () => {
    it('Logs in and navigates to chat', function() {
      cy.visit('/login')
  
      cy.get('input[name="username"]').type('maduro')
      cy.get('input[name="password"]').type('$gunnyhades9$')
  
      cy.get('button[type="submit"]').click()
  
      cy.url().should('include', '/')
  
      cy.get('div.container').should('be.visible')
    })
  })
  