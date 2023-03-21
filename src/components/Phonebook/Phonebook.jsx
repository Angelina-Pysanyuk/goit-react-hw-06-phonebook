import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import {
  FormWrapper,
  StyledForm,
  StyledInput,
  ButtonWrapper,
  Label,
  StyledBtn,
} from './Phonebook.styled';
import { addContact } from 'redux/contactSlice';
import { useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';

const Phonebook = ({ onRemoveContact, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleInput = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        console.log('error');
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    const isExist = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      Notiflix.Notify.info('This contact already exists');
      return;
    }

    dispatch(addContact(contact));
    setName('');
    setNumber('');
  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <Label htmlFor="">
          <span>Name</span>
          <StyledInput
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleInput}
            required
          />
        </Label>
        <Label htmlFor="">
          <span>Number</span>
          <StyledInput
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleInput}
            required
          />
        </Label>
        <ButtonWrapper>
          <StyledBtn type="submit">Add contact</StyledBtn>
        </ButtonWrapper>
      </StyledForm>
    </FormWrapper>
  );
};

Phonebook.propTypes = {
  onAddContact: PropTypes.func,
  onRemoveContact: PropTypes.func,
};

export default Phonebook;
