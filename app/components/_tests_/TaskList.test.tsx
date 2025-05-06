import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import TaskList from '../TaskList'

describe('TaskList', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            tasks: [
              {
                _id: '1',
                description: 'Mock Task 1',
                client: 'Client A',
                date: '2024-01-01',
                billable: true,
              },
              {
                _id: '2',
                description: 'Mock Task 2',
                client: 'Client B',
                date: '2024-01-02',
                billable: false,
              },
            ],
          }),
      })
    ) as unknown as typeof fetch
  })

  it('renders a list of tasks', async () => {
    render(<TaskList />)

    await waitFor(() => {
      expect(screen.getByText('Mock Task 1')).toBeInTheDocument()
      expect(screen.getByText('Mock Task 2')).toBeInTheDocument()
    })
  })
})

