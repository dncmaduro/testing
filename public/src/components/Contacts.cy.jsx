import React from 'react';
import { mount } from '@cypress/react';
import Contacts from './Contacts';

import fakeContacts from '../utils/FakeUser.json'
import fakeLocal from '../utils/FakeLocal.json'
describe('<Contacts />', () => {

  beforeEach(() => {
    window.localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(fakeLocal)
    );
    mount(<Contacts contacts={fakeContacts} changeChat={() => {}} />);
  });

  it('renders', () => {

    mount(<Contacts contacts={fakeContacts} changeChat={() => {}} />);
  });

  it('should not have any contact selected initially', () => {
    // Kiểm tra xem không có liên hệ nào có class 'selected'
    cy.get('.contact.selected').should('not.exist');
  });

  it('should select a contact when clicked', () => {
    cy.get('[data-id="6626952a89778c8e2dc2ecda"]').click();
    cy.get('[data-id="6626952a89778c8e2dc2ecda"]').should('have.class', 'selected');
    cy.get('[data-id="6626952a89778c8e2dc2ecd8"]').click();
    cy.get('[data-id="6626952a89778c8e2dc2ecd8"]').should('have.class', 'selected');
  });
});
