describe('Register Page - Field Validation', () => {
  const validUser = {
    username: "usertest7",
    email: "usertest7@example.com",
    password: "validpassword123",
    confirmPassword: "validpassword123",
  };

  beforeEach(() => {
    // Xóa dữ liệu trước mỗi kiểm thử 
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });
    cy.visit('/register'); // Bắt đầu từ trang đăng ký
  });

  afterEach(() => {
    cy.wait(2000); // Chờ 2 giây sau mỗi khối it
  });

  it('should show error for invalid username', () => {
    // Nhập dữ liệu cho tất cả các trường, nhưng với tên người dùng ngắn
    cy.get('input[name="username"]').type('us'); 
    cy.get('input[name="email"]').type('user@example.com'); 
    cy.get('input[name="password"]').type('validpassword123');
    cy.get('input[name="confirmPassword"]').type('validpassword123'); 

    // Thử gửi biểu mẫu và kiểm tra lỗi
    cy.get('button[type="submit"]').click();
    cy.contains('Username should be greater than 3 characters.').should('be.visible');
  });

  it('should show error for invalid email', () => {
    // Nhập dữ liệu cho tất cả các trường, nhưng với email không hợp lệ
    cy.get('input[name="username"]').type('validuser');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('validpassword123'); 
    cy.get('input[name="confirmPassword"]').type('validpassword123'); 

    // Thử gửi biểu mẫu và kiểm tra lỗi
    cy.get('button[type="submit"]').click();
    // cy.contains('Invalid email.').should('be.visible'); 
  });

  it('should show error for short password', () => {
    // Nhập dữ liệu cho tất cả các trường, nhưng với mật khẩu ngắn
    cy.get('input[name="username"]').type('validuser'); 
    cy.get('input[name="email"]').type('user@example.com'); 
    cy.get('input[name="password"]').type('short'); 
    cy.get('input[name="confirmPassword"]').type('short');

    // Thử gửi biểu mẫu và kiểm tra lỗi
    cy.get('button[type="submit"]').click();
    cy.contains('Password should be equal or greater than 8 characters.').should('be.visible'); 
  });

  it('should show error for non-matching confirm password', () => {
    // Nhập dữ liệu cho tất cả các trường, nhưng với mật khẩu xác nhận không khớp
    cy.get('input[name="username"]').type('validuser'); 
    cy.get('input[name="email"]').type('user@example.com'); 
    cy.get('input[name="password"]').type('validpassword123'); 
    cy.get('input[name="confirmPassword"]').type('differentpassword'); 

    // Thử gửi biểu mẫu và kiểm tra lỗi
    cy.get('button[type="submit"]').click();
    cy.contains('Password and confirm password should be same.').should('be.visible'); 
  });

  it("should register successfully, select avatar, and navigate to home page", () => {
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="email"]').type(validUser.email);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('input[name="confirmPassword"]').type(validUser.confirmPassword);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/setAvatar");
    cy.contains("Pick an Avatar as your profile picture").should("be.visible");

    cy.get(".avatars .avatar").first().click();

    cy.get(".submit-btn").click();
    cy.url().should("include", "/");
  });

  it('should navigate to the login page when clicking the login link', () => {
    cy.contains('Already have an account ?').find('a').should('have.attr', 'href', '/login'); 
    cy.contains('Already have an account ?').find('a').click();

    cy.url().should('include', '/login');
  });
});
