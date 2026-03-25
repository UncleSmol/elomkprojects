import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message, ticketId } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, or message' });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'doctor@formalize.co.za',
    from: 'admin@elokprojects.co.za', // Ensure this email or domain is verified in SendGrid
    replyTo: email,
    templateId: 'd-3fcfa1a0fc4742a1a21120359c476397',
    dynamicTemplateData: {
      name,
      email,
      phone: phone || 'N/A',
      service: service || 'General Inquiry',
      message: message.replace(/\n/g, '<br>'), // Preserve line breaks for HTML
      ticketId: ticketId || 'N/A',
    },
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('SendGrid Error:', error.response ? error.response.body : error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.response ? error.response.body : error.message 
    });
  }
}
