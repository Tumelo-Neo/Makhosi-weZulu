//hamburger menu
const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav_links');

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    navLinks.classList.toggle('active');
});


const emailForm = document.getElementById('email-form');
const emailConfirmationSection = document.getElementById("email_confirmation");

emailForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent form submission

  const name = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('text-area').value;

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              padding: 20px;
          }
          .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          p {
              line-height: 1.6;
          }
          .footer {
              margin-top: 20px;
              font-size: 0.9em;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p><strong>A message from Makhosi weZulu website</strong></p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
      </div>
      <div class="footer">
          <p>&copy; 2025 Makhosi weZulu. All rights reserved.</p>
      </div>
  </body>
  </html>
  `;

  const emailData = {
    to: 'tumelomahlaela88@gmail.com', // Hardcoded recipient
    subject: subject,
    html: htmlTemplate,
  };

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    emailConfirmationSection.innerHTML = `<div class="confirm_content"><p>Message sent</p></div></br></br>`;
    
    setTimeout(() => {
        location.reload();
    }, 3000);
    
  } catch (error) {
    console.error('Error:', error);
    emailConfirmationSection.innerHTML = `<div class="confirm_content"><p>Failed to send message</p></div></br></br>`;
    
    setTimeout(() => {
        location.reload();
    }, 3000);
  }
});
