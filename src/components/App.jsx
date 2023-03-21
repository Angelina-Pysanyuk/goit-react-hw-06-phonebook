import { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const find = contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
    if (find) {
      Notiflix.Notify.info(`${data.name} is already in contacts`);
      return;
    }

    setContacts([...contacts, data]);
  };

  const changeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const handleDelete = idDelete => {
    setContacts([...contacts.filter(({ id }) => id !== idDelete)]);
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
        fontSize: 22,
        color: 'rgb(139, 126, 116)',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>

      <Filter filter={changeFilter} />
      <ContactList
        getFilteredContacts={getFilteredContacts}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
