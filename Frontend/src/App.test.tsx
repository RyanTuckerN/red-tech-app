import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home text', () => {
  render(<App />);
  const homeText = screen.getByText(/home/i);
  expect(homeText).toBeInTheDocument();
});