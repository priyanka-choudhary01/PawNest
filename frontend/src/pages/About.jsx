import img from "../assets/goldenDog.png";
import "./About.css";

function About() {
  return (
    <section className="about-page">

      {/* HERO / INTRO */}
      <div className="about-container">
        <div className="about-text">
          <h1>About PawNest</h1>

          <p className="tagline">
            Where comfort meets care for your furry family.
          </p>

          <p>
            At PawNest, our passion is pets. We believe every pet deserves
            the very best. That’s why we create high-quality, vet-approved
            products designed to keep your pets comfortable, healthy,
            and happy.
          </p>

          <p>
            From cozy orthopedic beds to smart travel accessories,
            our mission is simple — make life easier for pets
            and their owners.
          </p>
        </div>

        <div className="about-image">
          <img src={img} alt="Happy Golden Retriever" />
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="trust-section">
        <h2 className="section-heading">
          Loved by Pets, Trusted by Owners
        </h2>

        <div className="trust-container">

          <div className="trust-card">
            <i className="fa-solid fa-leaf"></i>
            <h3>Premium Quality</h3>
            <p>
              We use durable, pet-friendly materials built for long-lasting comfort.
            </p>
          </div>

          <div className="trust-card">
            <i className="fa-solid fa-shield-dog"></i>
            <h3>Safe & Vet Approved</h3>
            <p>
              Every product is carefully designed with your pet’s safety in mind.
            </p>
          </div>

          <div className="trust-card">
            <i className="fa-solid fa-truck"></i>
            <h3>Fast Delivery</h3>
            <p>
              Quick and reliable shipping to get your pet what they need.
            </p>
          </div>

          <div className="trust-card">
            <i className="fa-solid fa-star"></i>
            <h3>Customer Satisfaction</h3>
            <p>
              Easy returns and support if you’re not fully satisfied.
            </p>
          </div>

        </div>
      </div>

      {/* BRAND STORY SECTION (NEW 🔥) */}
      <div className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            PawNest started with a simple idea — pets are family.
            We noticed that many pet products lacked comfort,
            durability, or thoughtful design.
          </p>

          <p>
            So we set out to build a brand that focuses on quality,
            trust, and happiness. Today, PawNest is trusted by
            pet lovers who want nothing but the best for their companions.
          </p>
        </div>
      </div>

    </section>
  );
}

export default About;