import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const InputGrid = ({ type, values, handleInputChange, errors }) => {
  return (
    <Container className="mb-3">
      <Row className="justify-content-center mb-2">
        {values.slice(0, 3).map((value, index) => (
          <Col xs="auto" key={index}>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index, type, e.target.value)}
              placeholder={`Player`}
              className={`input-sm ${type === 'over' ? (errors[index] ? 'is-invalid' : '') : ''}`}
            />
            {errors[index] && <div className="invalid-feedback">{errors[index]}</div>}
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mb-2">
        {values.slice(3, 6).map((value, index) => (
          <Col xs="auto" key={index + 3}>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index + 3, type, e.target.value)}
              placeholder={`Player`}
              className={`input-sm ${type === 'over' ? (errors[index + 3] ? 'is-invalid' : '') : ''}`}
            />
            {errors[index + 3] && <div className="invalid-feedback">{errors[index + 3]}</div>}
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mb-2">
        {values.slice(6, 10).map((value, index) => (
          <Col xs="auto" key={index + 6}>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index + 6, type, e.target.value)}
              placeholder={`Player`}
              className={`input-sm ${type === 'over' ? (errors[index + 6] ? 'is-invalid' : '') : ''}`}
            />
            {errors[index + 6] && <div className="invalid-feedback">{errors[index + 6]}</div>}
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <input
            type="number"
            value={values[10]}
            onChange={(e) => handleInputChange(10, type, e.target.value)}
            placeholder="Player"
            className={`input-sm ${type === 'over' ? (errors[10] ? 'is-invalid' : '') : ''}`}
          />
          {errors[10] && <div className="invalid-feedback">{errors[10]}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default InputGrid;
