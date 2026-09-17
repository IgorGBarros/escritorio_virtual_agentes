import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders virtual office', () => {
  render(<App />);
  // The VirtualOffice component should render without errors
  expect(screen.getByTestId('virtual-office') || document.querySelector('.virtual-office')).toBeInTheDocument();
});
