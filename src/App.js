import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [formData, setFormData] = useState({
    departurePort: "",
    arrivalPort: "",
    date: new Date(),
  });
  const [ports, setPorts] = useState([]);
  const [destinationPorts, setDestinationPorts] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/getportlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPorts(data.content))
      .catch((error) => console.error("Error fetching ports:", error));
  }, []);

  const handlePortSelection = (selected) => {
    if (selected.length > 0) {
      const portCode = selected[0].code;
      setFormData({ ...formData, departurePort: portCode });

      fetch("http://localhost:3000/api/getportmatrix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ portCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          setDestinationPorts(data.content);
        })
        .catch((error) => console.error("Error fetching port matrix:", error));
    } else {
      setFormData({ ...formData, departurePort: "" });
      setDestinationPorts([]);
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const startDate = `01.${String(formData.date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${formData.date.getFullYear()}`;
    const endDate = `${new Date(
      formData.date.getFullYear(),
      formData.date.getMonth() + 1,
      0
    ).getDate()}.${String(formData.date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${formData.date.getFullYear()}`;

    const requestData = {
      departurePort: formData.departurePort,
      arrivalPort: formData.arrivalPort,
      startDate,
      endDate,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/getmonthlylowestprices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPrices(data.monthlyLowestPrices);
      } else {
        console.error("API request failed:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayData = prices.find((price) => {
        const priceDate = new Date(price.date.split(".").reverse().join("-"));
        return priceDate.toDateString() === date.toDateString();
      });
      return dayData ? (
        <div>
          <small>
            {dayData.totalAmount} {dayData.currency || "TRY"}
          </small>
        </div>
      ) : null;
    }
  };

  return (
    <Container>
      <h1>Uçuş Arama</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="departurePort">
              <Form.Label>Kalkış Havaalanı</Form.Label>
              <Typeahead
                id="departurePort"
                labelKey={(option) =>
                  `${option.cityName} (${option.code}) - ${option.portName}`
                }
                onChange={handlePortSelection}
                options={ports}
                placeholder="Kalkış Havaalanı Seçin"
                clearButton
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="arrivalPort">
              <Form.Label>Varış Havaalanı</Form.Label>
              <Typeahead
                id="arrivalPort"
                labelKey={(option) =>
                  `${option.cityName} (${option.code}) - ${option.portName}`
                }
                onChange={(selected) => {
                  if (selected.length > 0) {
                    setFormData({ ...formData, arrivalPort: selected[0].code });
                  } else {
                    setFormData({ ...formData, arrivalPort: "" });
                  }
                }}
                options={destinationPorts}
                placeholder="Varış Havaalanı Seçin"
                clearButton
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group controlId="date">
              <Form.Label>Tarih Seçimi</Form.Label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Ara
        </Button>
      </Form>

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && prices.length > 0 && (
        <div className="mt-3">
          <h2>Aylık En Düşük Fiyatlar</h2>
          <Calendar
            value={formData.date}
            tileContent={tileContent}
            view="month"
          />
        </div>
      )}
    </Container>
  );
}

export default App;
