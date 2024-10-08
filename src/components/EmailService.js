class EmailService {
  async sendResultEmail(userEmail, userName, score, totalQuestions) {
    try {
      const response = await fetch('http://localhost:3005/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userName, score, totalQuestions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send email: ${errorData.message}`);
      }

      console.log('Result email sent successfully');
    } catch (error) {
      console.error('Error sending result email:', error);
      throw error;
    }
  }
}

export default new EmailService();