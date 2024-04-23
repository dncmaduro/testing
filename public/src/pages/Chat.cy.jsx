import React from 'react'
import Chat from './Chat'
import { mount } from "@cypress/react"
import { BrowserRouter } from 'react-router-dom'

describe('<Chat />', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
  });

  it('renders', () => {
    mount(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    )
  })
})