import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the habit tracker by default', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: /habit tracker/i })).toBeInTheDocument();
  expect(screen.getByText(/bezan bere/i)).toBeInTheDocument();
});
