import React from 'react'
import Register from './Register'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { mount } from '@cypress/react'

describe('<Register />', () => {
  it('renders', () => {
    mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
  })

  it('initial states', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Kiểm tra trạng thái ban đầu của các trường input
    expect(screen.getByPlaceholderText('Username')).to.have.value('');
    expect(screen.getByPlaceholderText('Email')).to.have.value('');
    expect(screen.getByPlaceholderText('Password')).to.have.value('');
    expect(screen.getByPlaceholderText('Confirm Password')).to.have.value('');
  });
});
