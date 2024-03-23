import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { fetchPortMatrix } from "../services/portService";

function PortSelector({
  id,
  label,
  formData,
  setFormData,
  ports,
  type,
  setDestinationPorts,
}) {
  useEffect(() => {
    if (type === "departure" && formData.departurePort) {
      fetchPortMatrix(formData.departurePort).then((data) => {
        if (setDestinationPorts) {
          setDestinationPorts(data);
        }
      });
    }
  }, [formData.departurePort, type, setDestinationPorts]);

  const handlePortSelection = (selected) => {
    const portCode = selected.length > 0 ? selected[0].code : "";
    setFormData({ ...formData, [`${type}Port`]: portCode });
  };

  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            {type === "departure" ? (
              <i className="material-icons-round">flight_takeoff</i>
            ) : (
              <i className="material-icons-round">flight_land</i>
            )}
          </span>
        </div>
        <Typeahead
          id={id}
          labelKey={(option) =>
            `${option.cityName} (${option.code}) - ${option.portName}`
          }
          onChange={handlePortSelection}
          options={ports}
          placeholder="Seçiniz"
          selected={ports.filter(
            (port) => port.code === formData[`${type}Port`]
          )}
          clearButton
        />
      </div>
    </Form.Group>
  );
}

export default PortSelector;
