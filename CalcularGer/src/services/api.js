import axios from "axios";

const API_URL = 'https://calcularger.onrender.com';

export const handleSubmit = async (overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal) => {
  const validReservesOvers = reservesOvers.filter(value => value !== '');
  const validReservesUpgrades = reservesUpgrades.filter(value => value !== '');

  try {
    const response = await axios.post(`${API_URL}/store`, {
      overs: overs.map(Number),
      upgrades: upgrades.map(Number),
      reserves_overs: validReservesOvers.map(Number),
      reserves_upgrades: validReservesUpgrades.map(Number),
    });
    console.log(response.data);

    const gerResponse = await axios.get(`${API_URL}/calculate_ger`);
    setGer(gerResponse.data.GER);
    setGerReal(gerResponse.data.GER_Real);
  } catch (error) {
    console.error('Erro ao comunicar com a API', error);
  }
};
