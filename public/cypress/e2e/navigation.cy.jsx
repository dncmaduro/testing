describe('template spec', () => {
  it('shows the message', () => {
    cy.visit('/login');

    // Nhập thông tin đăng nhập
    cy.get('input[name=username]').type('Potato');
    cy.get('input[name=password]').type('abcd1234');

    // Nhấn nút đăng nhập
    cy.get('button[type=submit]').click();

    //Kiểm tra scroll bar
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').scrollIntoView()
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').scrollIntoView().should('be.visible')

    //Kiểm tra người dùng chọn người muốn gửi tin
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').click();
    cy.get('[data-id="663a99072d5d7b5c76e6cf2c"]').should('have.class', 'contact selected')

    // Lăn scrollbar đến vị trí người khác
    cy.get('[data-id="66310606263f1ee87357e1ae"]').scrollIntoView()
    cy.get('[data-id="66310606263f1ee87357e1ae"]').scrollIntoView().should('be.visible')

    //Kiểm tra người dùng chọn người muốn gửi tin
    cy.get('[data-id="66310606263f1ee87357e1ae"]').click();
    cy.get('[data-id="66310606263f1ee87357e1ae"]').should('have.class', 'contact selected')

    //out chat (sau khi đã lựa chọn 1 đoạn chat)
    cy.get('button.sc-dkPtRN.eMpPaY').click()

    // Kiểm tra xem người dùng có được chuyển hướng đến trang đăng nhập không
    cy.url().should('include', 'http://localhost:3000/login');
  })
})