import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import PortSelector from "./PortSelector";
import DatePicker from "react-datepicker";
import PriceCalendar from "./PriceCalendar";
import LoadingSpinner from "./LoadingSpinner";
import { fetchPrices } from "../services/portService";

function SearchForm({ ports }) {
  const [formData, setFormData] = useState({
    departurePort: "",
    arrivalPort: "",
    date: new Date(),
    tripType: "oneWay",
  });
  const [prices, setPrices] = useState([]);
  const [returnPrices, setReturnPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date) => setFormData({ ...formData, date });

  const handleTripTypeChange = (e) =>
    setFormData({ ...formData, tripType: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrices([]);
    setReturnPrices([]);

    try {
      const pricesData = await fetchPrices({
        departurePort: formData.departurePort,
        arrivalPort: formData.arrivalPort,
        date: formData.date,
      });
      setPrices(pricesData);

      if (formData.tripType === "roundTrip") {
        const returnPricesData = await fetchPrices({
          departurePort: formData.arrivalPort,
          arrivalPort: formData.departurePort,
          date: formData.date,
        });
        setReturnPrices(returnPricesData);
      }
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Yolculuk Tipi</Form.Label>
            <div>
              <Form.Check
                inline
                label="Tek Yön"
                name="tripType"
                type="radio"
                id="oneWay"
                value="oneWay"
                checked={formData.tripType === "oneWay"}
                onChange={handleTripTypeChange}
              />
              <Form.Check
                inline
                label="Gidiş Dönüş"
                name="tripType"
                type="radio"
                id="roundTrip"
                value="roundTrip"
                checked={formData.tripType === "roundTrip"}
                onChange={handleTripTypeChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <PortSelector
              id="departurePort"
              label="Kalkış Havaalanı"
              formData={formData}
              setFormData={setFormData}
              ports={ports}
              type="departure"
            />
          </Col>
          <Col>
            <PortSelector
              id="arrivalPort"
              label="Varış Havaalanı"
              formData={formData}
              setFormData={setFormData}
              ports={ports}
              type="arrival"
            />
          </Col>
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
        <Row className="mt-3">
          <Col>
            <Button variant="primary" type="submit">
              Ara
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row className="mt-3">
          <Col md={formData.tripType === "roundTrip" ? 6 : 12}>
            {prices.length > 0 && (
              <PriceCalendar date={formData.date} prices={prices} />
            )}
          </Col>
          {formData.tripType === "roundTrip" && returnPrices.length > 0 && (
            <Col md={6}>
              <PriceCalendar date={formData.date} prices={returnPrices} />
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}

export default SearchForm;
