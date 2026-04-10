import { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'aa-boarding-pass',
    name: 'AA Boarding Pass',
    category: 'Aviation',
    description: 'American Airlines style boarding pass with QR code support.',
    thumbnail: 'https://picsum.photos/seed/aa/400/300',
    basePrice: 45.00,
    fields: [
      { id: 'passengerName', label: 'Passenger Name', type: 'text', placeholder: 'JOHN DOE' },
      { id: 'flightNumber', label: 'Flight Number', type: 'text', placeholder: 'AA5641' },
      { id: 'from', label: 'From (IATA)', type: 'text', placeholder: 'JFK' },
      { id: 'to', label: 'To (IATA)', type: 'text', placeholder: 'LAX' },
      { id: 'date', label: 'Flight Date', type: 'date' },
      { id: 'seat', label: 'Seat Number', type: 'text', placeholder: '12A' },
      { id: 'gate', label: 'Gate', type: 'text', placeholder: 'B12' },
      { id: 'boardingTime', label: 'Boarding Time', type: 'text', placeholder: '14:30' },
    ]
  },
  {
    id: 'delta-receipt',
    name: 'Delta Flight Receipt',
    category: 'Aviation',
    description: 'Detailed Delta Airlines flight receipt with SkyMiles info.',
    thumbnail: 'https://picsum.photos/seed/delta/400/300',
    basePrice: 3860.07,
    fields: [
      { id: 'confirmation', label: 'Confirmation Number', type: 'text', placeholder: 'DL3951' },
      { id: 'passengerType', label: 'Passenger Type', type: 'select', options: ['Adult', 'Child', 'Infant'], defaultValue: 'Adult' },
      { id: 'skyMiles', label: 'SkyMiles Number', type: 'text', placeholder: '1234567890' },
      { id: 'class', label: 'Cabin Class', type: 'select', options: ['Main Cabin', 'Delta Comfort+', 'First Class', 'Delta One'], defaultValue: 'First Class' },
      { id: 'totalAmount', label: 'Total Amount ($)', type: 'number', defaultValue: '3860.07' },
      { id: 'conditions', label: 'Conditions of Carriage', type: 'text', placeholder: 'Standard Delta Terms' },
    ]
  },
  {
    id: 'hilton-invoice',
    name: 'Hilton Hotel Invoice',
    category: 'Hospitality',
    description: 'Professional Hilton Worldwide folio and tax invoice.',
    thumbnail: 'https://picsum.photos/seed/hilton/400/300',
    basePrice: 1250.00,
    fields: [
      { id: 'guestName', label: 'Guest Name', type: 'text' },
      { id: 'roomNumber', label: 'Room Number', type: 'text' },
      { id: 'checkIn', label: 'Check-in Date', type: 'date' },
      { id: 'checkOut', label: 'Check-out Date', type: 'date' },
      { id: 'nightlyRate', label: 'Nightly Rate', type: 'number' },
    ]
  },
  {
    id: 'uber-receipt',
    name: 'Uber Trip Receipt',
    category: 'Transport',
    description: 'Standard Uber trip summary and tax invoice.',
    thumbnail: 'https://picsum.photos/seed/uber/400/300',
    basePrice: 42.50,
    fields: [
      { id: 'driverName', label: 'Driver Name', type: 'text' },
      { id: 'pickup', label: 'Pickup Location', type: 'text' },
      { id: 'dropoff', label: 'Dropoff Location', type: 'text' },
      { id: 'distance', label: 'Distance (miles)', type: 'number' },
      { id: 'fare', label: 'Total Fare', type: 'number' },
    ]
  },
  {
    id: 'amazon-invoice',
    name: 'Amazon Order Invoice',
    category: 'E-commerce',
    description: 'Amazon.com official order summary and invoice.',
    thumbnail: 'https://picsum.photos/seed/amazon/400/300',
    basePrice: 299.99,
    fields: [
      { id: 'orderId', label: 'Order ID', type: 'text' },
      { id: 'itemName', label: 'Item Name', type: 'text' },
      { id: 'quantity', label: 'Quantity', type: 'number' },
      { id: 'shippingAddress', label: 'Shipping Address', type: 'text' },
    ]
  },
  {
    id: 'starbucks-receipt',
    name: 'Starbucks Receipt',
    category: 'Dining',
    description: 'Starbucks Coffee store receipt with rewards points.',
    thumbnail: 'https://picsum.photos/seed/starbucks/400/300',
    basePrice: 12.45,
    fields: [
      { id: 'storeId', label: 'Store #', type: 'text' },
      { id: 'orderItems', label: 'Items (comma separated)', type: 'text' },
      { id: 'starsEarned', label: 'Stars Earned', type: 'number' },
    ]
  },
  {
    id: 'fedex-label',
    name: 'FedEx Shipping Label',
    category: 'Logistics',
    description: 'FedEx Express/Ground shipping label with barcode.',
    thumbnail: 'https://picsum.photos/seed/fedex/400/300',
    basePrice: 85.20,
    fields: [
      { id: 'trackingNumber', label: 'Tracking #', type: 'text' },
      { id: 'sender', label: 'Sender Details', type: 'text' },
      { id: 'recipient', label: 'Recipient Details', type: 'text' },
      { id: 'weight', label: 'Weight (lbs)', type: 'number' },
    ]
  },
  {
    id: 'apple-receipt',
    name: 'Apple Store Receipt',
    category: 'Retail',
    description: 'Official Apple Store electronic receipt.',
    thumbnail: 'https://picsum.photos/seed/apple/400/300',
    basePrice: 1299.00,
    fields: [
      { id: 'serialNumber', label: 'Serial Number', type: 'text' },
      { id: 'productName', label: 'Product', type: 'text' },
      { id: 'storeLocation', label: 'Store', type: 'text' },
    ]
  },
  {
    id: 'hertz-agreement',
    name: 'Hertz Rental Agreement',
    category: 'Transport',
    description: 'Hertz car rental agreement and receipt.',
    thumbnail: 'https://picsum.photos/seed/hertz/400/300',
    basePrice: 450.00,
    fields: [
      { id: 'rentalId', label: 'Rental ID', type: 'text' },
      { id: 'carModel', label: 'Car Model', type: 'text' },
      { id: 'days', label: 'Rental Days', type: 'number' },
    ]
  },
  {
    id: 'airbnb-itinerary',
    name: 'Airbnb Itinerary',
    category: 'Hospitality',
    description: 'Airbnb booking confirmation and host details.',
    thumbnail: 'https://picsum.photos/seed/airbnb/400/300',
    basePrice: 890.00,
    fields: [
      { id: 'reservationCode', label: 'Reservation Code', type: 'text' },
      { id: 'hostName', label: 'Host Name', type: 'text' },
      { id: 'address', label: 'Listing Address', type: 'text' },
    ]
  }
];
