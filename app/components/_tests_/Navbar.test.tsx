import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the Navbar component', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})

