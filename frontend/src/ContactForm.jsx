import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
const [firstName, setFirstName] = useState(existingContact.firstName || "");
const [lastName, setLastName] = useState(existingContact.lastName || "");
const [email, setEmail] = useState(existingContact.email || "");

const updating = Object.entries(existingContact).length !== 0;

const onSubmit = async (e) => {
e.preventDefault();

const data = { firstName, lastName, email };
const url =
  "http://127.0.0.1:5000/" +
  (updating ? `update_contact/${existingContact.id}` : "create_contact");
const options = {
  method: updating ? "PATCH" : "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
};

const response = await fetch(url, options);
if (response.status !== 201 && response.status !== 200) {
  const data = await response.json();
  alert(data.message);
} else {
  updateCallback();
  setFirstName("");
  setLastName("");
  setEmail("");
}


};

return ( <div className="flex justify-center mt-10 px-4"> <form
     onSubmit={onSubmit}
     className="bg-white shadow-lg rounded-xl p-8 w-full sm:w-2/3 md:w-1/2 space-y-6"
   > <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
{updating ? "Update Contact" : "Create Contact"} </h2>

    <div className="flex flex-col">
      <label htmlFor="firstName" className="mb-2 font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="lastName" className="mb-2 font-medium text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="email" className="mb-2 font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 hover:bg-blue-700 transition-colors"
    >
      {updating ? "Update Contact" : "Create Contact"}
    </button>
  </form>
</div>

);
};

export default ContactForm;
