import React from 'react'
import Register from './Register'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { mount } from '@cypress/react'

describe('<Register />', () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it('renders', () => {
    mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
  })

  it('initial states', () => {
    // render(
    //   <MemoryRouter>
    //     <Register />
    //   </MemoryRouter>
    // );

    // Kiểm tra trạng thái ban đầu của các trường input
    expect(screen.getByPlaceholderText('Username')).to.have.value('');
    expect(screen.getByPlaceholderText('Email')).to.have.value('');
    expect(screen.getByPlaceholderText('Password')).to.have.value('');
    expect(screen.getByPlaceholderText('Confirm Password')).to.have.value('');
  });

  it('should show error when password and confirm password are not the same', () => {
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('differentPassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Password and confirm password should be same.').should('be.visible');
  });

  it('should show error when username is less than 3 characters', () => {
    cy.get('input[name="username"]').type('ab');
    cy.get('button[type="submit"]').click();
    cy.contains('Username should be greater than 3 characters.').should('be.visible');
  });

  it('should show error when password is less than 8 characters', () => {
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="password"]').type('passwor');
    cy.get('input[name="confirmPassword"]').type('passwor');
    cy.get('button[type="submit"]').click();
    cy.contains('Password should be equal or greater than 8 characters.').should('be.visible');
  });

  it('should show error when email is invalid', () => {
    cy.get('input[name="username"]').type('username');
    cy.get('input[name="email"]').type('notAnEmail');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
    cy.get('button[type="submit"]').click();
    cy.contains('Email is invalid.').should('be.visible');
  });
  
  it('should submit the form with valid values', () => {
    const timestamp = Date.now()

    cy.get('input[name="username"]').type(`usernameTest${timestamp}`);
    cy.get('input[name="email"]').type(`emailTest${timestamp}@example.com`);
    cy.get('input[name="password"]').type('$gunnyhades9$');
    cy.get('input[name="confirmPassword"]').type('$gunnyhades9$');
    cy.get('button[type="submit"]').click();
    cy.contains('Registration successful!').should('be.visible')
  });

  it('should show error when email is duplicated', () => {
    const timestamp = Date.now()

    cy.get('input[name="username"]').type(`maduro`);
    cy.get('input[name="email"]').type(`emailTest${timestamp}@example.com`);
    cy.get('input[name="password"]').type('$gunnyhades9$');
    cy.get('input[name="confirmPassword"]').type('$gunnyhades9$');
    cy.get('button[type="submit"]').click();
    cy.contains('Username already used!').should('be.visible')
  })

  it('should show error when email is duplicated', () => {
    const timestamp = Date.now()
    
    cy.get('input[name="username"]').type(`usernameTest${timestamp}`);
    cy.get('input[name="email"]').type(`manhdungtran.vnuuet@gmail.com`);
    cy.get('input[name="password"]').type('$gunnyhades9$');
    cy.get('input[name="confirmPassword"]').type('$gunnyhades9$');
    cy.get('button[type="submit"]').click();
    cy.contains('Email already used!').should('be.visible')
  })
});
