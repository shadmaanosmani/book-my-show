import { Fragment, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import UserContext from "../context/user-context";
import { Dropdown } from "antd";

const Layout = (props) => {
  const { user, isAuthenticated, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuClick = useCallback(
    (info) => {
      if (info.key === "logout") {
        logout();
      }
      if (info.key === "createTheatre") {
        navigate("/create-theatre");
      }
      if (info.key === "listTheatres") {
        navigate("/theatres");
      }
      if (info.key === "myBookings") {
        navigate("/bookings");
      }
    },
    [logout, navigate],
  );

  const userMenuItems = [
    {
      key: "profile",
      label: `${user?.username || "User"}`,
      disabled: true,
    },
    {
      key: "myBookings",
      label: "My Bookings",
    },
    ...(user?.role === "PARTNER"
      ? [
          {
            key: "createTheatre",
            label: "Create Theatre",
          },
          {
            key: "listTheatres",
            label: "List Theatres",
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  return (
    <Fragment>
      <header
        style={{
          backgroundColor: "#222",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "1px",
            }}
          >
            book<span style={{ color: "#f84464" }}>my</span>show
          </span>
        </Link>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems, onClick: handleMenuClick }} trigger={["click"]}>
              <div
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  padding: "4px 12px",
                  borderRadius: "4px",
                  backgroundColor: "#f84464",
                  fontSize: "14px",
                }}
              >
                {user?.username || "Profile"}
              </div>
            </Dropdown>
          ) : (
            <>
              <Link to="/login" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: "#fff", textDecoration: "none", fontSize: "16px" }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>
      <main>{props.children}</main>
      <footer
        style={{
          backgroundColor: "#222",
          padding: "20px",
          textAlign: "center",
          color: "#888",
          fontSize: "14px",
        }}
      >
        © 2026 bookmyshow. All rights reserved.
      </footer>
    </Fragment>
  );
};

export default Layout;
