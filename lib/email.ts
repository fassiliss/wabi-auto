import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking: any) {
  try {
    await resend.emails.send({
      from: 'Wabi Automotive <onboarding@resend.dev>',
      to: booking.email,
      subject: 'Booking Confirmation - Wabi Automotive',
      html: `
        <h2>Your Appointment is Confirmed!</h2>
        <p>Hi ${booking.customerName},</p>
        <p>Your service appointment has been scheduled:</p>
        <ul>
          <li><strong>Service:</strong> ${booking.serviceType}</li>
          <li><strong>Date:</strong> ${new Date(booking.appointmentDate).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${booking.appointmentTime}</li>
          <li><strong>Vehicle:</strong> ${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel}</li>
        </ul>
        <p>We look forward to serving you!</p>
        <p>Best regards,<br>Wabi Automotive Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

export async function sendServiceCompleteNotification(booking: any) {
  try {
    await resend.emails.send({
      from: 'Wabi Automotive <onboarding@resend.dev>',
      to: booking.email,
      subject: 'Your Vehicle is Ready! - Wabi Automotive',
      html: `
        <h2>Your Vehicle is Ready for Pickup!</h2>
        <p>Hi ${booking.customerName},</p>
        <p>Great news! Your ${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel} is ready for pickup.</p>
        <p><strong>Service Completed:</strong> ${booking.serviceType}</p>
        ${booking.estimatedCost > 0 ? `<p><strong>Estimated Cost:</strong> $${booking.estimatedCost}</p>` : ''}
        ${booking.adminNotes ? `<p><strong>Service Notes:</strong> ${booking.adminNotes}</p>` : ''}
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
