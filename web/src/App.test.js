import { render, screen } from '@testing-library/react';
import { App } from './components/app';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quizzz/i);
  expect(linkElement).toBeInTheDocument();
});
