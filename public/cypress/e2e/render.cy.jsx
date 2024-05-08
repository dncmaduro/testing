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

    const newMessage = 'adu anh seng';

    // Nhập tin nhắn mới vào ô chat và gửi
    cy.get('input[type="text"]').type(newMessage);
    cy.get('button[type=submit]').click();

    // Kiểm tra giao diện người dùng hiển thị tin nhắn mới
    cy.contains('.message', newMessage).should('be.visible');

    //out chat (sau khi đã lựa chọn 1 đoạn chat)
    cy.get('button.sc-dkPtRN.eMpPaY').click();

    //Kiểm tra xem người dùng có được chuyển hướng đến trang đăng nhập không
    cy.url().should('include', 'http://localhost:3000/login');

    cy.get('input[name=username]').type('Banana');
    cy.get('input[name=password]').type('abcd1234');

    // Nhấn nút đăng nhập
    cy.get('button[type=submit]').click();
    //  Chọn đối tượng chat
    cy.get('[data-id="663a876f2d5d7b5c76e6cf17"]').click();
    cy.get('[data-id="663a876f2d5d7b5c76e6cf17"]').should('have.class', 'contact selected')

    // Kiểm tra giao diện người dùng hiển thị tin nhắn mới
    cy.contains('.message', newMessage).should('be.visible');
  });
})