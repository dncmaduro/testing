describe('Login and Set Avatar E2E', () => {
  beforeEach(() => {
    // Xóa dữ liệu cũ 
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/login'); 
  });

  afterEach(() => {
    cy.wait(2000); // Chờ 2 giây sau mỗi khối it
  });

  it('should require all fields for login', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Email and Password is required.').should("be.visible"); 
  });

  it('should navigate to the register page when clicking the register link', () => {
    cy.contains("Don't have an account ?")
      .find('a')
      .should('have.attr', 'href', '/register'); 

    cy.contains("Don't have an account ?")
      .find('a')
      .click();

    cy.url().should('include', '/register');
  });
});
