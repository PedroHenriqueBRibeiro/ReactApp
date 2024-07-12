import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import { Container, Row, Col, Button, Tooltip, OverlayTrigger, Spinner, Placeholder } from 'react-bootstrap';
import GlobalContainer from "./components/ContainerGlobal";
import InputGrid from "./components/InputGrid"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegQuestionCircle } from "react-icons/fa";
import handleCalculate from "./services/HandleCalculate";

const App = () => {
  const [overs, setOvers] = useState(Array(11).fill(''));
  const [upgrades, setUpgrades] = useState(Array(11).fill(''));
  const [reservesOvers, setReservesOvers] = useState([]);
  const [reservesUpgrades, setReservesUpgrades] = useState([]);
  const [ger, setGer] = useState(null);
  const [gerReal, setGerReal] = useState(null);
  const [loading, setLoading] = useState(false);
  const gerRef = useRef(null);
  const toastId = useRef(null);
  const [errors, setErrors] = useState(Array(11).fill(false));
  const [reserveErrors, setReserveErrors] = useState([]);
  const API_URL = 'https://calcularger.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/retrieve`);
        console.log('API Response:', response.data);

        if (response.data.overs.length > 0 && response.data.upgrades.length > 0) {
          setOvers(response.data.overs.map(value => value === 0 ? '' : value));
          setUpgrades(response.data.upgrades.map(value => value === 0 ? '' : value));
          setReservesOvers(response.data.reserves_overs.map(value => value === 0 ? '' : value));
          setReservesUpgrades(response.data.reserves_upgrades.map(value => value === 0 ? '' : value));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const validateInputs = (overs) => {
    let isValid = true;
    const newErrors = Array(overs.length).fill(false);
  
    overs.forEach((value, index) => {
      if (value !== '' && (Number(value) < 40 || Number(value) > 150)) {
        newErrors[index] = true;
        isValid = false;
      }
    });
  
    return { isValid, newErrors };
  };

  const handleInputChange = (index, type, value, reserve = false) => {
    if (type === 'upgrade' && /^[0-5]?$/.test(value)) {
      if (reserve) {
        const newValues = [...reservesUpgrades];
        newValues[index] = value;
        setReservesUpgrades(newValues);
      } else {
        const newValues = [...upgrades];
        newValues[index] = value;
        setUpgrades(newValues);
      }
    } else if (type === 'over') {
      if (/^[0-9]{0,3}$/.test(value)) {
        if (reserve) {
          const newValues = [...reservesOvers];
          newValues[index] = value;
          setReservesOvers(newValues);
          const { isValid, newErrors } = validateInputs(newValues);
          setReserveErrors(newErrors);
        } else {
          const newValues = [...overs];
          newValues[index] = value;
          setOvers(newValues);
          const { isValid, newErrors } = validateInputs(newValues);
          setErrors(newErrors);
        }
      }
    }
  };

  const handleAddReserve = () => {
    if (reservesOvers.length < 7 && reservesUpgrades.length < 7) {
      setReservesOvers(prevReservesOvers => [...prevReservesOvers, '']);
      setReservesUpgrades(prevReservesUpgrades => [...prevReservesUpgrades, '']);
    } else {
      toast.warning("Max. Subs.", {
        position: "top-center"
      });
    }
  };

  const handleDeleteReserve = (index) => {
    const newReservesOvers = reservesOvers.filter((_, i) => i !== index);
    const newReservesUpgrades = reservesUpgrades.filter((_, i) => i !== index);
    setReservesOvers(newReservesOvers);
    setReservesUpgrades(newReservesUpgrades);
  };

  const handleCleanInputs = () => {
    setOvers(Array(11).fill(''));
    setUpgrades(Array(11).fill(''));
    setReservesOvers([]);
    setReservesUpgrades([]);
  
    setErrors(Array(11).fill(false));
    setReserveErrors([]);
    
    setGer(null);
    setGerReal(null);
    
    toast.warning("Cleaned.", {
      position: "top-center"
    });
    
  };  

  return (
    <GlobalContainer
      overs={overs}
      upgrades={upgrades}
      reservesOvers={reservesOvers}
      reservesUpgrades={reservesUpgrades}
      setGer={setGer}
      setGerReal={setGerReal}
      setLoading={setLoading}
      setErrors={setErrors}
      setReserveErrors={setReserveErrors}
      toastId={toastId.current}
    >
      <Container className="content-container">
        <ToastContainer />
        <div className="border rounded p-4 mb-4 content-container mb-1">
          <h1 className="text-center mb-4">Team GER Calculator</h1>
          <div className="border rounded p-4 mb-4 mb-2">
            <h2 className="text-center padding-text">
              Base Overalls
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 5000 }}
                overlay={
                  <Tooltip id="button-tooltip" className="custom-tooltip">
                    <span className="tip-text">Fill in these fields with the base overalls of each player in your starting team. For example: if your player is 98 overall and 3 ranks up, he is a 95 base overall.</span>
                  </Tooltip>
                }
              >
                <span className="ml-2" style={{ cursor: 'pointer' }}>
                  <FaRegQuestionCircle className="icon-question"/>
                </span>
              </OverlayTrigger>
            </h2>
            <InputGrid 
              type="over"
              values={overs}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </div>
          <div className="border rounded p-4 mb-4 mb-2">
            <h2 className="text-center padding-text">
              Upgrades
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 5000 }}
                overlay={
                  <Tooltip id="button-tooltip2" className="custom-tooltip">
                    <span className="tip-text">Fill in these fields with the number of upgraded ranks from 0 to 5. For example: if your player is 100 overall and at the maximum rank, he is a 95 base overall and 5 upgraded rank.</span>
                  </Tooltip>
                }
              >
                <span className="ml-2" style={{ cursor: 'pointer' }}>
                  <FaRegQuestionCircle className="icon-question"/>
                </span>
              </OverlayTrigger>
            </h2>
            <InputGrid 
              type="upgrade"
              values={upgrades}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          </div>
          <div className="text-center">
            <Button href="#calc" id="calc" onClick={handleAddReserve} className="button">Add Substitute</Button>
            {reservesOvers.map((reserve, index) => (
              <div key={index} className="mb-7 d-flex align-items-center justify-content-center">
                <input
                  type="number"
                  value={reserve}
                  onChange={(e) => handleInputChange(index, 'over', e.target.value, true)}
                  placeholder={`Sub ${index + 1}`}
                  className={`input-sm ${reserveErrors[index] ? 'is-invalid' : ''}`}
                  style={{ width: '120px', marginRight: '10px' }}
                />
                <input
                  type="number"
                  value={reservesUpgrades[index]}
                  onChange={(e) => handleInputChange(index, 'upgrade', e.target.value, true)}
                  placeholder={`Up ${index + 1}`}
                  className="input-sm"
                  style={{ width: '80px', marginRight: '10px' }}
                />
                <Button onClick={() => handleDeleteReserve(index)} className="btn-danger">X</Button>
              </div>
            ))}
            <div className="text-center">
              <Button className="button text-center" onClick={() => handleCalculate(overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal, setLoading, setErrors, setReserveErrors, toastId)}
                disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Calculate'}
              </Button>
            </div>
            {ger !== null && (
              <div className="text-center mb-4">
                <h2 ref={gerRef}>GER: {ger}</h2>
                <h2>Real GER: {gerReal !== null ? gerReal.toFixed(4) : ''}</h2>
              </div>
            )}
            <div className="text-center mb-4">
            <Button className="button text-center" onClick={handleCleanInputs}>
              Clean All
            </Button>
            </div>
          </div>
        </div>
      </Container>
    </GlobalContainer>
  );
};

export default App;
