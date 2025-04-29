export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  alternativeContact?: string;
  relationship: string;
  expertise?: string;
  isPriority?: boolean;
  isEmergencyService?: boolean;
}

export interface MessageState {
  text: string;
  type: string;
}