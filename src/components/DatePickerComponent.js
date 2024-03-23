import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

const DatePickerComponent = ({ selectedDate, onDateChange }) => (
  <Form.Group controlId="date">
    <Form.Label>Tarih Seçimi</Form.Label>
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="MM/yyyy"
      showMonthYearPicker
    />
  </Form.Group>
);

export default DatePickerComponent;
