import React, { useState } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import PortSelector from "./PortSelector";
import TripTypeSelector from "./TripTypeSelector";
import DatePickerComponent from "./DatePickerComponent";
import SubmitButton from "./SubmitButton";
import { fetchPrices } from "../services/portService";
import PriceCalendar from "./PriceCalendar";
import LoadingSpinner from "./LoadingSpinner";

function SearchForm({ ports }) {
  const [formData, setFormData] = useState({
    departurePort: "",
    arrivalPort: "",
    date: new Date(),
    tripType: "oneWay",
  });
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([]);
  const [returnPrices, setReturnPrices] = useState([]);

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
    <Card>
      <Card.Header>
        <TripTypeSelector
          tripType={formData.tripType}
          onTripTypeChange={handleTripTypeChange}
        />
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={3} sm={12}>
              <PortSelector
                id="departurePort"
                label="Nereden"
                formData={formData}
                setFormData={setFormData}
                ports={ports}
                type="departure"
              />
            </Col>
            <Col md={3} sm={12}>
              <PortSelector
                id="arrivalPort"
                label="Nereye"
                formData={formData}
                setFormData={setFormData}
                ports={ports}
                type="arrival"
              />
            </Col>
            <Col md={3} sm={12}>
              <DatePickerComponent
                selectedDate={formData.date}
                onDateChange={handleDateChange}
              />
            </Col>
            <Col md={3} sm={12} className="d-flex align-items-end">
              <SubmitButton onSubmit={handleSubmit} />
            </Col>
          </Row>
        </Form>
      </Card.Body>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row className="mt-3">
          <Col sm={12} md={formData.tripType === "roundTrip" ? 6 : 12}>
            {prices.length > 0 && (
              <PriceCalendar
                date={formData.date}
                prices={prices}
                departurePort={formData.departurePort}
                arrivalPort={formData.arrivalPort}
                isReturnTrip={false}
              />
            )}
          </Col>
          {formData.tripType === "roundTrip" && returnPrices.length > 0 && (
            <Col sm={12} md={6}>
              <PriceCalendar
                date={formData.date}
                prices={returnPrices}
                departurePort={formData.arrivalPort}
                arrivalPort={formData.departurePort}
                isReturnTrip={true}
              />
            </Col>
          )}
        </Row>
      )}
    </Card>
  );
}

export default SearchForm;
