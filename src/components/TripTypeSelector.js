import React from "react";
import { Form } from "react-bootstrap";

const TripTypeSelector = ({ tripType, onTripTypeChange }) => (
  <div>
    <Form.Label>Yolculuk Tipi</Form.Label>
    <div>
      <Form.Check
        inline
        label="Tek Yön"
        name="tripType"
        type="radio"
        id="oneWay"
        value="oneWay"
        checked={tripType === "oneWay"}
        onChange={onTripTypeChange}
      />
      <Form.Check
        inline
        label="Gidiş Dönüş"
        name="tripType"
        type="radio"
        id="roundTrip"
        value="roundTrip"
        checked={tripType === "roundTrip"}
        onChange={onTripTypeChange}
      />
    </div>
  </div>
);

export default TripTypeSelector;
