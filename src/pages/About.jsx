import { FiHeart, FiCode, FiGlobe } from "react-icons/fi";

export function About() {
  return (
    <section className="about-page">
      <h2 className="page-title">About Campus Events</h2>
      <p className="page-subtitle">
        We&rsquo;re on a mission to help students discover, organize, and attend
        the best campus events effortlessly.
      </p>

      <div className="about-cards">
        <div className="about-card">
          <FiHeart className="about-icon" />
          <h3>Our Mission</h3>
          <p>Foster a vibrant campus community through shared experiences and events.</p>
        </div>
        <div className="about-card">
          <FiCode className="about-icon" />
          <h3>Built with React</h3>
          <p>Modern, fast, and accessible — built using React Router, Vite, and love.</p>
        </div>
        <div className="about-card">
          <FiGlobe className="about-icon" />
          <h3>Open to All</h3>
          <p>Every student deserves to know what&rsquo;s happening on campus.</p>
        </div>
      </div>
    </section>
  );
}
