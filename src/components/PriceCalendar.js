import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./PriceCalendar.css";

function PriceCalendar({ date, prices }) {
  const priceDays = prices.filter((p) => p.totalAmount);
  const cheapestPrice = priceDays.reduce(
    (min, p) => (p.totalAmount < min ? p.totalAmount : min),
    Infinity
  );

  const findDayData = (calendarDate) =>
    priceDays.find((price) => {
      const priceDate = new Date(price.date.split(".").reverse().join("-"));
      return priceDate.toDateString() === calendarDate.toDateString();
    });

  const tileClassName = ({ date: calendarDate, view }) => {
    const dayData = findDayData(calendarDate);
    if (view === "month" && dayData) {
      if (dayData.totalAmount === cheapestPrice) {
        return "cheapest"; // En düşük fiyat için 'cheapest' CSS sınıfını kullan
      }
    }
    return "";
  };

  const tileContent = ({ date: calendarDate, view }) => {
    if (view !== "month") return null;

    const dayData = findDayData(calendarDate);
    if (dayData) {
      return (
        <div
          className={`tileContent ${
            dayData.totalAmount === cheapestPrice ? "cheapest" : ""
          }`}
        >
          <small>
            {dayData.totalAmount} {dayData.currency || "TRY"}
          </small>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-3">
      <h2>Aylık En Düşük Fiyatlar</h2>
      <Calendar
        value={date}
        tileClassName={tileClassName}
        tileContent={tileContent}
        view="month"
        locale="tr-TR"
      />
    </div>
  );
}

export default PriceCalendar;
