import "./AppLayout.css";
import { NavLink, Outlet } from "react-router-dom";
import { applySavedTheme } from "./utils/theme";
import { useAuth } from "./auth/useAuth";
import { FiHome, FiInfo, FiCalendar, FiSettings, FiLogIn, FiLogOut } from "react-icons/fi";

function AppLayout() {
  applySavedTheme();
  const { isAuthed, logout } = useAuth();

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-inner">
          <NavLink to="/" className="logo">
            <FiCalendar className="logo-icon" />
            <span>Campus Events</span>
          </NavLink>
          <nav className="main-nav">
            <NavLink to="/" end className="nav-link">
              <FiHome /> <span>Home</span>
            </NavLink>
            <NavLink to="/about" className="nav-link">
              <FiInfo /> <span>About</span>
            </NavLink>
            <NavLink to="/events" className="nav-link">
              <FiCalendar /> <span>Events</span>
            </NavLink>
            <NavLink to="/settings" className="nav-link">
              <FiSettings /> <span>Settings</span>
            </NavLink>
          </nav>
          <div className="header-actions">
            {isAuthed ? (
              <button className="auth-btn" onClick={logout}>
                <FiLogOut /> Logout
              </button>
            ) : (
              <NavLink to="/login" className="auth-btn">
                <FiLogIn /> Login
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Campus Events &mdash; Built with React</p>
      </footer>
    </div>
  );
}

export default AppLayout;
