import ContactList from './ContactList/ContactList';
import Phonebook from './Phonebook/Phonebook';
import Filter from './Filter/Filter';
import { getContacts } from 'redux/selectors';
import { useSelector } from 'react-redux';

const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <div
      style={{
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '50px',
        fontSize: 22,
        color: 'rgb(139, 126, 116)',
      }}
    >
      <h2>Phonebook</h2>
      <Phonebook />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
