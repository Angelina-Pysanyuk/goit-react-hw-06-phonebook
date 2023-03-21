import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import { DeleteButton } from './Contact.styled';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <>
      {contact.name}: {contact.number}
      <DeleteButton
        onClick={() => {
          dispatch(deleteContact(contact.id));
        }}
        type="button"
      >
        Delete
      </DeleteButton>
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.object,
};

export default Contact;
