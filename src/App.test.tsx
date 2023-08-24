import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders without error', () => {
  render(<App />);
});

test('handles encoded string change correctly', () => {
  render(<App />);
    const inputElement = screen.getByRole('textbox', { name: 'Encoded String' }) as HTMLInputElement;

  // Simulate entering a value in the input field
  fireEvent.change(inputElement, { target: { value: '123456' } });

  expect(inputElement.value).toBe('123456');
});

test('handles button click correctly', () => {
  render(<App />);
    const inputElement = screen.getByRole('textbox', { name: 'Encoded String' }) as HTMLInputElement;
  const buttonElement = screen.getByTestId('decode-button');

  // Simulate entering a value in the input field
  fireEvent.change(inputElement, { target: { value: 'Robert000Smith000123' } });

  // Simulate clicking the button
  fireEvent.click(buttonElement);

  // Check if the decodeList table is updated with the decoded value
  const decodeTableRow = screen.getByText('{"first_name":"Robert","last_name":"Smith","id":"123"}');
  expect(decodeTableRow).toBeInTheDocument();
});

test('displays error message when decoding fails', () => {
  render(<App />);

  // Get the input field and submit button
  const inputElement = screen.getByRole('textbox', { name: 'Encoded String' }) as HTMLInputElement;
  const decodeButton = screen.getByText('Decode');

  // Type an invalid encoded string into the input field
  fireEvent.change(inputElement, { target: { value: 'invalid' } });

  // Click the decode button
  fireEvent.click(decodeButton);

  // Check if the error message is displayed
  expect(screen.getByText(/Invalid encoded string format/i)).toBeInTheDocument();
});
