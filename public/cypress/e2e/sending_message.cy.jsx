describe('template spec', () => {
  it('confirms UI receives new user message in Snappy - Chat Application', () => {
    cy.visit('http://localhost:3000/login');

    // Nhập thông tin đăng nhập
    cy.get('input[name=username]').type('Potato');
    cy.get('input[name=password]').type('abcd1234');

    // Nhấn nút đăng nhập
    cy.get('button[type=submit]').click();
    //  Chọn đối tượng chat
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').click();
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').should('have.class', 'contact selected')

    const newMessage = 'Hello, this is a new message.';

    // Nhập tin nhắn mới vào ô chat và gửi
    cy.get('input[type="text"]').type(newMessage);
    cy.get('button[type=submit]').click();

    // Kiểm tra giao diện người dùng hiển thị tin nhắn mới
    cy.contains('.message', newMessage).should('be.not.visible');
  });
})