import { useState } from 'react';
import { Contact, MessageState } from '../types/contact';

interface ContactFormProps {
  addContact: (contact: Contact) => void;
  setMessage: (message: MessageState) => void;
}

const ContactForm = ({ addContact, setMessage }: ContactFormProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alternativeContact, setAlternativeContact] = useState('');
  const [relationship, setRelationship] = useState('');
  const [expertise, setExpertise] = useState('');

  const validatePhoneNumber = (number: string) => {
    // Allow Indian phone numbers and landlines with optional +91 prefix
    const phoneRegex = /^(\+91[\s-]?)?[0-9\s-]{6,15}$/;
    return phoneRegex.test(number.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage({ text: 'Please enter a name', type: 'error' });
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage({ text: 'Please enter a valid Indian phone number', type: 'error' });
      return;
    }

    if (alternativeContact && !validatePhoneNumber(alternativeContact)) {
      setMessage({ text: 'Please enter a valid alternative contact number', type: 'error' });
      return;
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      alternativeContact: alternativeContact.trim() || undefined,
      relationship: relationship.trim() || 'Personal Contact',
      expertise: expertise.trim() || undefined,
      isPriority: false,
      isEmergencyService: false
    };

    addContact(newContact);

    setName('');
    setPhoneNumber('');
    setAlternativeContact('');
    setRelationship('');
    setExpertise('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 animate-fade-in"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="John Doe"
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="+91 98765 43210"
          autoComplete="off"
        />
        <p className="text-xs text-gray-500 mt-1">Enter Indian phone number with optional +91 prefix</p>
      </div>

      <div className="mb-4">
        <label htmlFor="alternativeContact" className="block font-medium text-gray-700 mb-1">
          Alternative Contact
        </label>
        <input
          type="tel"
          id="alternativeContact"
          value={alternativeContact}
          onChange={(e) => setAlternativeContact(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="+91 98765 43210"
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="relationship" className="block font-medium text-gray-700 mb-1">
          Relationship
        </label>
        <input
          type="text"
          id="relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="Family, Friend, Doctor..."
          autoComplete="off"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="expertise" className="block font-medium text-gray-700 mb-1">
          Expertise/Notes
        </label>
        <input
          type="text"
          id="expertise"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          placeholder="Medical Specialty, Special Instructions..."
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Save Contact
      </button>
    </form>
  );
};

export default ContactForm;