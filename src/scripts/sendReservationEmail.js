import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_4tqze81';
const TEMPLATE_ID = 'template_k1lyvqm';
const PUBLIC_KEY = '_bNzHNEzRZfeHyMvV';

// Initialize once — for example, right here
emailjs.init(PUBLIC_KEY);

/**
 * Sends a reservation email via EmailJS
 * @param {Object} reservationData
 * @returns {Promise}
 */
export function sendReservationEmail(reservationData) {
  const templateParams = {
    name: reservationData.name,
    phone: reservationData.phone,
    email: reservationData.email,
    person: reservationData.person,
    procedure: reservationData.procedure,
    selectedDate: reservationData.selectedDate,
    selectedTime: reservationData.selectedTime,
    procedureDuration: reservationData.procedureDuration,
    notes: reservationData.notes || '–',
  };

  // emailjs.send returns a Promise
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
    .then(response => {
      console.log('Email sent successfully:', response.status, response.text);
      return response;
    })
    .catch(error => {
      console.error('Failed to send email:', error);
      throw error;
    });
}
