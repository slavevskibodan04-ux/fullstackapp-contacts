import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (

    <div className="py-2  bg-gray-100">

      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
<div className="text-center">
        <button onClick={openCreateModal} className="bg-red-500 px-5 rounded-2xl mb-5 py-2 text-white ">Create New Contact</button>
  </div>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <h1 className="text-red-400 bg-red-400">nesto</h1>
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </div>

  );
}

export default App;
