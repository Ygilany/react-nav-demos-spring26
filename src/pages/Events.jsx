import "./Events.css";
import { NavLink, useSearchParams } from "react-router-dom";
import { campusEvents } from "../data/events";
import { FiSearch, FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";

export function Events() {
  const [params, setParams] = useSearchParams();
  const q = (params.get(`q`) || ``).toLowerCase();
  const tag = params.get(`tag`) || ``;

  const filteredList = campusEvents.filter(
    (e) =>
      (!q || e.name.toLowerCase().includes(q)) && (!tag || e.tags.includes(tag))
  );

  const tags = [``, `innovation`, `showcase`, `networking`];

  return (
    <section className="events-page">
      <h2 className="page-title">Events</h2>
      <p className="page-subtitle">Find what&rsquo;s happening on campus</p>

      <div className="events-toolbar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={q}
            onChange={(e) => setParams({ q: e.target.value, tag })}
            placeholder="Search events…"
          />
        </div>
        <div className="tag-filters">
          {tags.map((t) => (
            <button
              key={t}
              className={`tag-pill ${tag === t ? "tag-active" : ""}`}
              onClick={() => setParams({ tag: t, q })}
            >
              {t || "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {filteredList.map((e) => (
          <NavLink to={`/events/${e.id}`} key={e.id} className="event-card">
            <img src={e.image} alt={e.name} className="event-card-img" />
            <div className="event-card-body">
              <h3 className="event-card-title">{e.name}</h3>
              <div className="event-card-meta">
                <span><FiCalendar /> {e.date}</span>
                <span><FiMapPin /> {e.location}</span>
              </div>
              <div className="event-card-tags">
                {e.tags.map((tg) => (
                  <span key={tg} className="tag-badge">{tg}</span>
                ))}
              </div>
              <span className="event-card-arrow"><FiArrowRight /></span>
            </div>
          </NavLink>
        ))}
      </div>

      {filteredList.length === 0 && (
        <p className="no-results">No events found. Try a different search.</p>
      )}
    </section>
  );
}
