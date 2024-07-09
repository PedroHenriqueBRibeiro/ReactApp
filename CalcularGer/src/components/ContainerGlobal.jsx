import React from 'react';
import './ContainerGlobal.css';
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import handleCalculate from '../services/HandleCalculate';
import 'react-toastify/dist/ReactToastify.css';

const GlobalContainer = ({ children, overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal, setLoading, setErrors, setReserveErrors, toastId }) => {
  return (
    <div>
      <div className="global-container">
        {children}
      </div>
      <div className='footer'>
        <div>
          <div className="col-l">
            <a href='#calc' onClick={() => handleCalculate(overs, upgrades, reservesOvers, reservesUpgrades, setGer, setGerReal, setLoading, setErrors, setReserveErrors, toastId)}>
              <IoIosFootball className='logo'/>
            </a>
          </div>
          <div className='col-r'>
            <a href="https://github.com/PedroHenriqueBRibeiro" target="_blank" rel="noopener noreferrer">
              <FaGithub className='icon'/>
            </a>
            <a >
              <MdEmail className='icon'/>
            </a>
            <a href="https://www.linkedin.com/in/pedro-henrique-39aab8282" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className='icon'/>
            </a>
          </div>
          <div className="col-c padding-text-2">
            <p>© Overall Calculator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalContainer;
