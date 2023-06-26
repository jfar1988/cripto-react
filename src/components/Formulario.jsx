import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const Formulario = ({ setMonedas }) => {
  const Formulario = styled.input`
    background-color: #b2c0c1;
    border: none;
    width: 100%;
    padding: 10px;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    color: #fff;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    margin-top: 30px;

    &:hover {
      background-color: #d2b259;
      cursor: pointer;
    }
  `;

  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [cripto, SelectCripto] = useSelectMonedas(
    "Elige tu CriptoMoneda",
    criptos
  );

  useEffect(() => {
    const consultarApi = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      const arrayCryptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCryptos);
    };
    consultarApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, cripto].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      cripto,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCripto />
        <Formulario type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
