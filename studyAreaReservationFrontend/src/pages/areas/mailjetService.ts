import Mailjet from 'node-mailjet';

// Initialize Mailjet API connection
const mailjet = Mailjet.apiConnect(
  'e72db84093d88742a18c5646123157e3', // Replace with your Mailjet API key
  { version: 'v3.1' }
);

// Send confirmation email
export const sendConfirmationEmail = async (toEmail: string, reservationDetails: any) => {
  const emailData = {
    Messages: [
      {
        From: {
          Email: 'nowak635lol@gmail.com', // Replace with your email
          Name: 'Your Company Name',
        },
        To: [
          {
            Email: toEmail,
          },
        ],
        Subject: 'Reservation Confirmation',
        TextPart: `Your reservation for ${reservationDetails.date} at ${reservationDetails.time} has been confirmed.`,
        HTMLPart: `
          <h3>Reservation Confirmation</h3>
          <p>Your reservation is confirmed for:</p>
          <p><strong>Date:</strong> ${reservationDetails.date}</p>
          <p><strong>Time:</strong> ${reservationDetails.time}</p>
          <p><strong>Email:</strong> ${toEmail}</p>
          <p><a href="https://yourwebsite.com/manage-reservation/${reservationDetails.reservationId}">Manage Your Reservation</a></p>
        `,
      },
    ],
  };

  try {
    const response = await mailjet.post('send').request(emailData);
    console.log('Email sent successfully:', response.body);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
