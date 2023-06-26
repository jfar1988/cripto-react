import React from "react";
import styled from "@emotion/styled";

const Result = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Imagen = styled.img`
  display: block;
  width: 150px;
`;

const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;

const Precio = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const Resultado = ({ respuesta }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    respuesta;
  return (
    <Result>
      <Imagen
        src={`https://www.cryptocompare.com${IMAGEURL}`}
        alt="imagenCripto"
      />
      <div>
        <Precio>
          El Precio es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          El Precio más alto del día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          El Precio más bajo del dia: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Ultima actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Result>
  );
};

export default Resultado;
