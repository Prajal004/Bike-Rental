import React, { useState } from 'react';

export const SOSContacts = () => {
  const [contacts, setContacts] = useState([{ name: '', phone: '', relation: '' }]);

  const addContact = () => {
    if (contacts.length < 5) setContacts([...contacts, { name: '', phone: '', relation: '' }]);
  };

  const updateContact = (index, field, value) => {
    const newContacts = [...contacts];
    newContacts[index][field] = value;
    setContacts(newContacts);
  };

  return (
    <div className="sos-contacts">
      <h4>Emergency Contacts</h4>
      <p className="contacts-sub">These contacts will be notified</p>
      {contacts.map((contact, index) => (
        <div key={index} className="contact-card">
          <input type="text" placeholder="Name" value={contact.name} onChange={(e) => updateContact(index, 'name', e.target.value)} className="input-field" />
          <input type="tel" placeholder="Phone" value={contact.phone} onChange={(e) => updateContact(index, 'phone', e.target.value)} className="input-field" />
          <input type="text" placeholder="Relation" value={contact.relation} onChange={(e) => updateContact(index, 'relation', e.target.value)} className="input-field" />
        </div>
      ))}
      <button className="add-contact" onClick={addContact}>+ Add Contact</button>
      <button className="save-contacts" onClick={() => alert('Contacts saved!')}>Save Contacts</button>
    </div>
  );
};