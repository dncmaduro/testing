describe('Login Test', () => {
  beforeEach(() => {
    // Xóa key trên localStorage trước khi đăng nhập
    window.localStorage.removeItem('chat-app-current-user');
  });

  it('should login with valid credentials and display the username', () => {
    // Truy cập trang đăng nhập
    cy.visit('http://localhost:3000/login');

    // Nhập thông tin đăng nhập
    cy.get('input[name=username]').type('maduro');
    cy.get('input[name=password]').type('$gunnyhades9$');

    // Nhấn nút đăng nhập
    cy.get('button[type=submit]').click();

    // Kiểm tra xem người dùng có được chuyển hướng đến trang chủ không
    cy.url().should('include', 'http://localhost:3000');

    // Kiểm tra xem tên người dùng có được hiển thị đúng cách không
    cy.get('.username > h2').should('have.text', 'maduro');
  });
});
