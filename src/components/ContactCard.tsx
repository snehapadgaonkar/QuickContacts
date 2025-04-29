import { useState } from 'react';
import { Phone, Trash2, User, PhoneCall } from 'lucide-react';
import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  deleteContact: (id: string) => void;
}

const ContactCard = ({ contact, deleteContact }: ContactCardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteContact(contact.id);
    setShowConfirm(false);
  };
  
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border-l-4 ${contact.isEmergencyService ? 'border-red-600' : 'border-red-400'}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${contact.isEmergencyService ? 'bg-red-100' : 'bg-gray-100'}`}>
              <User className={`h-5 w-5 ${contact.isEmergencyService ? 'text-red-600' : 'text-gray-600'}`} />
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
              <div className="text-sm text-gray-600">
                <p>{contact.relationship}</p>
                {contact.expertise && (
                  <p className="text-gray-500">{contact.expertise}</p>
                )}
              </div>
            </div>
          </div>
          
          {!contact.isEmergencyService && !showConfirm && (
            <button 
              onClick={handleDeleteClick}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Delete contact"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <a 
            href={`tel:${contact.phoneNumber}`}
            className="flex items-center justify-between w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {contact.phoneNumber}
            </span>
            <PhoneCall className="h-4 w-4" />
          </a>

          {contact.alternativeContact && (
            <a 
              href={`tel:${contact.alternativeContact}`}
              className="flex items-center justify-between w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
            >
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {contact.alternativeContact}
              </span>
              <PhoneCall className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      
      {showConfirm && (
        <div className="bg-red-50 p-3 border-t border-red-100 animate-fadeIn">
          <p className="text-sm text-red-800 mb-2">Are you sure you want to delete this contact?</p>
          <div className="flex space-x-2">
            <button 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
            >
              Delete
            </button>
            <button 
              onClick={cancelDelete}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-md text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;