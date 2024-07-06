import axios from "axios";

export const handleSubmit = async (overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal) => {
  const validReservesOvers = reservesOvers.filter(value => value !== '');
  const validReservesUpgrades = reservesUpgrades.filter(value => value !== '');

  try {
    const response = await axios.post('http://127.0.0.1:5000/store', {
      overs: overs.map(Number),
      upgrades: upgrades.map(Number),
      reserves_overs: validReservesOvers.map(Number),
      reserves_upgrades: validReservesUpgrades.map(Number),
    });
    console.log(response.data);

    const gerResponse = await axios.get('http://127.0.0.1:5000/calculate_ger');
    setGer(gerResponse.data.GER);
    setGerReal(gerResponse.data.GER_Real);
  } catch (error) {
    console.error('Erro ao comunicar com a API', error);
  }
};
