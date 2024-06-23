// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Assuming App is your main component

test('test that App component renders Task', () => {
    render(<App />);

   
    const inputTask = screen.getByLabelText('Add New Item');
    const inputDate = screen.getByPlaceholderText('mm/dd/yyyy');
    const addButton = screen.getByRole('button', { name: 'Add' });

    const taskName = 'History Test';
    const dueDate = '05/30/2023';

    fireEvent.change(inputTask, { target: { value: taskName } });
    fireEvent.change(inputDate, { target: { value: dueDate } });
    fireEvent.click(addButton);

   
    const checkTask = screen.getByText(taskName, { exact: false });
    const checkDueDate = screen.getByText(new RegExp(dueDate, 'i'));

    expect(checkTask).toBeInTheDocument();
    expect(checkDueDate).toBeInTheDocument();
});
//for commit