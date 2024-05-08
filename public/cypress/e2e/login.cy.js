describe('Login and Set Avatar E2E', () => {
  const validUser = {
    username: "maduro",
    password: "$gunnyhades9$",
  };

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/login'); 
  });

  afterEach(() => {
    cy.wait(2000);
  });

  it('should require all fields for login', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Email and Password is required.').should("be.visible"); 
  });

  it("should login and navigate to the chat page", () => {
    // Đăng nhập với thông tin hợp lệ
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
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