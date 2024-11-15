import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      {/* Left-aligned navigation links */}
      <ul className="nav-list">
        <li>
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-link" activeClassName="active-link">
            Cart
          </NavLink>
        </li>
      </ul>

      {/* Right-aligned profile button */}
      <div className="profile-button-container">
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
