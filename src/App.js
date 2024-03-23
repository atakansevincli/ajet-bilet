// App.js

import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { LABELS } from "./utils/constants";
import SearchForm from "./components/SearchForm";
import { fetchPortList } from "./services/portService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
function App() {
  const [ports, setPorts] = useState([]);
  const [searchForms, setSearchForms] = useState([]);

  useEffect(() => {
    fetchPortList()
      .then((portList) => {
        setPorts(portList);
        setSearchForms([<SearchForm key={0} ports={portList} />]);
      })
      .catch((error) => {
        console.error("Error fetching ports:", error);
      });
  }, []);

  const handleAddSearch = () => {
    setSearchForms((prev) => [
      ...prev,
      <SearchForm key={prev.length} ports={ports} />,
    ]);
  };

  return (
    <Container>
      <h1>{LABELS.searchTitle}</h1>
      {searchForms}
      <Button onClick={handleAddSearch} className="my-3">
        +
      </Button>
    </Container>
  );
}

export default App;
