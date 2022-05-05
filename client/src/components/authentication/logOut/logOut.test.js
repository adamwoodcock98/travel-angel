import '@testing-library/jest-dom'
import * as React from 'react'
import {render, screen} from '@testing-library/react'
import { LogOut } from './logOut'

test('shows a clickable text', async () => {
  const text = 'Log Out'
  render(<LogOut />)
  expect(screen.getByText(text)).toBeInTheDocument()
})