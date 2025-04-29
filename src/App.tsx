import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Contact } from './types/contact';
import SearchBar from './components/SearchBar';

// Default emergency contacts for India
const defaultContacts: Contact[] = [
  {
    id: 'police',
    name: 'Police Emergency',
    phoneNumber: '100',
    relationship: 'Emergency Services',
    isPriority: true,
    isEmergencyService: true
  },
  {
    id: 'ambulance',
    name: 'Ambulance Services',
    phoneNumber: '102',
    relationship: 'Emergency Services',
    isPriority: true,
    isEmergencyService: true
  },
  {
    id: 'fire',
    name: 'Fire Department',
    phoneNumber: '101',
    relationship: 'Emergency Services',
    isPriority: true,
    isEmergencyService: true
  },
  {
    id: 'national-emergency',
    name: 'National Emergency Hotline',
    phoneNumber: '112',
    relationship: 'Emergency Services',
    isPriority: true,
    isEmergencyService: true
  },
  {
    id: 'poison-control',
    name: 'Poison Control Center',
    phoneNumber: '011-26593677',
    alternativeContact: '011-26589391',
    relationship: 'Emergency Services',
    isPriority: true,
    isEmergencyService: true
  },
  {
    id: 'primary-family',
    name: 'Mr. Rajesh Sharma',
    phoneNumber: '+91 98765 43210',
    relationship: 'Primary Family Contact',
    isPriority: true
  },
  {
    id: 'secondary-family',
    name: 'Mrs. Anjali Sharma',
    phoneNumber: '+91 91234 56789',
    relationship: 'Secondary Family Contact',
    isPriority: true
  },
  {
    id: 'family-doctor',
    name: 'Dr. Meera Iyer',
    phoneNumber: '+91 99887 77665',
    relationship: 'Family Physician',
    expertise: 'General Medicine',
    isPriority: true
  },
  {
    id: 'neighbor',
    name: 'Mr. Vinod Menon',
    phoneNumber: '+91 98123 45678',
    relationship: 'Trusted Neighbor',
    isPriority: true
  }
];

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Load contacts from localStorage on initial render
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts && JSON.parse(storedContacts).length > 0) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(defaultContacts);
      localStorage.setItem('contacts', JSON.stringify(defaultContacts));
    }
  }, []);
  

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
    setMessage({ text: 'Contact added successfully!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const deleteContact = (id: string) => {
    // Prevent deletion of emergency service contacts
    const contact = contacts.find(c => c.id === id);
    if (contact?.isEmergencyService) {
      setMessage({ text: 'Emergency service contacts cannot be deleted', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return;
    }
    
    setContacts(contacts.filter(contact => contact.id !== id));
    setMessage({ text: 'Contact deleted successfully!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery) ||
    (contact.alternativeContact && contact.alternativeContact.includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center">
          <Phone className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">QuickContacts</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {message.text && (
          <div 
            className={`mb-4 p-3 rounded-md text-center transition-all duration-300 ${
              message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Emergency Contact</h2>
          <ContactForm addContact={addContact} setMessage={setMessage} />
        </section>

        <section className="mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Emergency Contacts</h2>
          <ContactList 
            contacts={filteredContacts} 
            deleteContact={deleteContact} 
          />
        </section>
      </main>

      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>QuickContacts - Always Available, Even Offline</p>
        </div>
      </footer>
    </div>
  );
}

export default App;