import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
export function UserModal({
  loggedInUser,
  logout,
  isUserModalShown,
  openUserModal,
  closeUserModal,
}) {
  useEffect(() => {
    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest(".login-btn")) {
          console.log("click");
          openUserModal();
        } else if (isUserModalShown && !event.target.matches(".login-btn")) {
          closeUserModal();
        }
      },
      false
    );
    return () => {
      document.removeEventListener("click", (event) => {});
    };
  }, [openUserModal]);

  return (
    isUserModalShown && (
      <div className="user-modal flex column">
        <ul>
          {!loggedInUser && (
            <NavLink to="/login">
              <li className="login-link">Login</li>
            </NavLink>
          )}
          {loggedInUser && (
            <div className="options-loggedin">
              {loggedInUser && (
                <li>
                  <b>Hello, {loggedInUser.fullName}</b>
                </li>
              )}
              <div className="divider"></div>
              <Link to="/trips">
                <li>Trips</li>
              </Link>
              <Link to="/wishlist">
                <li>Wishlist</li>
              </Link>
              <div className="divider"></div>
              {loggedInUser.isHost && (
                <Link to="/dashboard">
                  <li>Dashboard</li>
                </Link>
              )}
              {loggedInUser.isHost && (
                <Link to="/myStays">
                  <li>My-Stays</li>
                </Link>
              )}
            </div>
          )}
          <div className="divider"></div>

          {loggedInUser && (
            <Link to="/">
              <li onClick={() => logout()}>Log out</li>
            </Link>
          )}
        </ul>
      </div>
    )
  );
}
