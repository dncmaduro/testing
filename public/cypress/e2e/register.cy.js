describe('Register Page E2E', () => {
  const validUser = {
    username: 'validusertest3',
    email: 'validusertest3@example.com',
    password: 'validpassword123'
  };

  beforeEach(() => {
    cy.window().then((win) => {
      // Xóa dữ liệu cũ để bắt đầu từ môi trường sạch
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/register'); // Điều hướng đến trang đăng ký trước mỗi kiểm thử
  });

  it('should register a new user and redirect to SetAvatar', () => {
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="email"]').type(validUser.email);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('input[name="confirmPassword"]').type(validUser.password);

    cy.get('button[type="submit"]').click(); 

    cy.url().should('include', '/setAvatar'); // Kiểm tra điều hướng
    cy.contains('Pick an Avatar as your profile picture').should("be.visible"); // Xác nhận nội dung
  });

  it('should navigate to home after setting an avatar', () => {
    cy.visit('/setAvatar');
    cy.get('.avatars .avatar').first().click();

    cy.get('.submit-btn').click(); 

    cy.url().should("include", "/");
  });

  it('should show error if trying to set avatar without selecting one', () => {
    cy.visit('/setAvatar');
    cy.get('.submit-btn').click(); 
    cy.contains("Please select an avatar").should("be.visible"); 

  it('should show errors when invalid information is provided', () => {
    cy.get('input[name="username"]').type('x'); 
    cy.get('input[name="email"]').type('invalid-email'); 
    cy.get('input[name="password"]').type('short'); 
    cy.get('input[name="confirmPassword"]').type('different'); 

    cy.get('button[type="submit"]').click(); 

    cy.contains('Username should be greater than 3 characters').should("be.visible");
    cy.contains('Invalid email address').should("be.visible");
    cy.contains('Password should be at least 8 characters').should("be.visible");
    cy.contains('Passwords do not match').should("be.visible");
  });

  it('should not register with duplicate email', () => {
    cy.get('input[name="username"]').type('existinguser');
    cy.get('input[name="email"]').type(validUser.email); 
    
    cy.get('input[name="password"]').type('anotherpassword');
    cy.get('input[name="confirmPassword"]').type('anotherpassword');
    
    cy.get('button[type="submit"]').click(); 
    
    cy.contains('Email already exists').should("be.visible");
  });

  it('should navigate to login page from register page', () => {
    cy.contains('Already have an account?').find('a').click(); 
    
    cy.url().should('include', '/login');
  });

  it('should keep data after form error', () => {
    cy.get('input[name="username"]').type('userwitherror');
    cy.get('input[name="email"]').type('incorrect-email'); 
    
    cy.get('button[type="submit"]').click(); 
    
    cy.contains('Invalid email address').should("be.visible"); 
    
    cy.get('input[name="username"]').should('have.value', 'userwitherror'); 
  });
});
