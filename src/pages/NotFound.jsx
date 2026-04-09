import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

export function NotFound() {
  return (
    <section className="not-found-page">
      <FiAlertCircle className="nf-icon" />
      <h2>404 &mdash; Page Not Found</h2>
      <p>The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
      <Link to="/" className="hero-cta">Go Home &rarr;</Link>
    </section>
  );
}
