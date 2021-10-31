import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import './Forms.scss';

function Form({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handlerSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    addContact(newContact);
    reset();
  };

  return (
    <form onSubmit={handlerSubmit} className="form">
      <div className="wrapper">
        <label className="label">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            className="input"
            onChange={handlerChange}
            autoComplete="off"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label htmlFor="number" className="label">
          Number
          <input
            id="number"
            type="tel"
            name="number"
            value={number}
            className="input"
            autoComplete="off"
            onChange={handlerChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
      </div>
      <button type="submit" className="btn">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default Form;
