import React from 'react';
import { mount } from '@cypress/react';
import Welcome from './Welcome';

import fakeLocal from '../utils/FakeLocal.json'

describe('<Welcome />', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(fakeLocal)
    );
  });

  it('renders', () => {
    mount(<Welcome />);
    cy.get('h1').should('contain', `Welcome, ${fakeLocal.username}!`);
    cy.get('h3').should('contain', 'Please select a chat to Start messaging.');
  });
});
