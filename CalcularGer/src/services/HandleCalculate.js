import { handleSubmit } from './api';
import { toast } from 'react-toastify';

const validateInputs = (overs, reservesOvers = []) => {
    let isValid = true;
    const newErrors = Array(overs.length).fill(false);
    const newReserveErrors = Array(reservesOvers.length).fill(false);
  
    overs.forEach((value, index) => {
      if (value !== '' && (Number(value) < 40 || Number(value) > 150)) {
        newErrors[index] = true;
        isValid = false;
      }
    });
  
    reservesOvers.forEach((value, index) => {
      if (value !== '' && (Number(value) < 40 || Number(value) > 150)) {
        newReserveErrors[index] = true;
        isValid = false;
      }
    });
  
    return { isValid, newErrors, newReserveErrors };
  };
  

  const handleCalculate = async (overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal, setLoading, setErrors, setReserveErrors) => {
    const { isValid, newErrors, newReserveErrors } = validateInputs(overs, reservesOvers);
  
    setErrors(newErrors);
    setReserveErrors(newReserveErrors);
  
    if (isValid) {
      setLoading(true);
      try {
        await handleSubmit(
          overs.map(Number),
          upgrades.map(Number),
          reservesOvers.map(Number),
          reservesUpgrades.map(Number),
          setGer,
          setGerReal
        );
        setLoading(false);
      } catch (error) {
        console.error('Error submitting data:', error);
        setLoading(false);
      }
    } else {
      toast.warning("Only overalls between 40 and 150.", {
        position: "top-center",
        onClose: () => {},
      });
    }
  };
  
  export default handleCalculate;
  