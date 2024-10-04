import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders the DroneDeploy Challenge header', () => {
  render(<App />);
  const expectedHeader = screen.getByText(/DroneDeploy Challenge/i);
  expect(expectedHeader).toBeInTheDocument();
});

test('handles form submission', async () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/Ask a question:/i);
  const buttonElement = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(inputElement, { target: { value: 'What is the altitude of the second image?' } });

  fireEvent.click(buttonElement);
  //check if the input field cleared after sending the request to backend
  await waitFor(() => {
    expect(inputElement.value).toBe('');
  });
});

