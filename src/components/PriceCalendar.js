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
  const [selectedDate, setSelectedDate] = useState(date);

  const priceDays = prices.filter((p) => p.totalAmount);
  const cheapestPrice = priceDays.reduce(
    (min, p) => (p.totalAmount < min ? p.totalAmount : min),
    Infinity
  );

  const findDayData = (calendarDate) => {
    return priceDays.find((price) => {
      const priceDate = new Date(price.date.split(".").reverse().join("-"));
      return priceDate.toDateString() === calendarDate.toDateString();
    });
  };

  const handleDayClick = (calendarDate) => {
    const dayData = findDayData(calendarDate);
    setSelectedDayData(dayData);
    setSelectedDate(calendarDate); // Güncellenen tarihi ayarla
  };

  const tileClassName = ({ date: calendarDate, view }) => {
    if (view !== "month") {
      return "";
    }

    let classes = [];
    const dayData = findDayData(calendarDate);

    if (dayData && dayData.totalAmount === cheapestPrice) {
      classes.push("price-cheapest");
    }

    if (dayData) {
      const priceDifference = dayData.totalAmount - cheapestPrice;
      const colorIndex = Math.min(
        Math.floor(priceDifference / (cheapestPrice / 3)),
        2
      );
      classes.push(`price-color-${colorIndex}`);
    }

    if (
      selectedDate &&
      calendarDate.toDateString() === selectedDate.toDateString()
    ) {
      classes.push("selected-day");
    }

    return classes.join(" ");
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
          Math.floor(priceDifference / (cheapestPrice / 3)),
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
      {departurePort && arrivalPort ? (
        <>
          <FlightRoute
            departureCountry={departurePort}
            destinationCountry={arrivalPort}
            isReturnTrip={isReturnTrip}
          />
          <Calendar
            value={selectedDate}
            tileClassName={tileClassName}
            tileContent={tileContent}
            onClickDay={handleDayClick}
            view="month"
            locale="tr-TR"
          />
          {selectedDayData && <TicketCard {...selectedDayData} />}
        </>
      ) : (
        <p>
          Please select departure and arrival ports to view the calendar and
          ticket information.
        </p>
      )}
    </div>
  );
}

export default PriceCalendar;
