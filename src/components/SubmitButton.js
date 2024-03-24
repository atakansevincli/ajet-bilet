import React from "react";
import { Button } from "react-bootstrap";

const SubmitButton = ({ onSubmit }) => (
  <Button
    variant="primary"
    type="submit"
    onClick={onSubmit}
    style={{ width: "90%", height: "50px" }} // Inline stil ile genişlik ve yükseklik ayarıclassName="ml-1"
  >
    Uçuş Ara
  </Button>
);

export default SubmitButton;
