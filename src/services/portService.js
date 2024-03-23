import { API_URLS } from "../utils/constants";

async function fetchPortList() {
  try {
    const response = await fetch(API_URLS.getPortList, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching ports:", error);
    return [];
  }
}

async function fetchPortMatrix(portCode) {
  try {
    const response = await fetch(API_URLS.getPortMatrix, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ portCode }),
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching port matrix:", error);
    return [];
  }
}

async function fetchPrices({ departurePort, arrivalPort, date }) {
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
    console.error("Error fetching prices:", error);
    return [];
  }
}

export { fetchPortList, fetchPortMatrix, fetchPrices };
