import '@testing-library/jest-dom'
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { LogOut } from './logOut'

test('log out', () => {
  const text = 'Log Out'
  render(<LogOut />)
  expect(screen.getByText(text)).toBeInTheDocument()
})