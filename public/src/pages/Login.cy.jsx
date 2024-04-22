import React from 'react'
import Login from './Login'
import { BrowserRouter } from 'react-router-dom'

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
  })
})
