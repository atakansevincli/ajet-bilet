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
  const highestPrice = priceDays.reduce(
    (max, p) => (p.totalAmount > max ? p.totalAmount : max),
    -Infinity
  );

  const priceRange = highestPrice - cheapestPrice;
  const colorStep = priceRange / 3; // Üç renk gradyanı için adım sayısı

  const findDayData = (calendarDate) =>
    priceDays.find((price) => {
      const priceDate = new Date(price.date.split(".").reverse().join("-"));
      return priceDate.toDateString() === calendarDate.toDateString();
    });

  const tileClassName = ({ date: calendarDate, view }) => {
    if (view !== "month") {
      return "";
    }

    const dayData = findDayData(calendarDate);
    if (!dayData) {
      return "";
    }

    if (dayData.totalAmount === cheapestPrice) {
      return "price-cheapest"; // En düşük fiyat için
    }

    const priceDifference = dayData.totalAmount - cheapestPrice;
    const colorIndex = Math.min(Math.floor(priceDifference / colorStep), 2); // 0 ile 2 arasında bir değer alır
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
        priceClass = "price-cheapest"; // En düşük fiyat için ayrı bir renk
      } else {
        const priceDifference = dayData.totalAmount - cheapestPrice;
        const colorIndex = Math.min(
          Math.floor(priceDifference / (colorStep + 1)),
          2
        ); // 0 ile 2 arasında bir değer alır
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
