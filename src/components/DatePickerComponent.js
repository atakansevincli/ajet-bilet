import React from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import tr from "date-fns/locale/tr"; // Türkçe locale için
import "react-datepicker/dist/react-datepicker.css";

registerLocale("tr", tr); // Türkçe lokal ayarını kaydet

const DatePickerComponent = ({ selectedDate, onDateChange }) => (
  <Form.Group controlId="date">
    <Form.Label className="d-block">Tarih Seçimi</Form.Label>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="material-icons-round">event</i>
        </span>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        wrapperClassName="form-control"
        className="form-control"
        placeholderText="Seçiniz"
        locale="tr"
      />
    </div>
  </Form.Group>
);

export default DatePickerComponent;
