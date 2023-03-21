import { useState } from 'react';
import { nanoid } from 'nanoid';

import {
  FormWrapper,
  Form,
  ButtonWrapper,
  ButtonAdd,
  Label,
  FormInput,
} from './ContactForm.styled';

const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({ name: '', number: '' });

  const handleChange = event => {
    setContact({
      ...contact,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newState = { ...contact, id: nanoid() };
    onSubmit(newState);

    reset();
  };

  const reset = () => {
    setContact({ name: '', number: '' });
  };

  const inputId = nanoid();

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor={inputId}>Name</Label>
          <FormInput
            type="text"
            id={inputId}
            value={contact.name}
            onChange={handleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <br />
          <Label htmlFor={inputId}>Number</Label>
          <FormInput
            type="tel"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={inputId}
            value={contact.number}
            onChange={handleChange}
            name="number"
          />
        </div>

        <ButtonWrapper>
          <ButtonAdd type="submit">Add contact</ButtonAdd>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
};
export default ContactForm;