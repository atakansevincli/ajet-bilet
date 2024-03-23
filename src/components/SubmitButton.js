import React from "react";
import { Button } from "react-bootstrap";

const SubmitButton = ({ onSubmit }) => (
  <Button variant="primary" type="submit" onClick={onSubmit}>
    Ara
  </Button>
);

export default SubmitButton;
