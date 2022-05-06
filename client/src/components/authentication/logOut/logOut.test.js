import '@testing-library/jest-dom'
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { LogOut } from './logOut'

test('log out', () => {
  render(<LogOut />)

  const logOut = 'Log Out'
  expect(screen.getByText(logOut)).toBeInTheDocument()
})