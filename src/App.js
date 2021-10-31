import './App.css';
import { useState } from 'react';
import Form from './components/Forms/Form';
import UserList from './components/UserList/UsersList';
import Section from './components/Section/Section';
import Filter from './components/Forms/Filter';
import useLocalStorage from './components/hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContactToList = newContact => {
    const newContactName = newContact.name.toLowerCase();
    const doubleContact = contacts.find(
      contact => contact.name.toLowerCase() === newContactName,
    );
    if (doubleContact) {
      alert(`${newContact.name} is already in contact`);
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const handleFilterContacts = e => {
    const filterValue = e.target.value;
    setFilter(filterValue);
  };

  const handlerDeleteUser = ({ target }) => {
    const deleteItemId = target.id;
    const withoutContact = contacts.filter(
      contact => contact.id !== deleteItemId,
    );
    setContacts([...withoutContact]);
  };

  const normalizedName = filter.toLowerCase();
  const contactForRender = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedName),
  );

  return (
    <div className="App">
      <h1 className="title">Phonebook</h1>
      <Section>
        <Form addContact={addContactToList} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filter} handleFilter={handleFilterContacts} />
        <UserList users={contactForRender} onClick={handlerDeleteUser} />
      </Section>
    </div>
  );
}

export default App;
