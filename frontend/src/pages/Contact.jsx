import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <div className="contact-wrapper">
        
        {/* LEFT SIDE */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We’d love to hear from you. Fill out the form and we’ll get back to you soon.</p>

          <div className="info-item">
            <strong>📍 Address:</strong>
            <p>Srinagar, Jammu & Kashmir, India</p>
          </div>

          <div className="info-item">
            <strong>📞 Phone:</strong>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-item">
            <strong>📧 Email:</strong>
            <p>support@example.com</p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message" rows="5"></textarea>

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
}

export default Contact;