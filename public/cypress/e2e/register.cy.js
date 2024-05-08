describe('Register Page - Field Validation', () => {
  const timestamp = Date.now();
  const validUser = {
    username: `usertest${timestamp}`,
    email: `usertest${timestamp}@example.com`,
    password: "validpassword123",
    confirmPassword: "validpassword123",
  };

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/register');
  });

  afterEach(() => {
    cy.wait(2000);
  });

  it('should show error for invalid username', () => {
    cy.get('input[name="username"]').type('us'); 
    cy.get('input[name="email"]').type(validUser.email); 
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('input[name="confirmPassword"]').type(validUser.confirmPassword); 

    cy.get('button[type="submit"]').click();
    cy.contains('Username should be greater than 3 characters.').should('be.visible');
  });

  it('should show error for invalid email', () => {
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type(validUser.password); 
    cy.get('input[name="confirmPassword"]').type(validUser.confirmPassword); 

    cy.get('button[type="submit"]').click();
    cy.contains('Email is invalid.').should('be.visible'); 
  });

  it('should show error when username is duplicated', () => {
    cy.get('input[name="username"]').type('usertest');
    cy.get('input[name="email"]').type(validUser.email);
    cy.get('input[name="password"]').type('$gunnyhades9$');
    cy.get('input[name="confirmPassword"]').type('$gunnyhades9$');
    cy.get('button[type="submit"]').click();
    cy.contains('Username already used!').should('be.visible')
  })

  it('should show error when email is duplicated', () => {
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="email"]').type('usertest@example.com');
    cy.get('input[name="password"]').type('$gunnyhades9$');
    cy.get('input[name="confirmPassword"]').type('$gunnyhades9$');
    cy.get('button[type="submit"]').click();
    cy.contains('Email already used!').should('be.visible')
  })

  it('should show error for short password', () => {
    cy.get('input[name="username"]').type(validUser.username); 
    cy.get('input[name="email"]').type(validUser.email); 
    cy.get('input[name="password"]').type('short'); 
    cy.get('input[name="confirmPassword"]').type('short');

    cy.get('button[type="submit"]').click();
    cy.contains('Password should be equal or greater than 8 characters.').should('be.visible'); 
  });

  it('should show error for non-matching confirm password', () => {
    cy.get('input[name="username"]').type(validUser.username); 
    cy.get('input[name="email"]').type(validUser.email); 
    cy.get('input[name="password"]').type(validUser.password); 
    cy.get('input[name="confirmPassword"]').type('differentpassword'); 

    cy.get('button[type="submit"]').click();
    cy.contains('Password and confirm password should be same.').should('be.visible'); 
  });

  it("should register successfully, select avatar, and navigate to home page", () => {
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="email"]').type(validUser.email);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('input[name="confirmPassword"]').type(validUser.confirmPassword);

    cy.get('button[type="submit"]').click();
    // cy.contains("Registration successful!").should('be.visible', { timeout: 5000 });

    cy.url().should("include", "/setAvatar");
    cy.contains("Pick an Avatar as your profile picture").should("be.visible");
    cy.get(".avatars .avatar").first().click();

    cy.get(".submit-btn").click();
    cy.url().should("include", "/");

    // Kiểm tra dữ liệu trong local storage
    cy.window().then((win) => {
      const storedData = win.localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      expect(storedData).to.not.be.null; // Đảm bảo có dữ liệu
    });
  });

  it('should navigate to the login page when clicking the login link', () => {
    cy.contains('Already have an account ?').find('a').should('have.attr', 'href', '/login'); 
    cy.contains('Already have an account ?').find('a').click();

    cy.url().should('include', '/login');
  });
});