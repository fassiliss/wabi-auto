import { Resend } from 'resend';

type BookingEmailDetails = {
  adminNotes?: string;
  appointmentDate: Date | string;
  appointmentTime: string;
  customerName: string;
  email: string;
  estimatedCost?: number;
  serviceType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
};

let resendClient: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('Please define the RESEND_API_KEY environment variable');
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

function escapeHtml(value: string | number | Date | undefined) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendBookingConfirmation(booking: BookingEmailDetails) {
  try {
    await getResend().emails.send({
      from: 'Wabi Automotive <onboarding@resend.dev>',
      to: booking.email,
      subject: 'Booking Confirmation - Wabi Automotive',
      html: `
        <h2>Your Appointment is Confirmed!</h2>
        <p>Hi ${escapeHtml(booking.customerName)},</p>
        <p>Your service appointment has been scheduled:</p>
        <ul>
          <li><strong>Service:</strong> ${escapeHtml(booking.serviceType)}</li>
          <li><strong>Date:</strong> ${new Date(booking.appointmentDate).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${escapeHtml(booking.appointmentTime)}</li>
          <li><strong>Vehicle:</strong> ${escapeHtml(booking.vehicleYear)} ${escapeHtml(booking.vehicleMake)} ${escapeHtml(booking.vehicleModel)}</li>
        </ul>
        <p>We look forward to serving you!</p>
        <p>Best regards,<br>Wabi Automotive Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

export async function sendServiceCompleteNotification(booking: BookingEmailDetails) {
  try {
    await getResend().emails.send({
      from: 'Wabi Automotive <onboarding@resend.dev>',
      to: booking.email,
      subject: 'Your Vehicle is Ready! - Wabi Automotive',
      html: `
        <h2>Your Vehicle is Ready for Pickup!</h2>
        <p>Hi ${escapeHtml(booking.customerName)},</p>
        <p>Great news! Your ${escapeHtml(booking.vehicleYear)} ${escapeHtml(booking.vehicleMake)} ${escapeHtml(booking.vehicleModel)} is ready for pickup.</p>
        <p><strong>Service Completed:</strong> ${escapeHtml(booking.serviceType)}</p>
        ${booking.estimatedCost && booking.estimatedCost > 0 ? `<p><strong>Estimated Cost:</strong> $${escapeHtml(booking.estimatedCost)}</p>` : ''}
        ${booking.adminNotes ? `<p><strong>Service Notes:</strong> ${escapeHtml(booking.adminNotes)}</p>` : ''}
        <p>Please visit us during our business hours:</p>
        <p><strong>Sunday - Friday: 9am - 8pm</strong></p>
        <p>Thank you for choosing Wabi Automotive!</p>
        <p>Best regards,<br>Wabi Automotive Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending completion email:', error);
  }
}
