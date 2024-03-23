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
      <Typeahead
        id={id}
        labelKey={(option) =>
          `${option.cityName} (${option.code}) - ${option.portName}`
        }
        onChange={handlePortSelection}
        options={ports}
        placeholder={`Select ${label}`}
        selected={ports.filter((port) => port.code === formData[`${type}Port`])}
        clearButton
      />
    </Form.Group>
  );
}

export default PortSelector;
