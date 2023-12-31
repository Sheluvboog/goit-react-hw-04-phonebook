import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const CONTACTS = 'contacts';


const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts
  )
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addContact = ({ name, number }) => {
  if (
    contacts.some(
      (value) => value.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    alert(`${name} is already in contacts`);
  } else {
    setContacts((prevContacts) => [
      ...prevContacts,
      { id: nanoid(), name, number }
    ]);
  }
};

  const filterFu = () => {
    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };

  const delContact = id => {
    const filtred = contacts.filter(item => item.id !== id);
    setContacts(filtred);
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />{' '}
      <h2>Contacts</h2>{' '}

      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} onChangeInput={onChangeInput} />
          <ContactList delContact={delContact} contacts={filterFu()} />
        </>
      ) : (
        <p>No contacts yet.</p>
      )}

    </div>
  );
};
