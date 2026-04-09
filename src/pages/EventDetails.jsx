import "./EventDetails.css";
import { campusEvents } from "../data/events";
import { Link, useParams } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft } from "react-icons/fi";

export function EventDetails() {
  const { eventId } = useParams();
  const event = campusEvents.find((e) => e.id == eventId);

  if (!event)
    return (
      <section className="not-found-page">
        <p>Event does not exist</p>
        <Link to="/events" className="hero-cta"><FiArrowLeft /> Back to Events</Link>
      </section>
    );

  return (
    <div className="event-details-container">
      {/* Back link */}
      <Link to="/events" className="back-link"><FiArrowLeft /> All Events</Link>

      {/* Header Section */}
      <div className="header-section">
        <h1 className="event-title">{event.name}</h1>
        <hr className="header-divider" />
      </div>

      {/* Split Content Section */}
      <div className="split-content">
        {/* Image Section */}
        <div className="image-section">
          <img src={event.image} alt={event.name} className="event-image" />
        </div>

        {/* Details Section */}
        <div className="details-section">
          <p className="event-description">{event.description}</p>

          {/* Tags Section */}
          <div className="tags-section">
            <h3 className="tags-title">Tags</h3>
            <div className="tags-list">
              {event.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label"><FiCalendar /> Date:</span>
              <span className="detail-value">{event.date}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><FiClock /> Time:</span>
              <span className="detail-value">{event.time}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label"><FiMapPin /> Location:</span>
              <span className="detail-value">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
