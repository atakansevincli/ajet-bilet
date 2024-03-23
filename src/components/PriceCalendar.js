import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./PriceCalendar.css";
import FlightRoute from "./FlightRoute"; // FlightRoute bileşenini import et
import TicketCard from "./TicketCard"; // TicketCard bileşenini import et

function PriceCalendar({
  date,
  prices,
  departurePort,
  arrivalPort,
  isReturnTrip,
}) {
  const [selectedDayData, setSelectedDayData] = useState(null);

  const priceDays = prices.filter((p) => p.totalAmount);
  const cheapestPrice = priceDays.reduce(
    (min, p) => (p.totalAmount < min ? p.totalAmount : min),
    Infinity
  );
  const highestPrice = priceDays.reduce(
    (max, p) => (p.totalAmount > max ? p.totalAmount : max),
    -Infinity
  );

  const priceRange = highestPrice - cheapestPrice;
  const colorStep = priceRange / 3;

  const findDayData = (calendarDate) =>
    priceDays.find((price) => {
      const priceDate = new Date(price.date.split(".").reverse().join("-"));
      return priceDate.toDateString() === calendarDate.toDateString();
    });

  const handleDayClick = (calendarDate) => {
    const dayData = findDayData(calendarDate);
    setSelectedDayData(dayData);
  };

  const tileClassName = ({ date: calendarDate, view }) => {
    if (view !== "month") {
      return "";
    }

    const dayData = findDayData(calendarDate);
    if (!dayData) {
      return "";
    }

    if (dayData.totalAmount === cheapestPrice) {
      return "price-cheapest";
    }

    const priceDifference = dayData.totalAmount - cheapestPrice;
    const colorIndex = Math.min(Math.floor(priceDifference / colorStep), 2);
    return `price-color-${colorIndex}`;
  };

  const tileContent = ({ date: calendarDate, view }) => {
    if (view !== "month") {
      return null;
    }

    const dayData = findDayData(calendarDate);
    if (dayData) {
      let priceClass = "";
      if (dayData.totalAmount === cheapestPrice) {
        priceClass = "price-cheapest";
      } else {
        const priceDifference = dayData.totalAmount - cheapestPrice;
        const colorIndex = Math.min(
          Math.floor(priceDifference / (colorStep + 1)),
          2
        );
        priceClass = `price-color-${colorIndex}`;
      }

      return (
        <div className={`tileContent ${priceClass}`}>
          <small>
            {Math.trunc(dayData.totalAmount)} {dayData.currency || "₺"}
          </small>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-3">
      <FlightRoute
        departureCountry={isReturnTrip ? arrivalPort : departurePort}
        destinationCountry={isReturnTrip ? departurePort : arrivalPort}
        isReturnTrip={isReturnTrip}
      />
      <Calendar
        value={date}
        tileClassName={tileClassName}
        tileContent={tileContent}
        onClickDay={handleDayClick}
        view="month"
        locale="tr-TR"
      />
      {selectedDayData && <TicketCard {...selectedDayData} />}
    </div>
  );
}

export default PriceCalendar;
