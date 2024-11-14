import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import "./Navigation.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} className="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li className="dropdown-welcome">Welcome, {user.firstName}</li>
              <li onClick={handleFavoritesClick} className="dropdown-item">
                Favorites
              </li>
              <li>
                <button onClick={logout} className="dropdown-item logout-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                className="dropdown-item"
                onClick={() => {
                  closeMenu();
                  navigate("/login");
                }}
              >
                Log In
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  closeMenu();
                  navigate("/signup");
                }}
              >
                Sign Up
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
