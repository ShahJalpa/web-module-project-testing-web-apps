import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render (<ContactForm />)
});

test('renders the contact form header', ()=> {
    render (<ContactForm />) //arrange: it is rendering our Component Contactform

    const header = screen.queryByText(/contact form/i); //access: it accessing the header on contact form

    expect(header).toBeInTheDocument(); //assert: header should be exist on the screen
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm />) 

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Jalp');
    console.log(firstNameInput.value);
    
    const error = screen.getByTestId(/error/i)
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button")

    userEvent.click(submitButton);

    const error = screen.getAllByTestId(/error/i);

    await expect(error).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Jalpa');
    
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Shah');

    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton);

    const error = screen.getAllByTestId(/error/i);
    await expect(error).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, 'Jalpa');
    
    const lastNameInput = screen.getByLabelText(/last name/i);
    userEvent.type(lastNameInput, 'Shah');
    
    const validEmail = screen.getByLabelText(/email/i);
    userEvent.type(validEmail, "jalpa454@.com");

    //const error = screen.getByTestId(/error/i);
    const error = screen.queryByText(/must be a valid email address/i);
    //expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});