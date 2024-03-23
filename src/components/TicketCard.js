import React from "react";

function TicketCard({
  arrivalTime,
  date,
  departureTime,
  destination,
  destinationCode,
  destinationPortName,
  flightDuration,
  isDirect,
  origin,
  originCode,
  originPortName,
  totalAmount,
}) {
  const formatTime = (timeString) =>
    new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24 saatlik format
    });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div>
        <div>{formatTime(departureTime)}</div>
        <div>
          <strong>
            {origin} ({originCode})
          </strong>
        </div>
        <div>{originPortName}</div>
      </div>
      <div>
        <div>{flightDuration}</div>
        <div>{isDirect ? "Direct" : "Transit"}</div>
      </div>
      <div>
        <div>{formatTime(arrivalTime)}</div>
        <div>
          <strong>
            {destination} ({destinationCode})
          </strong>
        </div>
        <div>{destinationPortName}</div>
      </div>
      <div>
        <div>
          <strong>{Math.trunc(totalAmount)} TRY</strong>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
