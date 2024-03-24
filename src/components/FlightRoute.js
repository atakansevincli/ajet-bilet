import "./DatePicker.css";

function FlightRoute({ departureCountry, destinationCountry, isReturnTrip }) {
  const iconStyle = { fontSize: "32px" }; // İkonlar için ortak stil
  const flightIconRotation = isReturnTrip ? "rotate(270deg)" : "rotate(90deg)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontSize: "28px",
        marginBottom: "20px",
      }}
    >
      <span
        className="material-icons-round"
        style={{ ...iconStyle, transform: flightIconRotation }}
      >
        flight
      </span>
      <span>{isReturnTrip ? destinationCountry : departureCountry}</span>
      <span className="material-icons-round" style={iconStyle}>
        arrow_right_alt
      </span>
      <span>{isReturnTrip ? departureCountry : destinationCountry}</span>
    </div>
  );
}

export default FlightRoute;
