describe("E2E Test - Login and Chat", () => {
  const validUser = {
    username: "maduro",
    password: "$gunnyhades9$",
  };

  beforeEach(() => {
    // Xóa dữ liệu cũ trong local storage
    cy.window().then((win) => {
      win.localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    });

    cy.visit("/login");
  });

  afterEach(() => {
    cy.wait(2000); // Chờ 2 giây sau mỗi khối it
  });

  it("should login and navigate to the chat page", () => {
    // Đăng nhập với thông tin hợp lệ
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");

    cy.get(".contacts .contact").first().click(); // Chọn liên hệ đầu tiên

    // Kiểm tra rằng `chatInput` xuất hiện
    cy.get(".input-container").should("be.visible"); // Xác nhận `chatInput` hiển thị

    // Bước 3: Gửi tin nhắn qua `chatInput`
    cy.get('.input-container input[type="text"]').type('Hello, World!'); // Nhập tin nhắn
    cy.get('.input-container button[type="submit"]').click(); // Nhấn nút "Send"
    cy.contains('Hello, World!').should('be.visible');

    // Kiểm tra rằng tin nhắn được hiển thị trong `chatContainer`
    cy.contains("Hello, World!").should("be.visible");
  });

  it("logout and navigate to login", () => {
    // Đăng nhập với thông tin hợp lệ
    cy.get('input[name="username"]').type(validUser.username);
    cy.get('input[name="password"]').type(validUser.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/");
    
    // Chọn một liên hệ 
    cy.get('.contacts .contact').first().click(); // Chọn liên hệ đầu tiên

    // Kiểm tra nút "Logout" hiển thị và nhấp vào nó
    cy.get('.chat-header button').should('be.visible');
    cy.get('.chat-header button').click(); 

    // Kiểm tra rằng local storage đã được xóa
    cy.window().then((win) => {
      const userData = win.localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      expect(userData).to.be.null; // Đảm bảo local storage đã được xóa
    });
  });
});
