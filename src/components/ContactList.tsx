import { Contact } from '../types/contact';
import ContactCard from './ContactCard';

interface ContactListProps {
  contacts: Contact[];
  deleteContact: (id: string) => void;
}

const ContactList = ({ contacts, deleteContact }: ContactListProps) => {
  // Sort contacts alphabetically by name
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  if (sortedContacts.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg text-center">
        <p className="text-gray-600">No contacts found. Add your first emergency contact above.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedContacts.map((contact) => (
        <ContactCard 
          key={contact.id} 
          contact={contact} 
          deleteContact={deleteContact} 
        />
      ))}
    </div>
  );
};

export default ContactList;