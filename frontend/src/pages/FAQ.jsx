import { useState } from "react";
import "./FAQ.css";

function FAQ() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  const faqData = [
    {
      question: "How long does shipping take?",
      answer: "Shipping usually takes 5-7 business days depending on your location."
    },
    {
      question: "Are PawNest products safe for pets?",
      answer: "Yes, all our products are made with pet-safe materials and tested for durability."
    },
    {
      question: "Do you offer returns?",
      answer: "Yes, we offer a 30-day satisfaction guarantee on all products."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a tracking number via email."
    }
  ];

  return (
    <div className="faq-container">

      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-subtitle">
        Everything you need to know about our products & services
      </p>

      <div className="faq-wrapper">
        {faqData.map((item, index) => (
          <div
            className={`faq-item ${active === index ? "active" : ""}`}
            key={index}
          >

            <div
              className="faq-question"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <i className={`fa-solid ${active === index ? "fa-minus" : "fa-plus"}`}></i>
            </div>

            <div
              className="faq-answer"
              style={{
                maxHeight: active === index ? "200px" : "0px"
              }}
            >
              <p>{item.answer}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default FAQ;