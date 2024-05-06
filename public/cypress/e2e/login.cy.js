describe('Login and Set Avatar E2E', () => {
  
  const validUsername = 'validuser'; // Tên người dùng hợp lệ
  const validPassword = 'validpassword123'; // Mật khẩu hợp lệ
  
  beforeEach(() => {
    // Xóa dữ liệu cũ và điều hướng đến trang Đăng nhập
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/login'); 
  });

  it('should navigate to SetAvatar after login if no avatar', () => {
    cy.get('input[name="username"]').type(validUsername); 
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click(); 

    cy.url().should('include', '/');
  });

  it('should show error with incorrect username or password', () => {
    cy.get('input[name="username"]').type('wronguser'); 
    cy.get('input[name="password"]').type('wrongpassword'); 
    
    cy.get('button[type="submit"]').click(); 
    
    cy.contains('Invalid username or password').should("be.visible"); 
  });

  it('should require all fields for login', () => {
    cy.get('button[type="submit"]').click();
    
    cy.contains('Username is required').should("be.visible"); 
    cy.contains('Password is required').should("be.visible"); 
  });

  it('should navigate to register page from login page', () => {
    cy.contains("Don't have an account?").find('a').click(); 
    
    cy.url().should('include', '/register');
  });

  it('should maintain data after error', () => {
    cy.get('input[name="username"]').type('testuser'); 
    cy.get('input[name="password"]'). type('wrongpassword'); 

    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid username or password').should("be.visible"); 
    cy.get('input[name="username"]').should('have.value', 'testuser'); 
  });
});
