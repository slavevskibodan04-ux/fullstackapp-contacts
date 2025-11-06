import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
const onDelete = async (id) => {
try {
const options = { method: "DELETE" };
const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
if (response.status === 200) {
updateCallback();
} else {
console.error("Failed to delete");
}
} catch (error) {
alert(error);
}
};

return ( <div className="min-h-screen  py-10 px-4">
<h2 className="text-center text-5xl font-bold py-6 rounded-b-3xl bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full sm:w-2/3 mx-auto shadow-lg">
Contacts </h2>


  <div className="hidden sm:grid sm:grid-cols-4 gap-4 text-gray-700 font-semibold border-b-2 pb-2 w-full sm:w-2/3 mx-auto mt-10">
    <span>First Name</span>
    <span>Last Name</span>
    <span>Email</span>
    <span>Actions</span>
  </div>



  <div className="w-full sm:w-2/3 mx-auto mt-6 space-y-4">
    {contacts.length > 0 ? (
      contacts.map((contact) => (
        <div
          key={contact.id}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <p className="font-medium text-gray-800">{contact.firstName}</p>
          <p className="font-medium text-gray-800">{contact.lastName}</p>
          <p className="text-gray-600">{contact.email}</p>
          <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
            <button
              onClick={() => updateContact(contact)}
              className="px-3 py-2 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-colors w-full sm:w-auto"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 mt-10 text-lg">No contacts available.</p>
    )}
  </div>
</div>

);
};

export default ContactList;
