import React from "react";

const header: React.CSSProperties = {
  fontFamily: "Inter",
  fontSize: "18vw",
  lineHeight: "1em",
  position: "relative",
  marginBottom: 0,
  background:
    "-webkit-repeating-linear-gradient(-45deg, #71b7e6, #69a6ce, #b98acc, #ee8176, #b98acc, #69a6ce, #9b59b6)",
  backgroundSize: "400%",
  WebkitBackgroundClip: "text",
};

const errorHeader: React.CSSProperties = {
  position: "absolute",
  top: "10%",
  left: "15%",
  right: "15%",
  bottom: "10%",
  display: "flex",
  justifyContent: "center",
  background: "#fff",
  boxShadow: "rgb(0 0 0 / 70%) 0px 50px 50px",
};

const errorText: React.CSSProperties = {
  fontFamily: "Inter",
  fontSize: "1.2em",
  color: "#0d0d0d",
};

const NotFound = () => {
  return (
    <div style={errorHeader}>
      <div style={{ maxWidth: "600px", textAlign: "center" }}>
        <h2 style={header}>404</h2>
        <h4>Opps! Page not found</h4>
        <p style={errorText}>Sorry, the page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
