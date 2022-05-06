import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Authentication } from './authentication'

test('sign up', () => {
  render(<Authentication />)

  const signUp = 'Sign Up'
  const newValue = 'New value'

  expect(screen.getByText(signUp)).toBeInTheDocument()

  fireEvent.click(screen.getByText(signUp))

  expect(screen.getByRole('heading', {name: signUp})).toBeInTheDocument()
  expect(screen.getByRole('dialog', {name: signUp})).toBeInTheDocument()

  const inputFirstName = screen.getByRole('textbox', {name: 'First Name'})
  expect(inputFirstName).toBeInTheDocument()
  fireEvent.change(inputFirstName, { target: { value: newValue }});
  expect(inputFirstName.value).toBe(newValue);

  const inputLastName = screen.getByRole('textbox', {name: 'Last Name'})
  expect(inputLastName).toBeInTheDocument()
  fireEvent.change(inputLastName, { target: { value: newValue }});
  expect(inputLastName.value).toBe(newValue);

  const inputEmail = screen.getByRole('textbox', {name: 'Email Address'})
  expect(inputEmail).toBeInTheDocument()
  fireEvent.change(inputEmail, { target: { value: newValue }});
  expect(inputEmail.value).toBe(newValue);

  const inputPassword = screen.getByLabelText(/password/i)
  expect(inputPassword).toBeInTheDocument()
  fireEvent.change(inputPassword, { target: { value: newValue }});
  expect(inputPassword.value).toBe(newValue);

  expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: signUp})).toBeInTheDocument()
})

test('log in', () => {
  render(<Authentication />)

  const logIn = 'Log In'
  const newValue = 'New value'

  expect(screen.getByText(logIn)).toBeInTheDocument()

  fireEvent.click(screen.getByText(logIn))

  expect(screen.getByRole('heading', {name: logIn})).toBeInTheDocument()
  expect(screen.getByRole('dialog', {name: logIn})).toBeInTheDocument()

  const inputEmail = screen.getByRole('textbox', { name: 'E-mail' })
  expect(inputEmail).toBeInTheDocument()
  fireEvent.change(inputEmail, { target: { value: newValue }});
  expect(inputEmail.value).toBe(newValue);


  const inputPassword = screen.getByLabelText(/password/i)
  expect(inputPassword).toBeInTheDocument()
  fireEvent.change(inputPassword, { target: { value: newValue }});
  expect(inputPassword.value).toBe(newValue);

  expect(screen.getByRole('button', {name: 'Cancel'})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: logIn})).toBeInTheDocument()
})

