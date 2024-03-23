// src/services/priceService.js
import { API_URLS } from "../utils/constants";

async function fetchMonthlyLowestPrices(departurePort, arrivalPort, date) {
  const startDate = `01.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${date.getFullYear()}`;
  const endDate = `${new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${date.getFullYear()}`;

  try {
    const response = await fetch(API_URLS.getMonthlyLowestPrices, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departurePort,
        arrivalPort,
        startDate,
        endDate,
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();
    return data.monthlyLowestPrices;
  } catch (error) {
    console.error("Error fetching monthly lowest prices:", error);
    return [];
  }
}

export { fetchMonthlyLowestPrices };
