import { Link } from "react-router-dom";
import { FiCalendar, FiUsers, FiMapPin, FiTrendingUp } from "react-icons/fi";

export function Home() {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-badge">🎉 Spring 2026 Events are live!</div>
        <h2 className="hero-title">Discover Campus Events</h2>
        <p className="hero-subtitle">
          Stay connected with everything happening on campus &mdash; fairs,
          workshops, meetups and more.
        </p>
        <Link to="/events" className="hero-cta">Browse Events &rarr;</Link>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-number">3+</span>
          <span className="stat-label">Events</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">2</span>
          <span className="stat-label">Venues</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Attendees</span>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <FiCalendar className="feature-icon" />
          <h3>Upcoming Events</h3>
          <p>Explore a curated list of campus events happening soon.</p>
        </div>
        <div className="feature-card">
          <FiUsers className="feature-icon" />
          <h3>Networking</h3>
          <p>Connect with fellow students, faculty, and recruiters.</p>
        </div>
        <div className="feature-card">
          <FiMapPin className="feature-icon" />
          <h3>Find Locations</h3>
          <p>Get venue details and directions for every event.</p>
        </div>
      </div>
    </section>
  );
}
