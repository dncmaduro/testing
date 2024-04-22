import React from 'react'
import Login from './Login'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(<Login />, {
      // Cung cấp Router context
      routes: [
        {
          path: '/login',
          component: <Login />
        }
      ]
    })
  })
})