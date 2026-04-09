import { useNavigate } from "react-router-dom";
import { applySavedTheme } from "../utils/theme";
import "./Settings.css";
import { useState } from "react";
import { FiSun, FiMoon, FiSave } from "react-icons/fi";

export function Settings() {
  const [theme, setTheme] = useState(localStorage.getItem(`theme`) || `light`);
  const navigate = useNavigate();

  function handleSave() {
    localStorage.setItem(`theme`, theme);
    applySavedTheme();
    navigate(`/`);
  }

  return (
    <section className="settings-page">
      <h2 className="page-title">Settings</h2>
      <p className="page-subtitle">Customize your experience</p>

      <div className="settings-card">
        <div className="setting-row">
          <div className="setting-label">
            {theme === "dark" ? <FiMoon className="setting-icon" /> : <FiSun className="setting-icon" />}
            <div>
              <strong>Theme</strong>
              <p className="setting-desc">Choose between light and dark mode</p>
            </div>
          </div>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="theme-select">
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>
        <button className="save-btn" onClick={handleSave}>
          <FiSave /> Save Settings
        </button>
      </div>
    </section>
  );
}
